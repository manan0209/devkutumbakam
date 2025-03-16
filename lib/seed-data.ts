import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { DisasterType } from "./db";
import { db } from "./firebase";

export async function seedSelfHelpManuals() {
  const manualsRef = collection(db, "selfHelpManuals");
  
  const manuals = [
    // Flood manuals
    {
      disasterType: "flood" as DisasterType,
      title: "Flood Safety and Preparedness Guide",
      content: "Comprehensive guide for flood safety and preparedness.",
      sections: [
        {
          title: "Before a Flood",
          content: "1. Know your area's flood risk\n2. Prepare an emergency kit\n3. Create a family communication plan\n4. Elevate electrical appliances\n5. Install check valves in plumbing\n6. Waterproof your basement\n7. Consider flood insurance"
        },
        {
          title: "During a Flood",
          content: "1. Listen to local alerts\n2. If told to evacuate, do so immediately\n3. Move to higher ground\n4. Do not walk, swim, or drive through flood waters\n5. Stay off bridges over fast-moving water\n6. Disconnect utilities if instructed"
        },
        {
          title: "After a Flood",
          content: "1. Return home only when authorities say it's safe\n2. Avoid walking in flood water\n3. Do not use electrical appliances that were wet\n4. Clean and disinfect everything that got wet\n5. Be aware of areas where floodwaters have receded\n6. Take photos of damage for insurance claims"
        }
      ],
      forVictims: true,
      forHelpers: false,
      createdBy: "system",
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    },
    {
      disasterType: "flood" as DisasterType,
      title: "Flood Response Guide for Relief Workers",
      content: "Comprehensive guide for relief workers assisting in flood-affected areas.",
      sections: [
        {
          title: "Before Deployment",
          content: "1. Complete required training\n2. Ensure vaccinations are up-to-date\n3. Pack appropriate gear including waterproof boots\n4. Understand local geography and flood patterns\n5. Review safety protocols"
        },
        {
          title: "During Relief Work",
          content: "1. Always work in teams\n2. Use proper PPE including life jackets when near water\n3. Test water depth before walking\n4. Be aware of electrical hazards\n5. Watch for dangerous animals\n6. Follow established communication protocols"
        },
        {
          title: "Assisting Victims",
          content: "1. Prioritize medical emergencies\n2. Distribute clean water and food safely\n3. Help establish temporary shelters\n4. Provide information on available resources\n5. Offer emotional support\n6. Document needs for additional assistance"
        }
      ],
      forVictims: false,
      forHelpers: true,
      createdBy: "system",
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    },
    
    // Earthquake manuals
    {
      disasterType: "earthquake" as DisasterType,
      title: "Earthquake Survival Guide",
      content: "Essential information for earthquake preparedness and response.",
      sections: [
        {
          title: "Before an Earthquake",
          content: "1. Secure heavy furniture to walls\n2. Know where utility shutoffs are located\n3. Create an emergency plan and kit\n4. Identify safe spots in each room\n5. Practice \"drop, cover, and hold on\"\n6. Reinforce your building if needed"
        },
        {
          title: "During an Earthquake",
          content: "1. DROP to the ground\n2. Take COVER under sturdy furniture\n3. HOLD ON until shaking stops\n4. If outdoors, move to an open area away from buildings\n5. If driving, pull over safely away from buildings and trees\n6. If in bed, stay there and protect your head with a pillow"
        },
        {
          title: "After an Earthquake",
          content: "1. Check yourself and others for injuries\n2. Look for small fires and extinguish if possible\n3. Listen to emergency broadcasts\n4. Expect aftershocks\n5. Check for gas leaks and damaged electrical lines\n6. Inspect your home for structural damage\n7. Stay out of damaged buildings"
        }
      ],
      forVictims: true,
      forHelpers: false,
      createdBy: "system",
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    },
    
    // Other disaster types
    {
      disasterType: "cyclone" as DisasterType,
      title: "Cyclone Preparation and Response",
      content: "Complete guide for cyclone/hurricane safety.",
      sections: [
        {
          title: "Before a Cyclone",
          content: "1. Know your evacuation route\n2. Strengthen your home (roof, windows, doors)\n3. Trim trees and clear loose objects\n4. Prepare emergency supplies for at least 3 days\n5. Fill containers with clean water\n6. Keep important documents in waterproof containers"
        },
        {
          title: "During a Cyclone",
          content: "1. Stay indoors away from windows\n2. Take shelter in the strongest part of the building\n3. If flooding occurs, move to higher levels\n4. Turn off electricity and gas if instructed\n5. Listen to emergency broadcasts\n6. Do not venture outside during the eye of the storm"
        },
        {
          title: "After a Cyclone",
          content: "1. Wait for official all-clear before going outside\n2. Watch for fallen power lines and flood water\n3. Check your home for damage\n4. Drink only bottled or treated water\n5. Use phones only for emergencies\n6. Help neighbors, especially elderly and disabled"
        }
      ],
      forVictims: true,
      forHelpers: true,
      createdBy: "system",
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    }
  ];
  
  for (const manual of manuals) {
    try {
      await addDoc(manualsRef, manual);
      console.log(`Added manual: ${manual.title}`);
    } catch (error) {
      console.error(`Error adding manual ${manual.title}:`, error);
    }
  }
  
  console.log("Finished seeding self-help manuals");
}

