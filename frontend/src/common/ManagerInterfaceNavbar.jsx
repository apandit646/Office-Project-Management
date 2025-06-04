import { useState, useCallback } from "react";
import { Home, Menu, X, LogOut, Sparkles } from "lucide-react";

const ManagerInterfaceNavbar = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleRouteChange = (link) => {
    // navigate(link); // Would be used with router
    setIsOpen(false);
    console.log(`Navigating to: ${link}`);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token"); // Commented out for Claude.ai compatibility
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const navItems = [
    { icon: <LogOut className="w-5 h-5" />, label: "Logout", action: logout },
  ];

  // Floating background elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
      style={{
        left: `${20 + i * 15}%`,
        top: `${30 + Math.sin(i) * 20}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${3 + i * 0.5}s`,
      }}
    />
  ));

  return (
    <div className="relative">
      {/* Multi-layered background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
      </div>

      <nav className="relative backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative transform hover:rotate-12 hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-60" />
                <div className="relative bg-gradient-to-r from-yellow-300 to-orange-400 p-2 rounded-full shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                  NotesPro
                </span>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleNavbar}
                className="relative p-3 text-white focus:outline-none bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <div
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
              </button>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.action) item.action();
                      if (item.link) handleRouteChange(item.link);
                    }}
                    className="relative group px-6 py-3 text-white font-medium rounded-xl 
                      backdrop-blur-sm bg-white/10 border border-white/20 
                      hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:-translate-y-1
                      active:scale-95 transition-all duration-300 flex items-center space-x-2
                      shadow-lg hover:shadow-xl"
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 rounded-xl transition-all duration-300" />

                    {/* Icon with animation */}
                    <div
                      className={`relative z-10 transform transition-transform duration-200 ${
                        item.label === "Home" ? "group-hover:rotate-12" : ""
                      }`}
                    >
                      {item.icon}
                    </div>

                    <span className="relative z-10">{item.label}</span>

                    {/* Hover underline */}
                    <div className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 w-0 group-hover:w-4/5 transform -translate-x-1/2 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-3 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 mx-2 mb-4 transform transition-all duration-300">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.action) item.action();
                    if (item.link) handleRouteChange(item.link);
                  }}
                  className="relative group w-full text-left px-4 py-4 text-white font-medium rounded-xl
                    backdrop-blur-sm bg-white/10 border border-white/20
                    hover:bg-white/20 hover:border-white/30 hover:scale-102 hover:translate-x-2
                    active:scale-98 transition-all duration-300 flex items-center space-x-3
                    shadow-lg hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 rounded-xl transition-all duration-300" />

                  <div
                    className={`relative z-10 transform transition-all duration-200 group-hover:scale-110 ${
                      item.label === "Home" ? "group-hover:rotate-12" : ""
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span className="relative z-10 text-lg">{item.label}</span>

                  {/* Arrow indicator */}
                  <div className="absolute right-4 text-white/60 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Animated border at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </nav>
    </div>
  );
};

export default ManagerInterfaceNavbar;
