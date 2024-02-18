import React from "react";

function ButtonLink({ href }) {
  return (
    <div className="w-28 h-28 flex justify-center items-center rounded-full bg-primary cursor-pointer hover:rotate-12 duration-100">
      <span className="text-white">See it</span>
    </div>
  );
}

export default ButtonLink;
