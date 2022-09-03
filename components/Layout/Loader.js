import React from "react";

const Loader = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <h1 className="text-4xl font-bold animate-pulse text-primary-blue">
        Loading...
      </h1>
    </main>
  );
};

export default Loader;
