import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Timeline from './pages/Timeline';
import Artists from './pages/Artists';
import Resources from './pages/Resources';
import ArticlePoliticalArt from './pages/resources/ArticlePoliticalArt';
import BookRevolution from './pages/resources/BookRevolution';
import ModernPoliticalArt from './pages/resources/ModernPoliticalArt';
import ArtistResources from './pages/resources/ArtistResources';
import FeministArt from './pages/resources/FeministArt';
import DigitalActivism from './pages/resources/DigitalActivism';
import WarInArt from './pages/resources/WarInArt';
import PropagandaAnalysis from './pages/resources/PropagandaAnalysis';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/auth/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

// Public Route Component (redirects to home if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Auth Routes */}
              <Route path="/signin" element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/collection" element={
                <ProtectedRoute>
                  <Collection />
                </ProtectedRoute>
              } />
              <Route path="/timeline" element={
                <ProtectedRoute>
                  <Timeline />
                </ProtectedRoute>
              } />
              <Route path="/artists" element={
                <ProtectedRoute>
                  <Artists />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              <Route path="/articles/political-art-understanding" element={
                <ProtectedRoute>
                  <ArticlePoliticalArt />
                </ProtectedRoute>
              } />
              <Route path="/books/art-and-revolution" element={
                <ProtectedRoute>
                  <BookRevolution />
                </ProtectedRoute>
              } />
              <Route path="/videos/modern-political-art" element={
                <ProtectedRoute>
                  <ModernPoliticalArt />
                </ProtectedRoute>
              } />
              <Route path="/resources/artist-archives" element={
                <ProtectedRoute>
                  <ArtistResources />
                </ProtectedRoute>
              } />
              <Route path="/articles/feminist-art-history" element={
                <ProtectedRoute>
                  <FeministArt />
                </ProtectedRoute>
              } />
              <Route path="/videos/digital-activism" element={
                <ProtectedRoute>
                  <DigitalActivism />
                </ProtectedRoute>
              } />
              <Route path="/books/war-in-art" element={
                <ProtectedRoute>
                  <WarInArt />
                </ProtectedRoute>
              } />
              <Route path="/articles/propaganda-analysis" element={
                <ProtectedRoute>
                  <PropagandaAnalysis />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;