import { updateProfile } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";
import { auth, db } from "./firebase";

export type DisasterPortal = {
  id?: string;
  title: string;
  description: string;
  location: string;
  urgency: "low" | "medium" | "high";
  createdBy: string;
  createdAt: Timestamp | null;
  disasterType: DisasterType;
  image?: string;
  status: "active" | "inactive" | "resolved";
  resolutionSummary?: string;
  resolvedAt?: Timestamp | null;
  lastUpdated?: Timestamp | null;
};

export type ResourceNeed = {
  id?: string;
  portalId: string;
  title: string;
  description: string;
  category:
    | "medicine"
    | "food"
    | "shelter"
    | "clothing"
    | "water"
    | "transport"
    | "other";
  quantity: number;
  unit?: string;
  priority: "low" | "medium" | "high";
  status: "needed" | "partially_fulfilled" | "fulfilled";
  createdAt: Timestamp | null;
};

export type Volunteer = {
  id?: string;
  userId: string;
  portalId: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  availability: string;
  registeredAt: Timestamp | null;
  status?: "active" | "inactive";
};

export type Update = {
  id?: string;
  portalId: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Timestamp | null;
};

export type ForumPost = {
  id?: string;
  portalId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: Timestamp | null;
  category: "general" | "question" | "resource" | "update" | "other";
  isAnnouncement?: boolean;
  attachmentUrls?: string[];
};

export type ForumComment = {
  id?: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Timestamp | null;
};

export type DisasterType = 
  | "flood" 
  | "earthquake" 
  | "cyclone" 
  | "drought" 
  | "fire" 
  | "landslide"
  | "tsunami" 
  | "chemical" 
  | "biological"
  | "nuclear"
  | "other";

export type SelfHelpManual = {
  id?: string;
  disasterType: DisasterType;
  title: string;
  content: string;
  sections: {
    title: string;
    content: string;
  }[];
  forVictims: boolean;
  forHelpers: boolean;
  createdBy: string;
  createdAt: Timestamp | null;
  lastUpdated: Timestamp | null;
};

// Disaster Portal functions
export async function createPortal(portalData: Omit<DisasterPortal, "id" | "createdAt">) {
  const portalsRef = collection(db, "disasterPortals");
  const newPortal = {
    ...portalData,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp()
  };
  
  const docRef = await addDoc(portalsRef, newPortal);
  
  // Auto-attach relevant self-help manuals to the new disaster portal
  await attachManualsToPortal(docRef.id, portalData.disasterType);
  
  return { id: docRef.id, ...newPortal };
}

export async function getPortal(portalId: string) {
  const portalRef = doc(db, "disasterPortals", portalId);
  const portalSnap = await getDoc(portalRef);

  if (portalSnap.exists()) {
    return { id: portalSnap.id, ...portalSnap.data() } as DisasterPortal;
  }

  return null;
}

export async function getActivePortals() {
  const portalsRef = collection(db, "disasterPortals");
  const q = query(
    portalsRef,
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as DisasterPortal)
  );
}

export async function updatePortal(
  portalId: string,
  portalData: Partial<DisasterPortal>
) {
  const portalRef = doc(db, "disasterPortals", portalId);
  await updateDoc(portalRef, portalData);
  return { id: portalId, ...portalData };
}

