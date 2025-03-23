import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Artists = lazy(() => import('./pages/Artists'));
const Resources = lazy(() => import('./pages/Resources'));
const Profile = lazy(() => import('./pages/auth/Profile'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));

// Resources
const ArticlePoliticalArt = lazy(() => import('./pages/resources/ArticlePoliticalArt'));
const BookRevolution = lazy(() => import('./pages/resources/BookRevolution'));
const ModernPoliticalArt = lazy(() => import('./pages/resources/ModernPoliticalArt'));
const ArtistResources = lazy(() => import('./pages/resources/ArtistResources'));
const FeministArt = lazy(() => import('./pages/resources/FeministArt'));
const DigitalActivism = lazy(() => import('./pages/resources/DigitalActivism'));
const WarInArt = lazy(() => import('./pages/resources/WarInArt'));
const PropagandaAnalysis = lazy(() => import('./pages/resources/PropagandaAnalysis'));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center text-white">Loading...</div>; // Avoid redirecting before checking auth

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

// Public Route Component (redirects to home if authenticated)
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
              <Routes>
                {/* Auth Routes */}
                <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/collection" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
                <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
                <Route path="/artists" element={<ProtectedRoute><Artists /></ProtectedRoute>} />
                <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                <Route path="/articles/political-art-understanding" element={<ProtectedRoute><ArticlePoliticalArt /></ProtectedRoute>} />
                <Route path="/books/art-and-revolution" element={<ProtectedRoute><BookRevolution /></ProtectedRoute>} />
                <Route path="/videos/modern-political-art" element={<ProtectedRoute><ModernPoliticalArt /></ProtectedRoute>} />
                <Route path="/resources/artist-archives" element={<ProtectedRoute><ArtistResources /></ProtectedRoute>} />
                <Route path="/articles/feminist-art-history" element={<ProtectedRoute><FeministArt /></ProtectedRoute>} />
                <Route path="/videos/digital-activism" element={<ProtectedRoute><DigitalActivism /></ProtectedRoute>} />
                <Route path="/books/war-in-art" element={<ProtectedRoute><WarInArt /></ProtectedRoute>} />
                <Route path="/articles/propaganda-analysis" element={<ProtectedRoute><PropagandaAnalysis /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
