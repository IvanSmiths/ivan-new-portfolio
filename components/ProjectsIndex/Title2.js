export default function Title({ title, setActiveIndex, index }) {
  return (
    <div
      className="project-item"
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(-1)}
    >
      <em className="project-title">
        <span>{title}</span>
      </em>
    </div>
  );
}
