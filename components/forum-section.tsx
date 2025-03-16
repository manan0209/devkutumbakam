"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { createForumComment, createForumPost, ForumComment, ForumPost, getForumComments, getForumPosts } from "@/lib/db"
import { handleFirebaseError } from "@/lib/error-handler"
import { AlertCircle, Clock, MessageCircle, MessageSquarePlus, MessagesSquare, User2 } from "lucide-react"
import { useEffect, useState } from "react"

interface ForumSectionProps {
  portalId: string
  portalName: string
}

export function ForumSection({ portalId, portalName }: ForumSectionProps) {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [comments, setComments] = useState<ForumComment[]>([])
  const [loading, setLoading] = useState(true)
  const [postDialogOpen, setPostDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'all' | 'questions' | 'resources' | 'announcements'>('all')
  
  // Form states
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState<string>("general")
  const [newCommentContent, setNewCommentContent] = useState("")
  const [isAnnouncement, setIsAnnouncement] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  const { user } = useAuth()

  // Fetch all forum posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const fetchedPosts = await getForumPosts(portalId)
        setPosts(fetchedPosts)
      } catch (error) {
        console.error("Error fetching forum posts:", error)
        setError(handleFirebaseError(error, { 
          defaultMessage: "Failed to load forum posts. Please try again later." 
        }))
      } finally {
        setLoading(false)
      }
    }
    
    if (portalId) {
      fetchPosts()
    }
  }, [portalId])
  
  // Fetch comments when a post is selected
  useEffect(() => {
    const fetchComments = async () => {
      if (!selectedPost) return
      
      try {
        const fetchedComments = await getForumComments(selectedPost.id as string)
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
        setError(handleFirebaseError(error, { 
          defaultMessage: "Failed to load comments. Please try again later." 
        }))
      }
    }
    
    if (selectedPost) {
      fetchComments()
    }
  }, [selectedPost])
  
  // Handle post submission
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError("You must be logged in to create a post")
      return
    }
    
    if (!newPostTitle || !newPostContent) {
      setError("Please fill in all required fields")
      return
    }
    
    try {
      setSubmitting(true)
      const postData = {
        portalId,
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory as any,
        isAnnouncement: isAnnouncement
      }
      
      await createForumPost(postData)
      
      // Reset form and refresh posts
      setNewPostTitle("")
      setNewPostContent("")
      setNewPostCategory("general")
      setIsAnnouncement(false)
      setPostDialogOpen(false)
      
      // Fetch posts again
      const fetchedPosts = await getForumPosts(portalId)
      setPosts(fetchedPosts)
      
    } catch (error) {
      setError(handleFirebaseError(error, { 
        defaultMessage: "Failed to create post. Please try again later." 
      }))
    } finally {
      setSubmitting(false)
    }
  }
  
  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError("You must be logged in to comment")
      return
    }
    
    if (!newCommentContent) {
      setError("Please enter a comment")
      return
    }
    
    if (!selectedPost) {
      setError("No post selected")
      return
    }
    
    try {
      setSubmitting(true)
      const commentData = {
        postId: selectedPost.id as string,
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        content: newCommentContent
      }
      
      await createForumComment(commentData)
      
      // Reset form and refresh comments
      setNewCommentContent("")
      
      // Fetch comments again
      const fetchedComments = await getForumComments(selectedPost.id as string)
      setComments(fetchedComments)
      
    } catch (error) {
      setError(handleFirebaseError(error, { 
        defaultMessage: "Failed to post comment. Please try again later." 
      }))
    } finally {
      setSubmitting(false)
    }
  }
  
  // Handle post click - view post details and comments
  const handlePostClick = (post: ForumPost) => {
    setSelectedPost(post)
  }
  
  // Format timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Just now"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  // Filter posts based on view mode
  const filteredPosts = posts.filter(post => {
    if (viewMode === 'all') return true
    if (viewMode === 'questions') return post.category === 'question'
    if (viewMode === 'resources') return post.category === 'resource'
    if (viewMode === 'announcements') return post.isAnnouncement
    return true
  })
  
  // Get category badge style
  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'question':
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 'resource':
        return "bg-green-100 text-green-800 border-green-200"
      case 'update':
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
          <button 
            type="button"
            className="absolute top-2 right-2 text-red-700"
            onClick={() => setError(null)}
            aria-label="Close error message"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Community Forum</h2>
          <p className="text-gray-500">Collaborate, ask questions, and share resources</p>
        </div>
        
        <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <MessageSquarePlus size={16} />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Forum Post</DialogTitle>
              <DialogDescription>
                Share updates, ask questions, or request resources
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handlePostSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="post-title">Title</Label>
                  <Input
                    id="post-title"
                    placeholder="Post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="post-category">Category</Label>
                  <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Discussion</SelectItem>
                      <SelectItem value="question">Question / Help Needed</SelectItem>
                      <SelectItem value="resource">Resource Sharing</SelectItem>
                      <SelectItem value="update">Update / News</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="post-content">Content</Label>
                  <Textarea
                    id="post-content"
                    placeholder="Write your post here..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                {user && (user.email === "admin@kutumbakam.org" || user.email?.endsWith("@admin.kutumbakam.org")) && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is-announcement"
                      checked={isAnnouncement}
                      onChange={(e) => setIsAnnouncement(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="is-announcement">Mark as announcement</Label>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button type="submit">Post</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all" onClick={() => setViewMode('all')}>All Posts</TabsTrigger>
          <TabsTrigger value="questions" onClick={() => setViewMode('questions')}>Questions</TabsTrigger>
          <TabsTrigger value="resources" onClick={() => setViewMode('resources')}>Resources</TabsTrigger>
          <TabsTrigger value="announcements" onClick={() => setViewMode('announcements')}>Announcements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {loading ? (
            <div className="text-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading forum posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${selectedPost?.id === post.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handlePostClick(post)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getCategoryStyle(post.category)}>
                              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                            </Badge>
                            {post.isAnnouncement && (
                              <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                                <AlertCircle size={12} className="mr-1" />
                                Announcement
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-gray-600 line-clamp-2">{post.content}</p>
                    </CardContent>
                    <CardFooter className="pt-0 text-xs text-gray-500 flex justify-between">
                      <div className="flex items-center">
                        <User2 size={12} className="mr-1" />
                        {post.userName}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle size={12} className="mr-1" />
                          0 replies
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
                  <MessagesSquare className="h-12 w-12 text-gray-400 mx-auto" />
                  <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
                  <p className="mt-2 text-gray-500 mb-4">Be the first to start a discussion in this forum</p>
                  <Button onClick={() => setPostDialogOpen(true)}>Create First Post</Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="questions" className="mt-0">
          {/* Same content as "all" tab but filtered - handled by the filteredPosts variable */}
        </TabsContent>
        
        <TabsContent value="resources" className="mt-0">
          {/* Same content as "all" tab but filtered - handled by the filteredPosts variable */}
        </TabsContent>
        
        <TabsContent value="announcements" className="mt-0">
          {/* Same content as "all" tab but filtered - handled by the filteredPosts variable */}
        </TabsContent>
      </Tabs>
      
      {selectedPost && (
        <div className="mt-6 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={getCategoryStyle(selectedPost.category)}>
                {selectedPost.category.charAt(0).toUpperCase() + selectedPost.category.slice(1)}
              </Badge>
              {selectedPost.isAnnouncement && (
                <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                  <AlertCircle size={12} className="mr-1" />
                  Announcement
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-bold">{selectedPost.title}</h3>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <User2 size={14} className="mr-1" />
                {selectedPost.userName}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {formatDate(selectedPost.createdAt)}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white">
            <p className="whitespace-pre-line">{selectedPost.content}</p>
          </div>
          
          <div className="border-t">
            <div className="p-4 bg-gray-50 flex items-center">
              <h4 className="font-medium">Comments ({comments.length})</h4>
            </div>
            
            <div className="p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border rounded-md p-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{comment.userName}</span>
                      <span className="text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No comments yet. Be the first to reply!</p>
                </div>
              )}
              
              {user ? (
                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <div className="flex items-start gap-3">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newCommentContent}
                      onChange={(e) => setNewCommentContent(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit">Post</Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4 bg-gray-50 rounded-md">
                  <p className="text-gray-600">You need to be logged in to comment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 