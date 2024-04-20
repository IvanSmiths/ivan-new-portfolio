import Blog from "../components/Blog/Blog";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";

export default async function BlogPage() {
  return (
    <div className="mt-large">
      <Navbar position={Position.Fixed} />
      <Blog />
    </div>
  );
}
