import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold text-center mb-4">Register</h2>

        <label className="block mb-2 text-sm font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          className="w-full p-2 border rounded mb-4"
          placeholder="Your name"
          required
        />

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Your email"
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Create password"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
