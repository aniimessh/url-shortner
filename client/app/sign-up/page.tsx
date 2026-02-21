"use client";
import SignupForm from "@/components/SignupForm";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-red-50 flex">
      {/* Left - Form Section */}
      <div className="w-3/4 bg-yellow-300 h-full flex items-center justify-center">
        <SignupForm />
      </div>

      {/* Right Section */}
      <div className="w-1/4 h-full bg-red-50 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Right Panel</p>
      </div>
    </div>
  );
};

export default Home;
