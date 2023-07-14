import {useHoverStore} from "../../utils/store";

function BlogLink({ href, text }) {
  const {setHover} = useHoverStore();
  const handleMouseEnter = () => {
    setHover("medium");
  };
  const handleMouseLeave = () => {
    setHover("small");
  };
  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}

export default BlogLink;
