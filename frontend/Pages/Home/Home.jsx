import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800">
          Create Question Papers <span className="text-green-500">Online</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Examin8 helps schools, coaching institutes, teachers and tutors
          create question papers and online tests in minutes.
        </p>
        <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-600 transition">
          Start Now
        </button>
      </div>
    </div>
  );
};

export default Home;