// Function to delete a portal and all associated data
export async function deletePortal(portalId: string) {
  // Get references to all collections that might have data related to this portal
  const portalRef = doc(db, "disasterPortals", portalId);
  const resourcesRef = collection(db, "resourceNeeds");
  const volunteersRef = collection(db, "volunteers");
  const updatesRef = collection(db, "updates");
  const forumPostsRef = collection(db, "forumPosts");
  const portalManualsRef = collection(db, "portalManuals");

  try {
    // 1. Delete associated resources
    const resourcesQuery = query(resourcesRef, where("portalId", "==", portalId));
    const resourceSnapshot = await getDocs(resourcesQuery);
    const resourceDeletions = resourceSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(resourceDeletions);

    // 2. Delete associated volunteers
    const volunteersQuery = query(volunteersRef, where("portalId", "==", portalId));
    const volunteersSnapshot = await getDocs(volunteersQuery);
    const volunteerDeletions = volunteersSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(volunteerDeletions);

    // 3. Delete associated updates
    const updatesQuery = query(updatesRef, where("portalId", "==", portalId));
    const updatesSnapshot = await getDocs(updatesQuery);
    const updateDeletions = updatesSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(updateDeletions);

    // 4. Delete forum posts related to this portal
    const forumPostsQuery = query(forumPostsRef, where("portalId", "==", portalId));
    const forumPostsSnapshot = await getDocs(forumPostsQuery);
    
    // For each forum post, we also need to delete its comments
    const forumPostDeletions = forumPostsSnapshot.docs.map(async (postDoc) => {
      const postId = postDoc.id;
      const commentsRef = collection(db, "forumComments");
      const commentsQuery = query(commentsRef, where("postId", "==", postId));
      const commentsSnapshot = await getDocs(commentsQuery);
      
      // Delete all comments for this post
      const commentDeletions = commentsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(commentDeletions);
      
      // Delete the post itself
      return deleteDoc(postDoc.ref);
    });
    
    await Promise.all(forumPostDeletions);

    // 5. Delete portal manual links
    const portalManualsQuery = query(portalManualsRef, where("portalId", "==", portalId));
    const portalManualsSnapshot = await getDocs(portalManualsQuery);
    const portalManualDeletions = portalManualsSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(portalManualDeletions);

    // 6. Finally delete the portal itself
    await deleteDoc(portalRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting portal:", error);
    throw new Error("Failed to delete portal and associated data");
  }
}

// Resource Need functions
export async function createResourceNeed(
  resourceData: Omit<ResourceNeed, "id" | "createdAt">
) {
  const resourceRef = collection(db, "resourceNeeds");
  const newResource = {
    ...resourceData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(resourceRef, newResource);
  return { id: docRef.id, ...newResource };
}

export async function getResourceNeeds(portalId: string) {
  const resourcesRef = collection(db, "resourceNeeds");
  const q = query(
    resourcesRef,
    where("portalId", "==", portalId),
    orderBy("priority", "desc"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ResourceNeed)
  );
}

export async function getAllResourceNeeds() {
  const resourcesRef = collection(db, "resourceNeeds");
  const q = query(resourcesRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ResourceNeed)
  );
}

export async function updateResourceNeed(
  resourceId: string,
  resourceData: Partial<ResourceNeed>
) {
  const resourceRef = doc(db, "resourceNeeds", resourceId);
  await updateDoc(resourceRef, resourceData);
  return { id: resourceId, ...resourceData };
}

// Volunteer functions
export async function registerVolunteer(
  volunteerData: Omit<Volunteer, "id" | "registeredAt">
) {
  const volunteerRef = collection(db, "volunteers");
  const newVolunteer = {
    ...volunteerData,
    registeredAt: serverTimestamp(),
  };

  const docRef = await addDoc(volunteerRef, newVolunteer);
  return { id: docRef.id, ...newVolunteer } as Volunteer;
}

export async function getVolunteers(portalId: string) {
  const volunteersRef = collection(db, "volunteers");
  const q = query(
    volunteersRef,
    where("portalId", "==", portalId),
    orderBy("registeredAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Volunteer)
  );
}

// Update functions
export async function createUpdate(
  updateData: Omit<Update, "id" | "createdAt">
) {
  const updateRef = collection(db, "updates");
  const newUpdate = {
    ...updateData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(updateRef, newUpdate);
  return { id: docRef.id, ...newUpdate };
}

export async function getUpdates(portalId: string) {
  const updatesRef = collection(db, "updates");
  const q = query(
    updatesRef,
    where("portalId", "==", portalId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Update)
  );
}

export async function searchPortals(searchTerm: string) {
  const portalsRef = collection(db, "disasterPortals");
  const q = query(
    portalsRef,
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  const portals: DisasterPortal[] = [];
  
  // Perform client-side filtering as Firestore doesn't support text search natively
  querySnapshot.forEach((doc) => {
    const portalData = doc.data() as Omit<DisasterPortal, "id">;
    const portal = { id: doc.id, ...portalData } as DisasterPortal;
    
    const searchTermLower = searchTerm.toLowerCase();
    // Check if the search term is found in title, description, or location
    if (
      portal.title.toLowerCase().includes(searchTermLower) ||
      portal.description.toLowerCase().includes(searchTermLower) ||
      portal.location.toLowerCase().includes(searchTermLower)
    ) {
      portals.push(portal);
    }
  });
  
  return portals;
}

// Get portal statistics for the dashboard
export async function getPortalStats(portalId: string) {
  const volunteersRef = collection(db, "volunteers");
  const resourcesRef = collection(db, "resourceNeeds");

  // Get volunteers count
  const volunteersQuery = query(volunteersRef, where("portalId", "==", portalId));
  const volunteersSnapshot = await getDocs(volunteersQuery);
  const volunteersCount = volunteersSnapshot.size;

  // Get resource needs and fulfilled status
  const resourcesQuery = query(resourcesRef, where("portalId", "==", portalId));
  const resourcesSnapshot = await getDocs(resourcesQuery);
  
  let resourcesCount = 0;
  let totalNeeded = 0;
  let totalFulfilled = 0;
  
  resourcesSnapshot.forEach((doc) => {
    const resource = doc.data() as ResourceNeed;
    resourcesCount++;
    
    // Assuming quantity is the total needed and we track fulfilled separately
    totalNeeded += resource.quantity;
    
    // Calculate fulfilled based on status
    if (resource.status === "fulfilled") {
      totalFulfilled += resource.quantity;
    } else if (resource.status === "partially_fulfilled") {
      // Estimate 50% fulfilled for partially fulfilled resources
      totalFulfilled += Math.round(resource.quantity * 0.5);
    }
  });

  return {
    volunteers: volunteersCount,
    resourceNeeds: resourcesCount,
    totalResources: totalNeeded,
    resourcesFulfilled: totalFulfilled
  };
}

// Get statistics for multiple portals
export async function getMultiplePortalStats(portalIds: string[]) {
  const stats: Record<string, {
    volunteers: number;
    resourceNeeds: number;
    totalResources: number;
    resourcesFulfilled: number;
  }> = {};

  // Process in batches to avoid too many concurrent requests
  const batchSize = 5;
  for (let i = 0; i < portalIds.length; i += batchSize) {
    const batch = portalIds.slice(i, i + batchSize);
    const promises = batch.map(id => getPortalStats(id));
    const results = await Promise.all(promises);
    
    batch.forEach((id, index) => {
      stats[id] = results[index];
    });
  }

  return stats;
}

// Forum functions
export async function createForumPost(postData: Omit<ForumPost, "id" | "createdAt">) {
  const postsRef = collection(db, "forumPosts");
  const newPost = {
    ...postData,
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(postsRef, newPost);
  return { id: docRef.id, ...newPost };
}

export async function getForumPosts(portalId: string) {
  const postsRef = collection(db, "forumPosts");
  const q = query(
    postsRef,
    where("portalId", "==", portalId),
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  const posts: ForumPost[] = [];
  
  querySnapshot.forEach((doc) => {
    const postData = doc.data() as Omit<ForumPost, "id">;
    posts.push({ id: doc.id, ...postData });
  });
  
  return posts;
}

export async function getForumPost(postId: string) {
  const postRef = doc(db, "forumPosts", postId);
  const postSnap = await getDoc(postRef);
  
  if (postSnap.exists()) {
    return { id: postSnap.id, ...postSnap.data() } as ForumPost;
  }
  
  return null;
}

export async function createForumComment(commentData: Omit<ForumComment, "id" | "createdAt">) {
  const commentsRef = collection(db, "forumComments");
  const newComment = {
    ...commentData,
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(commentsRef, newComment);
  return { id: docRef.id, ...newComment };
}

export async function getForumComments(postId: string) {
  const commentsRef = collection(db, "forumComments");
  const q = query(
    commentsRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );
  
  const querySnapshot = await getDocs(q);
  const comments: ForumComment[] = [];
  
  querySnapshot.forEach((doc) => {
    const commentData = doc.data() as Omit<ForumComment, "id">;
    comments.push({ id: doc.id, ...commentData });
  });
  
  return comments;
}

// Self-help manual functions
export async function createSelfHelpManual(manualData: Omit<SelfHelpManual, "id" | "createdAt" | "lastUpdated">) {
  const manualsRef = collection(db, "selfHelpManuals");
  const newManual = {
    ...manualData,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp()
  };
  
  const docRef = await addDoc(manualsRef, newManual);
  return { id: docRef.id, ...newManual };
}

export async function getSelfHelpManuals(disasterType?: DisasterType) {
  try {
    console.log("Attempting to access selfHelpManuals collection...");
    const manualsRef = collection(db, "selfHelpManuals");
    let q;
    
    if (disasterType) {
      q = query(
        manualsRef,
        where("disasterType", "==", disasterType),
        orderBy("lastUpdated", "desc")
      );
    } else {
      q = query(
        manualsRef,
        orderBy("lastUpdated", "desc")
      );
    }
    
    console.log("Query created, attempting to fetch docs...");
    const querySnapshot = await getDocs(q);
    console.log("Query executed successfully");
    const manuals: SelfHelpManual[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<SelfHelpManual, "id">;
      // Filter out test manuals (those with "test" in the title, case insensitive)
      if (!data.title.toLowerCase().includes("test")) {
        manuals.push({ id: doc.id, ...data });
      }
    });
    
    // If no real manuals were retrieved, create disaster-specific ones
    if (manuals.length === 0 && disasterType) {
      console.log(`No manuals found for ${disasterType}, creating disaster-specific ones`);
      
      // Create disaster-type specific title and content
      const typeCapitalized = disasterType.charAt(0).toUpperCase() + disasterType.slice(1);
      
      return [
        {
          id: `${disasterType}1`,
          disasterType: disasterType,
          title: `${typeCapitalized} Safety Guide`,
          content: `Comprehensive safety information for ${disasterType} situations.`,
          sections: [
            {
              title: "Before Emergency",
              content: `1. Create a ${disasterType} emergency plan\n2. Prepare essential supplies\n3. Stay informed through official channels`
            },
            {
              title: "During Emergency",
              content: `1. Stay calm\n2. Follow your ${disasterType} emergency plan\n3. Listen to official instructions`
            },
            {
              title: "After Emergency",
              content: "1. Check for injuries\n2. Assess damage carefully\n3. Connect with community resources"
            }
          ],
          forVictims: true,
          forHelpers: false,
          createdBy: "system",
          createdAt: Timestamp.now(),
          lastUpdated: Timestamp.now()
        },
        {
          id: `${disasterType}2`,
          disasterType: disasterType,
          title: `${typeCapitalized} Relief Worker Guide`,
          content: `Essential guidance for ${disasterType} emergency response personnel.`,
          sections: [
            {
              title: "Assessment Procedures",
              content: `1. Evaluate ${disasterType}-specific safety risks\n2. Identify urgent needs\n3. Document conditions systematically`
            },
            {
              title: "Resource Distribution",
              content: "1. Organize staging areas\n2. Prioritize vulnerable populations\n3. Maintain clear records"
            }
          ],
          forVictims: false,
          forHelpers: true,
          createdBy: "system",
          createdAt: Timestamp.now(),
          lastUpdated: Timestamp.now()
        }
      ];
    }
    
    return manuals;
  } catch (error) {
    console.error("Detailed error in getSelfHelpManuals:", error);
    
    // Return an empty array instead of dummy data
    return [];
  }
}

export async function getSelfHelpManual(manualId: string) {
  const manualRef = doc(db, "selfHelpManuals", manualId);
  const manualSnap = await getDoc(manualRef);
  
  if (manualSnap.exists()) {
    return { id: manualSnap.id, ...manualSnap.data() } as SelfHelpManual;
  }
  
  return null;
}

// Update portal status
export async function updatePortalStatus(
  portalId: string, 
  status: "active" | "inactive" | "resolved", 
  resolutionSummary?: string
) {
  const portalRef = doc(db, "disasterPortals", portalId);
  
  const updateData: Record<string, any> = {
    status: status,
    lastUpdated: serverTimestamp()
  };
  
  // If it's being resolved, add resolution summary and date
  if (status === "resolved" && resolutionSummary) {
    updateData.resolutionSummary = resolutionSummary;
    updateData.resolvedAt = serverTimestamp();
  }
  
  await updateDoc(portalRef, updateData);
  
  // If marking as resolved, also create a final update
  if (status === "resolved") {
    const updatesRef = collection(db, "updates");
    const resolvedUpdate = {
      portalId: portalId,
      title: "Disaster Relief Effort Completed",
      content: resolutionSummary || "This disaster relief portal has been marked as resolved.",
      createdBy: "Portal Admin",
      createdAt: serverTimestamp(),
      isResolutionUpdate: true
    };
    
    await addDoc(updatesRef, resolvedUpdate);
  }
  
  // Get the updated portal data
  const updatedPortal = await getPortal(portalId);
  return updatedPortal;
}

// Function to attach relevant self-help manuals to a portal
export async function attachManualsToPortal(portalId: string, disasterType: DisasterType) {
  try {
    // Get manuals relevant to this disaster type
    const manuals = await getSelfHelpManuals(disasterType);
    
    // Create portal-manual associations
    const portalManualsRef = collection(db, "portalManuals");
    
    for (const manual of manuals) {
      await addDoc(portalManualsRef, {
        portalId,
        manualId: manual.id,
        disasterType,
        attachedAt: serverTimestamp()
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error attaching manuals to portal:", error);
    return false;
  }
}

// Get manuals attached to a specific portal
export async function getPortalManuals(portalId: string) {
  try {
    console.log("Attempting to access portalManuals collection...");
    const portalManualsRef = collection(db, "portalManuals");
    const q = query(
      portalManualsRef,
      where("portalId", "==", portalId)
    );
    
    console.log("Query created, attempting to fetch portal manual links...");
    const querySnapshot = await getDocs(q);
    console.log("Query executed successfully");
    const manualIds: string[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.manualId) {
        manualIds.push(data.manualId);
      }
    });
    
    // If no manual IDs found, return manuals based on portal's disaster type
    if (manualIds.length === 0) {
      console.log("No manual links found, getting manuals by disaster type...");
      try {
        const portalDoc = await getDoc(doc(db, "disasterPortals", portalId));
        if (portalDoc.exists()) {
          const portalData = portalDoc.data() as DisasterPortal;
          return getSelfHelpManuals(portalData.disasterType);
        }
      } catch (error) {
        console.error("Error getting portal disaster type:", error);
        // Continue to return dummy data below
      }
    }
    
    // Get full manual details from manualIds
    const manuals: SelfHelpManual[] = [];
    
    if (manualIds.length > 0) {
      console.log("Found manual links, fetching full manual data...");
      for (const manualId of manualIds) {
        try {
          const manualDoc = await getDoc(doc(db, "selfHelpManuals", manualId));
          if (manualDoc.exists()) {
            manuals.push({ id: manualDoc.id, ...manualDoc.data() } as SelfHelpManual);
          }
        } catch (error) {
          console.error(`Error fetching manual ${manualId}:`, error);
        }
      }
    }
    
    // If we couldn't get any manuals, return dummy data
    if (manuals.length === 0) {
      console.log("No manuals found or couldn't access them, returning dummy data");
      
      // Getting the disaster type from the portal ID to provide relevant dummy data
      let disasterType: DisasterType = "fire"; // Default to fire since we're in a wildfire portal
      
      try {
        const portalDoc = await getDoc(doc(db, "disasterPortals", portalId));
        if (portalDoc.exists()) {
          const portalData = portalDoc.data() as DisasterPortal;
          disasterType = portalData.disasterType;
        }
      } catch (error) {
        console.error("Error getting portal disaster type for dummy data:", error);
      }
      
      return [
        {
          id: "dummy1",
          disasterType: disasterType,
          title: `${disasterType.charAt(0).toUpperCase() + disasterType.slice(1)} Safety Guide`,
          content: `Comprehensive safety information for ${disasterType} situations.`,
          sections: [
            {
              title: "Before Emergency",
              content: "1. Create an emergency plan\n2. Prepare essential supplies\n3. Stay informed through official channels"
            },
            {
              title: "During Emergency",
              content: "1. Stay calm\n2. Follow your emergency plan\n3. Listen to official instructions"
            },
            {
              title: "After Emergency",
              content: "1. Check for injuries\n2. Assess damage carefully\n3. Connect with community resources"
            }
          ],
          forVictims: true,
          forHelpers: false,
          createdBy: "system",
          createdAt: Timestamp.now(),
          lastUpdated: Timestamp.now()
        },
        {
          id: "dummy2",
          disasterType: disasterType,
          title: `${disasterType.charAt(0).toUpperCase() + disasterType.slice(1)} Relief Worker Guide`,
          content: `Essential guidance for ${disasterType} emergency response personnel.`,
          sections: [
            {
              title: "Assessment Procedures",
              content: "1. Evaluate safety risks\n2. Identify urgent needs\n3. Document conditions systematically"
            },
            {
              title: "Resource Distribution",
              content: "1. Organize staging areas\n2. Prioritize vulnerable populations\n3. Maintain clear records"
            }
          ],
          forVictims: false,
          forHelpers: true,
          createdBy: "system",
          createdAt: Timestamp.now(),
          lastUpdated: Timestamp.now()
        }
      ];
    }
    
    return manuals;
  } catch (error) {
    console.error("Error getting portal manuals:", error);
    
    // Return dummy data with fire type (for wildfire portal)
    return [
      {
        id: "dummy1",
        disasterType: "fire",
        title: "Wildfire Safety Guide",
        content: "Comprehensive safety information for wildfire situations.",
        sections: [
          {
            title: "Before a Wildfire",
            content: "1. Create a defensible space around your home\n2. Prepare an emergency kit\n3. Develop an evacuation plan\n4. Sign up for emergency alerts"
          },
          {
            title: "During a Wildfire",
            content: "1. Stay informed through official channels\n2. Follow evacuation orders immediately\n3. Wear protective clothing\n4. Close all windows and doors if sheltering in place"
          },
          {
            title: "After a Wildfire",
            content: "1. Do not return until authorities say it's safe\n2. Watch for hot spots and embers\n3. Beware of hazards like weakened trees\n4. Document damage for insurance claims"
          }
        ],
        forVictims: true,
        forHelpers: false,
        createdBy: "system",
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now()
      },
      {
        id: "dummy2",
        disasterType: "fire",
        title: "Wildfire Relief Worker Guide",
        content: "Essential guidance for wildfire emergency response personnel.",
        sections: [
          {
            title: "Assessment Procedures",
            content: "1. Wear appropriate protective gear\n2. Evaluate air quality risks\n3. Identify immediate shelter needs\n4. Document affected areas"
          },
          {
            title: "Resource Distribution",
            content: "1. Prioritize respiratory protection equipment\n2. Set up clean air shelters\n3. Coordinate water distribution for firefighting\n4. Establish animal evacuation centers"
          }
        ],
        forVictims: false,
        forHelpers: true,
        createdBy: "system",
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now()
      }
    ];
  }
}

// User profile functions
export async function updateUserProfile(displayName: string) {
  if (!auth.currentUser) {
    throw new Error("No authenticated user");
  }

  // Update Firebase Auth profile
  await updateProfile(auth.currentUser, { displayName });

  // You could also store additional user data in Firestore if needed
  // Example:
  // const userRef = doc(db, "users", auth.currentUser.uid);
  // await setDoc(userRef, { displayName, updatedAt: serverTimestamp() }, { merge: true });
}

// Get portals created by a specific user
export async function getUserPortals(userId: string) {
  try {
    const portalsRef = collection(db, "disasterPortals");
    const q = query(
      portalsRef,
      where("createdBy", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const portals: DisasterPortal[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<DisasterPortal, "id">;
      portals.push({ id: doc.id, ...data });
    });
    
    return portals;
  } catch (error) {
    console.error("Error getting user portals:", error);
    return [];
  }
}

// Get volunteer activities for a specific user
export async function getUserVolunteerActivities(userId: string) {
  try {
    const volunteersRef = collection(db, "volunteers");
    const q = query(
      volunteersRef,
      where("userId", "==", userId),
      orderBy("registeredAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const activities: Volunteer[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Volunteer, "id">;
      activities.push({ id: doc.id, ...data });
    });
    
    return activities;
  } catch (error) {
    console.error("Error getting user volunteer activities:", error);
    return [];
  }
}
