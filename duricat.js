import React, { useState, useEffect } from 'react';
import { PlusCircle, Heart, Calendar, Tag, Sparkles, Camera, Coffee, Star, ArrowRight, Bookmark, Share2, Eye } from 'lucide-react';

const MacBlog = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Great Durian Awakening",
      content: "Picture this: Luna, our elegant Persian cat, sits regally in the morning sunlight streaming through our kitchen window. Before her lies a spiky, golden treasure - her first encounter with the infamous durian. What started as cautious sniffing quickly escalated into an obsession that would change our household forever. The way she delicately extracted each creamy morsel with surgical precision was nothing short of art. Now, every morning begins with Luna's expectant gaze toward the fruit bowl, hoping for another taste of paradise.",
      date: "2025-06-20",
      tags: ["durian", "Luna", "morning ritual", "Persian cat"],
      likes: 127,
      views: 892,
      category: "Adventures",
      featured: true,
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Whiskers vs. The Spiky Fortress",
      content: "Our brave tabby Whiskers has declared war on durian shells. What began as innocent curiosity has evolved into a daily battle of wits between cat and fruit. Armed with nothing but determination and razor-sharp claws, Whiskers has developed a sophisticated strategy for breaching the durian's natural defenses. The kitchen has become his battlefield, littered with the remnants of his conquests. Victory tastes sweet, creamy, and slightly pungent.",
      date: "2025-06-18",
      tags: ["Whiskers", "tabby", "adventure", "kitchen chaos"],
      likes: 89,
      views: 651,
      category: "Mischief",
      featured: false,
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "Midnight Durian Heist Chronicles",
      content: "At 3 AM, I awoke to the sound of careful paws navigating our hardwood floors. Following the noise, I discovered Mittens orchestrating the most elaborate durian heist in feline history. Using teamwork that would make Ocean's Eleven jealous, our three cats had formed an assembly line: Mittens the mastermind, Luna the lookout, and Whiskers the muscle. The precision of their operation was breathtaking - no shells were harmed, no evidence left behind, just three very satisfied cats with slightly guilty expressions.",
      date: "2025-06-15",
      tags: ["Mittens", "teamwork", "midnight", "heist"],
      likes: 203,
      views: 1247,
      category: "Shenanigans",
      featured: true,
      readTime: "4 min read"
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'Adventures'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Adventures', 'Mischief', 'Shenanigans', 'Daily Life'];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const handleSubmit = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        date: new Date().toISOString().split('T')[0],
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        likes: 0,
        views: 0,
        category: newPost.category,
        featured: false,
        readTime: Math.ceil(newPost.content.split(' ').length / 200) + ' min read'
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', tags: '', category: 'Adventures' });
      setCurrentView('home');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPosts = posts.filter(post => post.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse mb-4 mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading the purr-fect stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Floating Mac-style menu bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 px-2 py-2">
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700 ml-2">🐱✨ Cats & Durian</span>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                currentView === 'home' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Sparkles size={16} />
              <span className="font-medium">Stories</span>
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                currentView === 'dashboard' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <PlusCircle size={16} />
              <span className="font-medium">Create</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12">
        {currentView === 'home' ? (
          <div className="max-w-6xl mx-auto px-6">
            {/* Hero Section with Animated Background */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl shadow-2xl mb-12 transform hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
              <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-20 w-8 h-8 bg-white/10 rounded-full animate-bounce delay-300"></div>
              
              <div className="relative z-10 p-12 text-center text-white">
                <div className="text-8xl mb-6 animate-bounce">🐱</div>
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  Cats & Durian Chronicles
                </h1>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Where whiskers meet the king of fruits in the most delightful and chaotic adventures imaginable
                </p>
                <div className="flex items-center justify-center space-x-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <Eye size={20} />
                    <span>{posts.reduce((acc, post) => acc + post.views, 0)} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart size={20} />
                    <span>{posts.reduce((acc, post) => acc + post.likes, 0)} likes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={20} />
                    <span>{posts.length} stories</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Posts */}
            {selectedCategory === 'All' && featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  ✨ Featured Adventures
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          FEATURED
                        </span>
                      </div>
                      
                      <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          🐱
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-white/90 text-purple-700 text-sm font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {post.content.substring(0, 120)}...
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{formatDate(post.date)}</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleLike(post.id)}
                              className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Heart size={16} />
                              <span>{post.likes}</span>
                            </button>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Eye size={16} />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          <ArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform" size={18} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                {selectedCategory === 'All' ? '📚 All Stories' : `📚 ${selectedCategory} Stories`}
              </h2>
              
              {filteredPosts.map((post, index) => (
                <article key={post.id} className={`group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex`}>
                  <div className="lg:w-1/3 h-64 lg:h-auto bg-gradient-to-r from-purple-400 to-pink-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      🐱
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-purple-700 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-purple-500 rounded-full hover:bg-purple-50 transition-all">
                          <Bookmark size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-500 rounded-full hover:bg-purple-50 transition-all">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors cursor-pointer">
                          <Tag size={12} />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
                        >
                          <Heart size={18} />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Eye size={18} />
                          <span className="font-medium">{post.views}</span>
                        </div>
                      </div>
                      <ArrowRight className="text-purple-500 group-hover:translate-x-2 transition-transform" size={20} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          // Dashboard
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <PlusCircle size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Create Your Story</h2>
                    <p className="text-purple-100">Share your cat's latest durian adventure with the world</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                      <Coffee size={16} />
                      <span>Story Title</span>
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                      placeholder="The Great Durian Mystery..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                      <Tag size={16} />
                      <span>Category</span>
                    </label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                    >
                      <option value="Adventures">Adventures</option>
                      <option value="Mischief">Mischief</option>
                      <option value="Shenanigans">Shenanigans</option>
                      <option value="Daily Life">Daily Life</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <Sparkles size={16} />
                    <span>Your Story</span>
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={10}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-lg leading-relaxed"
                    placeholder="Tell us about your cat's encounter with the spiky king of fruits. Was it love at first sniff? Did chaos ensue? Paint us a picture with your words..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <Tag size={16} />
                    <span>Tags</span>
                  </label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="durian, adventure, chaos, Persian cat, kitchen disaster"
                  />
                  <p className="text-sm text-gray-500 mt-2">Separate tags with commas</p>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Sparkles size={20} />
                    <span>Publish Story</span>
                  </button>
                  
                  <button
                    onClick={() => setNewPost({ title: '', content: '', tags: '', category: 'Adventures' })}
                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-bold text-lg"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Stories</p>
                    <p className="text-3xl font-bold text-gray-800">{posts.length}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Likes</p>
                    <p className="text-3xl font-bold text-gray-800">{posts.reduce((acc, post) => acc + post.likes, 0)}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Heart className="text-red-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Views</p>
                    <p className="text-3xl font-bold text-gray-800">{posts.reduce((acc, post) => acc + post.views, 0)}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Eye className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacBlog;
