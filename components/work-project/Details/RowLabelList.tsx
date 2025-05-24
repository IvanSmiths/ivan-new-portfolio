type RowLabelListProps = {
  stack: string[];
};

const RowLabelList = ({ stack }: RowLabelListProps) => {
  return (
    <div className="border-background-muted pl-sm py-xs flex items-start border-b-1">
      <div className="text-foreground-muted w-24 flex-shrink-0">Stack</div>
      <div className="gap-xs flex flex-wrap gap-y-0.5 break-words">
        {stack.map((item, index) => (
          <span key={index}>
            <span>{item}</span>
            {index < stack.length - 1 && <>, </>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RowLabelList;
