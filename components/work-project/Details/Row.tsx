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
        "border-background-muted pl-sm py-xs flex border-b-1 opacity-0",
        className,
      )}
    >
      <span className="text-foreground-muted w-24 flex-shrink-0">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default Row;
