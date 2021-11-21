/* eslint-disable @next/next/no-img-element */
export default function Media({ url, active, x, y }) {
  return (
    <img
      src={url}
      style={{ transform: `translate(${x}px, ${y}px` }}
      alt="project"
      className={`image ${active ? 'is-active' : ''}`}
    />
  );
}
