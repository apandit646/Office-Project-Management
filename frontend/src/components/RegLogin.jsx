import { useState } from "react";
import root from "../../assets/root.js"; // Adjust the path as necessary

const RegLogin = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      // Minimum for login
      newErrors.password = "Password is too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear login error when user modifies input
    if (loginError) {
      setLoginError("");
    }
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setLoginError("");

    const dataToSend = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      // For actual implementation, uncomment below:
      const response = await fetch(`${root}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Login failed with status: ${response.status}`
        );
      }

      const result = await response.json();

      // Store auth data (Note: localStorage not available in artifacts)
      localStorage.setItem("token", result.token);
      localStorage.setItem("UserId", result.data.id);

      // For demo, we'll just simulate successful login
      console.log("Login successful:", result);

      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      clearForm();
      alert("✨ Login Successful! Welcome back! 🎉");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-3 py-2 pr-10 border rounded-md transition-all duration-200
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
        🔐 Welcome Back ✨
      </h1>
      {/* Global Error Message */}
      {loginError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          ❌ {loginError}
        </div>
      )}
      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ✉️ Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={inputClasses("email")}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔒 Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={inputClasses("password")}
              placeholder="Enter your password"
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">⚠️ {errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => alert("Forgot password functionality would go here")}
            className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
            disabled={isSubmitting}
          >
            Forgot your password?
          </button>
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
          {isSubmitting ? "🔄 Signing In..." : "🚀 Sign In"}
        </button>
      </div>
      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => alert("Redirect to registration page")}
            className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
            disabled={isSubmitting}
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegLogin;
