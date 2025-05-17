type RowProps = {
  label: string;
  value: string;
};

const Row = ({ label, value }: RowProps) => {
  return (
    <div className="border-background-muted flex border-b-1">
      <div className="text-foreground-muted w-20">{label}</div>
      <div>{value}</div>
    </div>
  );
};

export default Row;
