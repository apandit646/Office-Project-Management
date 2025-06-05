import React, { useState } from "react";

export const AddProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    clientName: "",
    startDate: "",
    endDate: "",
    status: "ongoing",
    description: "",
    managerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(projectData);
    // Add submission logic here
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Add New Project</h1>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5">
        <a href="/viewProject">Back to Home</a>
      </button>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="projectName"
            id="projectName"
            value={projectData.projectName}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="projectName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            Project Name
          </label>
        </div>

        {/* Client Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="clientName"
            id="clientName"
            value={projectData.clientName}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="clientName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            Client Name
          </label>
        </div>

        {/* Start Date */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={projectData.startDate}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="startDate"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            Start Date
          </label>
        </div>

        {/* End Date */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={projectData.endDate}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="endDate"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            End Date
          </label>
        </div>

        {/* Status */}
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="status"
            id="status"
            value={projectData.status}
            onChange={handleChange}
            className="block w-full px-0 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="on hold">On Hold</option>
          </select>
          <label
            htmlFor="status"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            Status
          </label>
        </div>

        {/* Description */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="description"
            id="description"
            rows="3"
            value={projectData.description}
            onChange={handleChange}
            className="block px-0 py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 resize-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            Description
          </label>
        </div>

        {/* Manager ID */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="managerId"
            id="managerId"
            value={projectData.managerId}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="managerId"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10"
          >
            Manager ID
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};
