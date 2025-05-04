
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Bell, User, Settings, ChartBar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-bwssb-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">BW</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-bwssb-800">BWSSB</span>
                <span className="text-xs text-bwssb-600">Tanker Connect</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              >
                <span className="flex items-center gap-1">
                  <Home size={16} />
                  Home
                </span>
              </Link>
              <Link 
                to="/book" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              >
                <span className="flex items-center gap-1">
                  <Bell size={16} />
                  Book Tanker
                </span>
              </Link>
              <Link 
                to="/reports" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              >
                <span className="flex items-center gap-1">
                  <Settings size={16} />
                  Reports
                </span>
              </Link>
              <Link 
                to="/analytics" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              >
                <span className="flex items-center gap-1">
                  <ChartBar size={16} />
                  Analytics
                </span>
              </Link>
              <Link 
                to="/chatbot" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              >
                <span className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  Help
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Link to="/login">
              <Button variant="outline" className="mr-2">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-bwssb-600 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-2">
                <Home size={18} />
                Home
              </span>
            </Link>
            <Link 
              to="/book" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-2">
                <Bell size={18} />
                Book Tanker
              </span>
            </Link>
            <Link 
              to="/reports" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-2">
                <Settings size={18} />
                Reports
              </span>
            </Link>
            <Link 
              to="/analytics" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-2">
                <ChartBar size={18} />
                Analytics
              </span>
            </Link>
            <Link 
              to="/chatbot" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-bwssb-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-2">
                <MessageSquare size={18} />
                Help
              </span>
            </Link>
          </div>
          
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full mb-2">Login</Button>
            </Link>
            <Link to="/register" onClick={toggleMenu}>
              <Button className="w-full">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
