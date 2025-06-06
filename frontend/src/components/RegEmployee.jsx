import React, { useState } from "react";
import root from "../../assets/root.js";

export const RegEmployee = () => {
  const [addEmployee, setAddEmployee] = useState({
    name: "",
    email: "",
    phoneNo: "",
    type: "employee",
    role: "developer",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    try {
      const response = await fetch(`${root}/api/employee/registerEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Autherntiucation: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addEmployee),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Employee registered successfully:", data);
        alert("Employee registered successfully");
        setAddEmployee({
          name: "",
          email: "",
          phoneNo: "",
          type: "employee",
          role: "developer",
          password: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error registering employee:", errorData);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the employee.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">
        Register New Employee
      </h1>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5">
        <a href="/viewEmployee">View All Employees</a>
      </button>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={addEmployee.name}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 top-3 transform scale-75 -translate-y-6"
          >
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={addEmployee.email}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 top-3 transform scale-75 -translate-y-6"
          >
            Email
          </label>
        </div>

        {/* Phone Number */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phoneNo"
            id="phoneNo"
            value={addEmployee.phoneNo}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="phoneNo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 top-3 transform scale-75 -translate-y-6"
          >
            Phone Number
          </label>
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={addEmployee.password}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 top-3 transform scale-75 -translate-y-6"
          >
            Password
          </label>
        </div>

        {/* Type Dropdown */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-500"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            value={addEmployee.type}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Role Dropdown */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-500"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            value={addEmployee.role}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="backend developer">Backend Developer</option>
            <option value="frontend developer">Frontend Developer</option>
            <option value="uiux developer">UI/UX Developer</option>
            <option value="developer">Developer</option>
          </select>
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
