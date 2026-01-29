import clsx from "clsx";

type RowProps = {
  label: string;
  value: string;
  className?: string;
};

const Row = ({ label, value, className }: RowProps) => {
  return (
    <div
      className={clsx(
        "border-background-muted pl-sm py-xs flex border-b",
        className
      )}
    >
      <span className="text-foreground-muted w-24 shrink-0">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default Row;
