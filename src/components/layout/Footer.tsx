
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/book" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Book a Tanker
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Water Quality Reports
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Subscription Plans
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/chatbot" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Helpdesk
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Emergency Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
                  About BWSSB
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              Get the latest updates on water supply and management in Bangalore.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-bwssb-500 focus:border-bwssb-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-bwssb-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-bwssb-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bwssb-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-bwssb-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </span>
          </div>
          <p className="mt-8 text-base text-gray-500 dark:text-gray-400 md:mt-0 md:order-1">
            &copy; 2025 BWSSB Tanker Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
