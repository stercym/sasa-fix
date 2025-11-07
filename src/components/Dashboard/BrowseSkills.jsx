import { useState } from 'react';

const BrowseSkills = ({ posts, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.type === filter;
    const matchesSearch = post.skill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Browse Skills</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="offer">Offers</option>
            <option value="request">Requests</option>
          </select>
        </div>

        <div className="overflow-y-auto max-h-96">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No skills found. {posts.length === 0 ? 'Create your first post!' : 'Try adjusting your search.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{post.skill_name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.type === 'offer' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {post.type === 'offer' ? '🧰 Offering' : '🙋 Requesting'}
                    </span>
                  </div>
                  {post.description && (
                    <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>By {post.user_name || 'Anonymous'}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <button className="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700">
                    Contact
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseSkills;