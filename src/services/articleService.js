import axiosInstance from './axiosInstance';

// 🔍 Summarization related APIs
export const summarizeArticle = (payload) =>
  axiosInstance.post('/summaries/createSummary', payload);

export const getHistory = () =>
  axiosInstance.get('/summaries/history');

export const deleteSummary = (id) =>
  axiosInstance.delete(`/summaries/deleteById/${id}`);

// 📚 Articles related APIs — ✅ Updated names
export const getArticles = () =>
  axiosInstance.get('/articles/history');

export const deleteArticle = (id) =>
  axiosInstance.delete(`/articles/deleteById/${id}`);

// 🔗 Summarize article from link — ✅ NEW
export const summarizeArticleFromLink = (payload) =>
  axiosInstance.post('/articles/summarizeFromLink', payload);