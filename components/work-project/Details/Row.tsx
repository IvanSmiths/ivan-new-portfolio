type RowProps = {
  label: string;
  value: string;
};

const Row = ({ label, value }: RowProps) => {
  return (
    <div className="flex">
      <div className="text-foreground-muted w-20">{label}</div>
      <div className="">{value}</div>
    </div>
  );
};

export default Row;
