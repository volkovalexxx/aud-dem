import { useState } from 'react';

const menuItems = [
  { name: 'Buy Crypto', hasDropdown: true },
  { name: 'Markets', hasDropdown: false },
  { name: 'Trade', hasDropdown: true },
  { name: 'Tools', hasDropdown: true },
  { name: 'Finance', hasDropdown: true },
  { name: 'Learn', hasDropdown: true },
  { name: 'Rewards Hub', hasDropdown: false },
  { name: 'MNT', hasDropdown: false },
  { name: 'More', hasDropdown: true },
];

const Header = ({ onConnectClick, isConnecting, showConnect = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleConnect = () => {
    if (onConnectClick) onConnectClick();
  };

  return (
    <>
      {/* Main Header - Fixed 48px height */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-bybit-header">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <svg width="87" height="24" viewBox="0 0 87 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M62.0083 25.3572V3H66.5022V25.3572H62.0083Z" fill="#F7A600"/>
              <path d="M9.63407 31.9983H0V9.64111H9.24666C13.7406 9.64111 16.3591 12.0903 16.3591 15.9214C16.3591 18.4013 14.6774 20.0039 13.5134 20.5375C14.9028 21.1652 16.6813 22.5779 16.6813 25.5624C16.6813 29.7373 13.7406 31.9983 9.63407 31.9983ZM8.89096 13.5355H4.4939V18.6852H8.89096C10.7981 18.6852 11.8652 17.6488 11.8652 16.1095C11.8652 14.5719 10.7981 13.5355 8.89096 13.5355ZM9.18151 22.6104H4.4939V28.1056H9.18151C11.2189 28.1056 12.1874 26.8503 12.1874 25.3418C12.1874 23.835 11.2171 22.6104 9.18151 22.6104Z" fill="white"/>
              <path d="M30.3882 22.8293V31.9983H25.926V22.8293L19.0073 9.64111H23.8886L28.1888 18.6527L32.4239 9.64111H37.3052L30.3882 22.8293Z" fill="white"/>
              <path d="M50.0457 31.9983H40.4116V9.64111H49.6583C54.1522 9.64111 56.7707 12.0903 56.7707 15.9214C56.7707 18.4013 55.089 20.0039 53.925 20.5375C55.3144 21.1652 57.093 22.5779 57.093 25.5624C57.093 29.7373 54.1522 31.9983 50.0457 31.9983ZM49.3026 13.5355H44.9055V18.6852H49.3026C51.2097 18.6852 52.2768 17.6488 52.2768 16.1095C52.2768 14.5719 51.2097 13.5355 49.3026 13.5355ZM49.5931 22.6104H44.9055V28.1056H49.5931C51.6305 28.1056 52.599 26.8503 52.599 25.3418C52.599 23.835 51.6305 22.6104 49.5931 22.6104Z" fill="white"/>
              <path d="M80.986 13.5355V32H76.4921V13.5355H70.4785V9.64111H86.9996V13.5355H80.986Z" fill="white"/>
            </svg>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Connect button - conditional */}
            {showConnect && (
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className={`px-4 py-1.5 text-black text-sm font-semibold rounded-full transition-all disabled:opacity-75 flex items-center gap-2 ${
                  isConnecting ? 'bg-gray-400' : 'bg-bybit-orange hover:bg-bybit-orange-hover'
                }`}
              >
                {isConnecting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Connecting</span>
                  </>
                ) : (
                  'Connect'
                )}
              </button>
            )}

            {/* Hamburger menu */}
            <button
              className="p-2 text-white flex flex-col justify-center items-center gap-1.5"
              onClick={toggleMobileMenu}
            >
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-12"></div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-bybit-header transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: '48px' }}>
        <div className="p-4 pt-6">
          {/* Menu items */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center justify-between py-3 text-white text-base font-medium"
              >
                {item.name}
                {item.hasDropdown && (
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>
            ))}
          </nav>

          {/* Language selector */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
