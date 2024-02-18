import React from "react";
import Link from "next/link";

function ButtonLink({ href }) {
  return (
    <div className="w-28 h-28 flex justify-center items-center rounded-full bg-primary cursor-pointer">
      <Link className="text-white" href={href}>
        See it
      </Link>
    </div>
  );
}

export default ButtonLink;
