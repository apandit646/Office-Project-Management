import { useState } from "react";
import root from "../../assets/root.js"; // Adjust the import path as needed

const RegManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (
      !/^\+?[\d\s-()]{10,}$/.test(formData.phoneNo.replace(/\s/g, ""))
    ) {
      newErrors.phoneNo = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNo: "",
      password: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Include phoneNo in the data being sent
    const dataToSend = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneNo: formData.phoneNo.trim(),
      type: "manager", // Assuming type is always "manager"
      password: formData.password,
    };

    try {
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //   For demo purposes - replace with actual API call
      const response = await fetch(`${root}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      console.log("Registration successful:", result);
      alert("✨ Registration Successful! 🎉");
      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
      });
      setShowSuccess(true);
      clearForm();

      // Auto hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Registration error:", error);
      alert(`❌ Registration Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-3 py-2 border rounded-md transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${
      errors[fieldName]
        ? "border-red-500 bg-red-50"
        : "border-gray-300 hover:border-gray-400"
    }
  `;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📝 Create Your Account ✨
      </h1>

      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          ✨ Registration Successful! Welcome aboard! 🎉
        </div>
      )}

      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            👤 Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={inputClasses("name")}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">⚠️ {errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ✉️ Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={inputClasses("email")}
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📱 Phone Number
          </label>
          <input
            type="tel"
            required
            value={formData.phoneNo}
            onChange={(e) => handleInputChange("phoneNo", e.target.value)}
            className={inputClasses("phoneNo")}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-xs mt-1">⚠️ {errors.phoneNo}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔒 Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={inputClasses("password")}
            placeholder="Create a secure password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">⚠️ {errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
            w-full py-2 px-4 rounded-md font-medium transition-all duration-200
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md transform hover:scale-[1.02]"
            }
          `}
        >
          {isSubmitting ? "🔄 Creating Account..." : "🚀 Create Account"}
        </button>
      </div>

      {/* Login Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => console.log("Navigate to login")}
            className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
            disabled={isSubmitting}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegManager;
