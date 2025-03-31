import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SalesProvider } from './context/salesContext';
import { StockProvider } from "./context/stockContext";
import SalesPage from './pages/sales';
import StockPage from './pages/stock';
import ManageFunds from './pages/money';

function App() {
  return (
    <SalesProvider>
      <StockProvider>
        <Router>
          {/* Enhanced Navigation Bar */}
          <nav className="bg-indigo-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link 
                    to="/" 
                    className="flex-shrink-0 flex items-center text-white hover:text-indigo-100 transition-colors"
                  >
                    <svg 
                      className="h-8 w-8 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 10V3L4 14h7v7l9-11h-7z" 
                      />
                    </svg>
                    <span className="text-xl font-bold">GasTrack Pro</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/"
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
                    >
                      Sales Dashboard
                    </Link>
                    <Link
                      to="/stock"
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
                    >
                      Stock Management
                    </Link>

                    <Link
                      to="/funds"
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
                    >
                      Manage Funds
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Routes>
                <Route path="/" element={<SalesPage />} />
                <Route path="/stock" element={<StockPage />} />
                <Route path="/funds" element={< ManageFunds/>} />
              </Routes>
            </div>
          </main>


        {/* My Footer */}
<footer className="bg-gray-800 text-white mt-12 h-47">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Company Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gasman gas Supplies</h3>
        <p className="text-gray-300">
          Comprehensive gas cylinder management solution for wholesale, retail, and inventory tracking.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Reach Us</h3>
        <address className="not-italic text-gray-300">
          <p>Mapasa Rd</p>
          <p>Juja, mugetho, mapasa rd</p>
          <p className="mt-2">Phone: <a href="tel:+0701742105" className="hover:text-indigo-300 transition-colors">+1 (234) 567-890</a></p>
          <p>Email: <a href="mailto:info@gastrackpro.com" className="hover:text-indigo-300 transition-colors">info@gastrackpro.com</a></p>
        </address>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
      </div>
    </div>

    {/* Copyright Section */}
    <div className="mt-12 pt-8 border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} GasTrack Pro. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <p className="text-gray-400 text-sm">
            Seeking partnership opportunities? <a href="#" className="text-indigo-300 hover:text-indigo-200 transition-colors">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
        </Router>
      </StockProvider>
    </SalesProvider>
  );
}

export default App;