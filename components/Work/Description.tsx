import { FC } from "react";
import { Work } from "../../utils/works";
import Link from "next/link";

interface HeaderProps {
  work: Work;
}

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <>
      <div className="grid-work-description pt-5 flex flex-col gap-small w-full">
        <span className="pb-medium">
          <Link href="/">{"<"} back home</Link>
        </span>
        <h1 className="heading-regular font-bold">{work.company}</h1>
        <ul>
          {work.description.map((desc) => (
            <li className="list-disc" key={desc.index}>
              {desc}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-smallest">
          <li className="paragraph text-primary-light">Role: {work.role}</li>
          <li className="paragraph text-primary-light">Date: {work.date}</li>
          <li className="paragraph text-primary-light">Stack: {work.stack}</li>
        </ul>
        <div className="flex flex-col gap-small pt-medium">
          <span>
            <a href={work.linkedin}>LinkedIn page {">"}</a>
          </span>
          <span>
            <a href={work.website}>Website {">"}</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Description;
