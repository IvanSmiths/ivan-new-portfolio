type SquareArrowOutUpRightProps = {
  dimensions?: number;
};

const SquareArrowOutUpRight = ({ dimensions }: SquareArrowOutUpRightProps) => {
  dimensions = dimensions || 12;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions}
      height={dimensions}
      className="stroke-foreground group-hover:stroke-background hidden fill-none transition md:block"
      viewBox={`0 0 24 24`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  );
};

export default SquareArrowOutUpRight;
