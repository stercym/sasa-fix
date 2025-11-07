import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import CreatePost from './CreatePost';
import BrowseSkills from './BrowseSkills';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showBrowseSkills, setShowBrowseSkills] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('skillPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      user_name: user.name,
      user_id: user.id,
      created_at: new Date().toISOString()
    };
    
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('skillPosts', JSON.stringify(updatedPosts));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Sasa Fix</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <UserProfile user={user} posts={posts} />
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {posts.length === 0 ? (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">No recent activity</p>
                        </div>
                      </div>
                    ) : (
                      posts.slice(-3).reverse().map(post => (
                        <div key={post.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{post.skill_name}</p>
                            <p className="text-xs text-gray-500">
                              {post.type === 'offer' ? 'Offered' : 'Requested'} • {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setShowCreatePost(true)}
                      className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
                    >
                      <div className="text-blue-600 mb-2">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Create Post</p>
                    </button>
                    <button 
                      onClick={() => setShowBrowseSkills(true)}
                      className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
                    >
                      <div className="text-green-600 mb-2">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Browse Skills ({posts.length})</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showCreatePost && (
        <CreatePost 
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}
      
      {showBrowseSkills && (
        <BrowseSkills 
          posts={posts}
          onClose={() => setShowBrowseSkills(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;