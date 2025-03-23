import { Menu, X, Palette, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Artists', path: '/artists' },
    { name: 'Resources', path: '/resources' },
  ];

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-600 via-pink-700 to-black shadow-lg bg-opacity-90 backdrop-blur-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div whileHover={{ rotate: 20 }} transition={{ duration: 0.3 }}>
              <Palette className="h-10 w-10 text-white drop-shadow-md" />
            </motion.div>
            <span className="ml-2 text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
              Political Art Gallery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className="text-white px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-pink-600 shadow-md"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Profile Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center text-white px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-pink-600 shadow-md"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                {user?.username}
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-pink-50 hover:text-pink-600"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <UserIcon className="h-4 w-4 inline mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-pink-50 hover:text-pink-600"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-pink-300 transition-all"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-gradient-to-br from-pink-800 to-black shadow-xl rounded-b-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className="block text-white text-lg font-medium px-4 py-2 rounded-md transition-all hover:bg-white hover:text-pink-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/profile"
                  className="block text-white text-lg font-medium px-4 py-2 rounded-md transition-all hover:bg-white hover:text-pink-600"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-white text-lg font-medium px-4 py-2 rounded-md transition-all hover:bg-white hover:text-pink-600"
                >
                  Sign Out
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}