export async function seedForumPosts() {
  const postsRef = collection(db, "forumPosts");
  
  // Function to add sample forum posts for a specific portal
  async function addPostsForPortal(portalId: string) {
    const samplePosts = [
      {
        portalId,
        userId: "system",
        userName: "Relief Coordinator",
        title: "Welcome to the Community Forum",
        content: "Welcome to our community forum. This is a space for everyone to share information, ask questions, and coordinate relief efforts. Please be respectful and supportive of each other during this difficult time.",
        category: "general",
        isAnnouncement: true,
        createdAt: serverTimestamp()
      },
      {
        portalId,
        userId: "system",
        userName: "Local Volunteer",
        title: "Available Resources in Sector 5",
        content: "We have set up a distribution center at the community hall in Sector 5. Available resources include:\n- Drinking water\n- Basic food supplies\n- Blankets\n- First aid kits\nPlease bring identification if possible. For those who cannot come in person, please reply to this post and we'll try to arrange delivery.",
        category: "resource",
        createdAt: serverTimestamp()
      },
      {
        portalId,
        userId: "system",
        userName: "Medical Professional",
        title: "Medical Camp Schedule",
        content: "Our medical team will be running camps at the following locations:\n\n1. Central School: 9am-12pm daily\n2. Railway Station: 2pm-5pm daily\n3. Mobile clinic in affected areas: variable schedule\n\nServices include basic health checkups, first aid, and essential medications. For emergencies, please call our hotline at 108.",
        category: "update",
        createdAt: serverTimestamp()
      },
      {
        portalId,
        userId: "system",
        userName: "Concerned Citizen",
        title: "Need help with elderly relatives in Riverside Colony",
        content: "My grandparents (aged 78 and 82) are in Riverside Colony, which I understand is badly affected. I'm currently out of the city and unable to reach them by phone. Can anyone in that area check on them? Their address is 45 River View Apartments. Thank you!",
        category: "question",
        createdAt: serverTimestamp()
      }
    ];
    
    for (const post of samplePosts) {
      try {
        await addDoc(postsRef, post);
        console.log(`Added forum post: ${post.title}`);
      } catch (error) {
        console.error(`Error adding forum post ${post.title}:`, error);
      }
    }
  }
  
  // Get all portal IDs - in a real scenario you'd fetch them from the database
  // For this example we'll just seed for one sample portal ID
  const samplePortalId = "sample-portal-id"; // Replace with an actual portal ID
  
  await addPostsForPortal(samplePortalId);
  console.log("Finished seeding forum posts");
}

// Add this function to manually add a test manual
export async function addTestManual() {
  try {
    console.log("Attempting to add a test manual...");
    const manualsRef = collection(db, "selfHelpManuals");
    
    const testManual = {
      disasterType: "test" as DisasterType,
      title: "Test Manual",
      content: "This is a test manual to verify write access.",
      sections: [
        {
          title: "Test Section",
          content: "Test content"
        }
      ],
      forVictims: true,
      forHelpers: true,
      createdBy: "system",
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    };
    
    const docRef = await addDoc(manualsRef, testManual);
    console.log("Test manual added with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding test manual:", error);
    return false;
  }
} 