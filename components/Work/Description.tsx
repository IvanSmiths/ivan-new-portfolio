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
        <Link className="flex gap-smallest pb-medium" href="/">
          <img src="/icons/arrow.svg" className="rotate-180" alt="arrow" />
          back home
        </Link>
        <h1 className="heading-regular font-bold">{work.company}</h1>
        <ul className="pl-small">
          {work.description.map((desc) => (
            <li className="list-disc" key={desc}>
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
          <a
            className="flex gap-smallest"
            rel="noopener noreferrer"
            target="_blank"
            href={work.linkedin}
          >
            LinkedIn
            <img src="/icons/arrow.svg" alt="arrow" />
          </a>
          <a
            className="flex gap-smallest"
            rel="noopener noreferrer"
            target="_blank"
            href={work.website}
          >
            Website
            <img src="/icons/arrow.svg" alt="arrow" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Description;
