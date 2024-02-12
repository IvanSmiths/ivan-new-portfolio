/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Work } from "../../app/[slug]/page";

type HeaderProps = {
  work: Work;
};

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <div className="grid-work-description pt-small flex flex-col gap-small w-full md:sticky md:h-1/5 md:top-1">
      <h1 className="heading-regular font-bold">{work.workTitle}</h1>
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
  );
};

export default Description;
