type RowProps = {
  label: string;
  value: string;
};

const Row = ({ label, value }: RowProps) => {
  return (
    <div className="border-background-muted pl-sm py-xs flex border-b-1">
      <span className="text-foreground-muted w-24 flex-shrink-0">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default Row;
