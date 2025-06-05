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
          <a href="/regEmployee" className="hover:text-yellow-400">
            Add Employee
          </a>
          <a href="/addProject" className="hover:text-yellow-400">
            Add Project
          </a>
          <a href="/viewEmployee" className="hover:text-yellow-400">
            View Employee
          </a>
          <a href="/viewProject" className="hover:text-yellow-400">
            View Project
          </a>
          <a href="/viewTask" className="hover:text-yellow-400">
            View Task
          </a>
          <a href="/viewTaskStatus" className="hover:text-yellow-400">
            View Task Status
          </a>
          <a href="/viewProjectStatus" className="hover:text-yellow-400">
            View Project Status
          </a>
          <a href="/viewEmployeeTask" className="hover:text-yellow-400">
            View Employee Task
          </a>
          <a href="/viewProjectTask" className="hover:text-yellow-400">
            Profile
          </a>
          <a href="#" className="hover:text-yellow-400">
            Logout
          </a>
        </nav>
      </div>
    </div>
  );
};
