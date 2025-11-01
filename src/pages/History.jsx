import React, { useEffect, useState } from 'react';
import { getHistory, deleteSummary } from '../services/articleService';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data);
      } catch (err) {
        alert('Failed to load history');
        console.error('❌ Fetch error:', err);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    console.log('🧪 Deleting summary with ID:', id);
    try {
      await deleteSummary(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete summary');
      console.error('❌ Delete failed:', err);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Summary copied to clipboard');
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
      <div className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-lg relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          🕘 Your Summary History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">
            No summaries found yet. Start summarizing!
          </p>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Timestamp & Length Badge */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    🕐 {formatTimestamp(item.createdAt)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* ✅ Word Count Badge */}
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {countWords(item.summaryText)} words
                    </span>
                    {/* Length Badge */}
                    {item.summaryLength && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLengthBadgeColor(item.summaryLength)}`}>
                        {item.summaryLength.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    📝 Original Text
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {item.originalText}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    📌 Summary
                  </h3>
                  <p className="text-gray-800 whitespace-pre-line">
                    {item.summaryText}
                  </p>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => handleCopy(item.summaryText)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
