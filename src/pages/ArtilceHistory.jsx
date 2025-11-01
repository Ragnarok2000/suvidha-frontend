import React, { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../services/articleService';

const ArticleHistory = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load articles');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteArticle(id)
      .then(() => {
        setArticles((prev) => prev.filter((article) => article.id !== id));
      })
      .catch(() => {
        setError('Failed to delete article');
      });
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('en-US', options);
  };

  const getLengthBadgeColor = (length) => {
    switch(length) {
      case 'short': return 'bg-green-100 text-green-700';
      case 'long': return 'bg-purple-100 text-purple-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  // ✅ NEW: Count words in summary
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading articles...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (articles.length === 0) return <div className="text-center mt-10 text-gray-500">No articles found.</div>;

  return (
    <>
      {/* ✅ Watermark image floating above everything */}
      <img
        src="/s.png"
        alt="Watermark"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.15,
          width: '600px',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

      {/* ✅ Content scrolls underneath the watermark */}
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">📚 Your Saved Articles</h2>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li
              key={article.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              {/* Timestamp & Badges */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">
                  🕐 {formatTimestamp(article.createdAt)}
                </div>
                <div className="flex items-center space-x-2">
                  {/* ✅ Word Count Badge */}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {countWords(article.summary)} words
                  </span>
                  {/* Length Badge */}
                  {article.summaryLength && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLengthBadgeColor(article.summaryLength)}`}>
                      {article.summaryLength.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <p className="mb-2">
                <span className="font-semibold text-gray-700">🔗 URL:</span>{' '}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  {article.url}
                </a>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">📝 Content:</span>{' '}
                <span className="text-gray-600">{article.content.slice(0, 200)}...</span>
              </p>
              <p className="mb-4">
                <span className="font-semibold text-gray-700">📄 Summary:</span>{' '}
                <span className="text-gray-600">{article.summary}</span>
              </p>
              <button
                onClick={() => handleDelete(article.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ArticleHistory;
