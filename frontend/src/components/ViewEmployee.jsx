import { useEffect, useState, useCallback } from "react";

const ViewEmployee = () => {
  const [users, setUsers] = useState([]);

  const getAllEmployeesData = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/employee/getAllEmployees",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      console.log("Fetched employees:", data);
      setUsers(data);

      if (data.length === 0) {
        console.log("No employees found");
      } else {
        console.log("Employees data:", data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  useEffect(() => {
    getAllEmployeesData();
  }, [getAllEmployeesData]);

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-white uppercase bg-blue-600 sticky top-0">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone No</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNo}</td>
                <td className="px-6 py-4 capitalize">{user.type}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4 flex flex-wrap gap-2 justify-center">
                  <button className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Edit
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

      {/* Static Pagination UI */}
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
            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              &raquo;
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewEmployee;
