import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationSidebar from "./NotificationSidebar";
import NotificationNavbar from "./NotificationNavbar";
import toast from "react-hot-toast";
import { FiHeart, FiMessageCircle, FiSend, FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import "../../assets/css/dashboard.css";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]); 
  const [newPostContent, setNewPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMyPosts, setIsLoadingMyPosts] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    let data = [];

    try {
      const res = await fetch("http://localhost:8000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      data = await res.json();

      const mappedPosts = data.map((post) => ({
        id: post.id,
        user: post.user.name,
        user_id: post.user_id,
        avatar: `https://api.dicebear.com/7.x/micah/png?seed=${post.user_id}`,
        content: post.content,
        likes: post.likes_count,
        comments: post.comments_count,
        time: new Date(post.created_at).toLocaleString(),
        likedByUser: post.liked_by_user,
      }));

      setRecentPosts(mappedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      const initialLikes = {};
      data.forEach((post) => {
        initialLikes[post.id] = post.liked_by_user;
      });
      setLikedPosts(initialLikes);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/my-posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();

        const mappedPosts = data.map((post) => ({
          id: post.id,
          user: post.user.name,
          avatar: `https://api.dicebear.com/7.x/micah/png?seed=${post.user_id}`,
          content: post.content,
          likes: post.likes_count,
          comments: post.comments_count,
          time: new Date(post.created_at).toLocaleString(),
        }));

        setMyPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching my posts", error);
      } finally {
        setIsLoadingMyPosts(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }

    fetchPosts();
    fetchMyPosts();
  }, [navigate]);
  const handleAddPost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!newPostContent.trim()) return;
    if (!user) {
      console.error("User not loaded yet");
      return;
    }

    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "Add A New Post To Your Dashboard",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add It!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPostContent }),
      });

      if (response.ok) {
        toast.success("Posted Successfully!");
        setNewPostContent("");

        try {
          const res = await fetch(
            "http://localhost:8000/api/add-post-notification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.ok) {
            toast.success("Post Notification Sent Successfully!");
            window.location.reload();
          } else {
            const errorText = await res.text();
            console.warn("Notification failed:", errorText);
          }
        } catch (error) {
          console.error("Error sending post notification:", error);
        }

        fetchPosts();
      } else {
        const errorText = await response.text();
        toast.error(`Failed to post: ${errorText}`);
        console.error("Post creation failed:", errorText);
      }
    } catch (error) {
      console.error("Error Posting Post", error);
      toast.error("Error posting your post. Please try again.");
    }
  };

  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    try {
      const response = await fetch("http://localhost:8000/api/posts-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: postId,
          comment,
        }),
      });

      if (response.ok) {
        toast.success("Comment Added Successfully!");
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        window.location.reload();
        fetchPosts();
      }
    } catch (error) {
      console.error("Error Commenting Post", error);
    }
  };

  const handleDeletePost = (id) => {
    console.log("Deleting post:", id);
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            "http://localhost:8000/api/delete-post",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                post_id: id,
              }),
            }
          );
          if (response.ok) {
            toast.success("Post Deleted Successfully!");
            const res = await fetch(
              "http://localhost:8000/api/delete-notification",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              toast.success("Notification Deleted Successfully!");
              window.location.reload();
            }
          }
        } catch (error) {
          console.error("Error Deleting Post", error);
        }
      }
    });
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleDoubleClick = async (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: true,
    }));
    const user_id = user.id;
    console.log("Like API called for post ID:", postId, user_id);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/posts-like", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: user_id,
        }),
      });
      if (response.ok) {
        toast.success("You Liked this Post!");
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: true,
        }));
        window.location.reload();
      } else {
        toast.error("You Already Liked this Post");
      }
    } catch (error) {
      console.error("Error Liking Post", error);
    }
  };

  if (!user) {
    return <div className="db-loading">Loading user...</div>;
  }

  return (
    <div className="db-container">
      <NotificationSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="db-main-content">
        <NotificationNavbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search dashboard..."
        />

        <div className="db-content-area">
          <div className="db-header">
            <h1 className="db-title">NotifyHub Media Overview</h1>
            <p className="db-subtitle">
              Manage your social presence and engage with your audience.
            </p>
          </div>

          {/* Add Post */}
          <div className="db-add-post-section">
            <form onSubmit={handleAddPost} className="db-add-post-form">
              <textarea
                className="db-add-post-input"
                placeholder="Share something..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                maxLength={280}
              />
              <button type="submit" className="db-add-post-button">
                <FiSend className="inline mr-2" /> Post
              </button>
            </form>
          </div>

          {/* Recent Posts */}
          <div className="db-activity-section">
            <div className="db-section-header">
              <h3>Recent Posts</h3>
              <button className="db-view-all">View All</button>
            </div>
            <div className="db-activity-grid">
              {isLoading ? (
                <div className="notify-loading-state">
                  <div className="notify-spinner"></div>
                  <p>Loading posts...</p>
                </div>
              ) : recentPosts.length === 0 ? (
                <div className="notify-empty-state">
                  <img src="/images/empty-users.svg" alt="No posts" />
                  <h3>No posts found</h3>
                  <p>Try adding a new post to get started</p>
                </div>
              ) : (
                recentPosts.map((post) => (
                  <div className="db-activity-card" key={post.id}>
                    <div className="db-activity-card-header">
                      <div className="db-activity-avatar">
                        <div
                          className="db-avatar-img"
                          style={{ backgroundImage: `url(${post.avatar})` }}
                        ></div>
                      </div>
                      <div className="db-activity-user">
                        <p className="db-activity-username">{post.user}</p>
                        <p className="db-activity-time">{post.time}</p>
                      </div>
                    </div>
                    <div className="db-activity-content">
                      <p className="db-activity-text">{post.content}</p>
                      <div className="db-post-actions">
                        <span
                          className="db-post-action cursor-pointer select-none"
                          onDoubleClick={() => handleDoubleClick(post.id)}
                        >
                          {likedPosts[post.id] ? (
                            <FaHeart className="inline mr-1 text-pink-500" />
                          ) : (
                            <FiHeart className="inline mr-1 text-pink-500" />
                          )}
                          {post.likes}
                        </span>

                        <span className="db-post-action">
                          <FiMessageCircle className="inline mr-1 text-blue-500" />{" "}
                          {post.comments}
                        </span>
                      </div>
                      <form
                        onSubmit={(e) => handleCommentSubmit(post.id, e)}
                        className="db-comment-form"
                      >
                        <input
                          type="text"
                          className="db-comment-input"
                          placeholder="Add a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            handleCommentChange(post.id, e.target.value)
                          }
                        />
                        <button type="submit" className="db-comment-button">
                          <FiSend className="inline" />
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <br></br>
          <div className="db-activity-section">
            <div className="db-section-header">
              <h3>My Posts</h3>
              <button className="db-view-all">View All</button>
            </div>
            <div className="db-activity-grid">
              {isLoadingMyPosts ? (
                <div className="notify-loading-state">
                  <div className="notify-spinner"></div>
                  <p>Loading your posts...</p>
                </div>
              ) : myPosts.length === 0 ? (
                <div className="notify-empty-state">
                  <img src="/images/empty-users.svg" alt="No posts" />
                  <h3>No posts found</h3>
                  <p>Try adding a new post to get started</p>
                </div>
              ) : (
                myPosts.map((post) => (
                  <div className="db-activity-card" key={post.id}>
                    <div className="db-activity-card-header">
                      <div className="db-activity-avatar">
                        <div
                          className="db-avatar-img"
                          style={{ backgroundImage: `url(${post.avatar})` }}
                        ></div>
                      </div>
                      <div className="db-activity-user">
                        <p className="db-activity-username">{post.user}</p>
                        <p className="db-activity-time">{post.time}</p>
                      </div>
                    </div>
                    <div className="db-activity-content">
                      <p className="db-activity-text">{post.content}</p>
                      <div className="db-post-actions">
                        <div className="db-post-actions">
                          <button
                            type="submit"
                            onClick={() => handleDeletePost(post.id)} // <-- fix here
                            className="db-action-btn"
                          >
                            <FiTrash2 className="inline mr-1 text-red-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
