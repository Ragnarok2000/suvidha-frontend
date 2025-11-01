import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const Summarizer = () => {
  const [mode, setMode] = useState('text');
  const [input, setInput] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Clear input and summary when switching modes
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput(''); // Clear input field
    setSummary(''); // Clear summary
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert('Please enter some text or a URL.');
      return;
    }

    setLoading(true);
    setSummary('');
    try {
      if (mode === 'url') {
        // ✅ Link-based summary → Show result on page
        const res = await axiosInstance.post('/articles/summarizeFromLink', { 
          url: input,
          summaryLength: summaryLength 
        });

        const cleaned = res.data.summary
          .replace(/(?:\[\d+\])/g, '') // remove [1], [3], etc.
          .replace(/\n{2,}/g, '\n')    // remove extra line breaks
          .trim();

        setSummary(cleaned);
      } else {
        // ✅ Text-based summary → Summary History
        const res = await axiosInstance.post('/summaries/createSummary', {
          originalText: input,
          summaryLength: summaryLength
        });

        const cleaned = res.data.summaryText
          .replace(/(?:\[\d+\])/g, '') // remove [1], [3], etc.
          .replace(/\n{2,}/g, '\n')    // remove extra line breaks
          .trim();

        setSummary(cleaned);
      }
    } catch (err) {
      alert('Failed to summarize');
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard');
  };

  const handleViewHistory = () => {
    if (mode === 'url') {
      navigate('/articles');
    } else {
      navigate('/history');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md shadow-xl rounded-xl p-8 text-white">
        <h2 className="text-4xl font-extrabold mb-6 text-center animate-pulse">
          🧠 Suvidha AI Summarizer
        </h2>

        {/* Mode Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleModeChange('text')}
            className={`px-4 py-2 rounded-full transition duration-300 ${
              mode === 'text'
                ? 'bg-white text-indigo-600 font-semibold shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            📝 Text
          </button>
          <button
            onClick={() => handleModeChange('url')}
            className={`px-4 py-2 rounded-full transition duration-300 ${
              mode === 'url'
                ? 'bg-white text-indigo-600 font-semibold shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            🔗 URL
          </button>
        </div>

        {/* Summary Length Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">📏 Summary Length:</label>
          <select
            value={summaryLength}
            onChange={(e) => setSummaryLength(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-black shadow-inner"
          >
            <option value="short">Short (50-150 words)</option>
            <option value="medium">Medium (150-250 words)</option>
            <option value="long">Long (250-500 words)</option>
          </select>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'text' ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste article text here..."
              className="w-full p-4 rounded-lg bg-white text-black h-40 resize-none shadow-inner"
            />
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste article URL here..."
              className="w-full p-4 rounded-lg bg-white text-black shadow-inner"
            />
          )}
          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-indigo-100 transition shadow-md"
          >
            🚀 Summarize
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="mt-6 text-center">
            <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2">Summarizing...</p>
          </div>
        )}

        {/* Summary */}
        {summary && !loading && (
          <div className="mt-6 bg-white text-black p-6 rounded-lg shadow-md relative border-l-4 border-indigo-500">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">📄 Summary:</h3>
            <p className="whitespace-pre-line leading-relaxed text-gray-800">{summary}</p>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                📋 Copy
              </button>
              <button
                onClick={handleViewHistory}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                📚 View History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
