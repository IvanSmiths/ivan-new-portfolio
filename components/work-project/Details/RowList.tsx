import React from "react";

type RowListProps = {
  desc: string;
};

const RowList = ({ desc }: RowListProps) => {
  return <li className="pt-xs mx-sm list-disc">{desc}</li>;
};

export default RowList;
