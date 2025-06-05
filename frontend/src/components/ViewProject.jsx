import React from "react";

const ViewProject = () => {
  const projects = [
    {
      id: 1,
      projectName: "Inventory System",
      clientName: "Acme Corp",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      status: "ongoing",
      description: "Web-based inventory management",
      managerId: 102,
    },
    {
      id: 2,
      projectName: "E-commerce Platform",
      clientName: "ShopNow",
      startDate: "2025-04-20",
      endDate: "2025-07-01",
      status: "completed",
      description: "Online shopping website with admin panel",
      managerId: 101,
    },
  ];

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-white uppercase bg-blue-600 sticky top-0">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Client Name</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Manager ID</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{project.id}</td>
                <td className="px-6 py-4">{project.projectName}</td>
                <td className="px-6 py-4">{project.clientName}</td>
                <td className="px-6 py-4">{project.startDate}</td>
                <td className="px-6 py-4">{project.endDate}</td>
                <td className="px-6 py-4 capitalize">{project.status}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.managerId}</td>
                <td className="px-6 py-4 flex flex-wrap gap-2 justify-center">
                  <button className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Add Member
                  </button>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    View Members
                  </button>
                  <button className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ul className="inline-flex items-center -space-x-px text-sm">
          <li>
            <a className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              &laquo;
            </a>
          </li>
          {[1, 2, 3, 4, 5].map((page) => (
            <li key={page}>
              <a
                className={`px-3 py-2 leading-tight ${
                  page === 1
                    ? "text-white bg-blue-600 border-blue-600"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {page}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              &raquo;
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewProject;
