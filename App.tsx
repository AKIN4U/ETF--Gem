// FIX: Add missing React import to fix reference errors.
import React from 'react';
import ScholarshipForm from './components/ScholarshipForm';
import Dashboard from './components/dashboard/Dashboard';
import HomePage from './components/pages/HomePage';
import MenuIcon from './components/icons/MenuIcon';
import XIcon from './components/icons/XIcon';
import { useScrollSpy } from './hooks/useScrollSpy';

type View = 'home' | 'applicant' | 'admin';

const App: React.FC = () => {
  const [view, setView] = React.useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const sectionIds = ['about-us', 'eligibility', 'how-to-apply'];
  const activeSection = useScrollSpy(sectionIds, { rootMargin: '-100px 0px -50% 0px' });

  const handleNavClick = (target: View | string) => {
    setIsMenuOpen(false);
    
    // If it's a section ID
    if (sectionIds.includes(target)) {
      const scrollToSection = () => {
        const element = document.getElementById(target);
        if (element) {
          const headerOffset = 80; // Approximate height of the sticky header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      };

      if (view !== 'home') {
        setView('home');
        // Wait for the homepage to render before scrolling
        setTimeout(scrollToSection, 100);
      } else {
        scrollToSection();
      }
    } else { // It's a view change
      setView(target as View);
      window.scrollTo(0, 0);
    }
  };

  const NavLink: React.FC<{ target: string; children: React.ReactNode; isButton?: boolean }> = ({ target, children, isButton = false }) => {
    const isActive = activeSection === target && view === 'home';
    
    if (isButton) {
      return (
         <button
          onClick={() => handleNavClick(target)}
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {children}
        </button>
      )
    }

    return (
      <button
        onClick={() => handleNavClick(target)}
        className={`text-sm font-semibold leading-6 ${isActive ? 'text-blue-600' : 'text-gray-900'} hover:text-blue-600 transition-colors`}
      >
        {children}
      </button>
    );
  };
  
  const MobileNavLink: React.FC<{target: string; children: React.ReactNode}> = ({target, children}) => (
     <button onClick={() => handleNavClick(target)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-left">
        {children}
     </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <button onClick={() => handleNavClick('home')} className="-m-1.5 p-1.5">
              <span className="sr-only">CCC ETF Program</span>
              <img className="h-8 w-auto rounded" src="https://picsum.photos/150/50" alt="Church Logo" />
            </button>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-x-12">
            <NavLink target="home">Home</NavLink>
            <NavLink target="about-us">About</NavLink>
            <NavLink target="eligibility">Eligibility</NavLink>
            <NavLink target="how-to-apply">How to Apply</NavLink>
            <NavLink target="admin">Admin</NavLink>
            <NavLink target="applicant" isButton>Apply Now</NavLink>
          </div>
        </nav>
        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <button onClick={() => handleNavClick('home')} className="-m-1.5 p-1.5">
                  <span className="sr-only">CCC ETF Program</span>
                  <img className="h-8 w-auto rounded" src="https://picsum.photos/150/50" alt="" />
                </button>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                     <MobileNavLink target="home">Home</MobileNavLink>
                     <MobileNavLink target="about-us">About</MobileNavLink>
                     <MobileNavLink target="eligibility">Eligibility</MobileNavLink>
                     <MobileNavLink target="how-to-apply">How to Apply</MobileNavLink>
                     <MobileNavLink target="applicant">Apply Now</MobileNavLink>
                     <MobileNavLink target="admin">Admin Dashboard</MobileNavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {view === 'home' && <HomePage onApplyNow={() => handleNavClick('applicant')} />}
        {view !== 'home' && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {view === 'applicant' && <ScholarshipForm />}
                {view === 'admin' && <Dashboard />}
            </div>
        )}
      </main>

      <footer className="bg-white mt-12">
        <div className="container mx-auto px-6 py-8">
            <div className="text-center text-gray-500 text-sm">
                 <p className="font-bold text-lg text-blue-800 mb-2">CCC Central Cathedral, Abuja ETF Program</p>
                 <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;