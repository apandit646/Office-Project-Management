export const SideNavbar = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          <a href="/" className="hover:text-yellow-400">
            Home
          </a>
          <a href="#" className="hover:text-yellow-400">
            Users
          </a>
          <a href="#" className="hover:text-yellow-400">
            Settings
          </a>
          <a href="#" className="hover:text-yellow-400">
            Logout
          </a>
        </nav>
      </div>
    </div>
  );
};
