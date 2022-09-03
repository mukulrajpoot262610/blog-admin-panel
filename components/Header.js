import React, { useState } from "react";

const Header = ({ settings }) => {
  return (
    <div className="w-full rounded-lg">
      <h1 className="text-3xl font-bold capitalize">
        <span className="text-white uppercase">MEBlog Dashboard</span>
      </h1>
    </div>
  );
};

export default Header;
