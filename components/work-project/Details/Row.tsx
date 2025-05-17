type RowProps = {
  label: string;
  value: string;
};

const Row = ({ label, value }: RowProps) => {
  return (
    <div className="flex">
      <div className="w-20">{label}</div>
      <div>{value}</div>
    </div>
  );
};

export default Row;
