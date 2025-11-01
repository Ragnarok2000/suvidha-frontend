import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Summarizer from './pages/Summarizer';
import History from './pages/History';
import ArticleHistory from './pages/ArtilceHistory';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm'; // ✅ Import Contact Form

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      {/* to avoid overlap with fixed navbar */}
      <div className="pt-16 min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/summarizer"
            element={
              <ProtectedRoute>
                <Summarizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <ArticleHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<ContactForm />} /> {/* ✅ Optional contact route */}
        </Routes>

        <Footer /> {/* ✅ Footer appears below all routes */}
      </div>
    </BrowserRouter>
  );
};

export default App;