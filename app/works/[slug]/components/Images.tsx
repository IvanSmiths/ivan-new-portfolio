/* eslint-disable @next/next/no-img-element */

import { FC } from "react";
import { Work } from "../page";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface HeaderProps {
  work: Work;
}
const Images: FC<HeaderProps> = ({ work }) => {
  if (work.images) {
    return (
      <div className="grid-work-images w-full pt-medium">
        <ul className="flex flex-col gap-small">
          <RichText
            // @ts-ignore
            content={work.images.raw}
            renderers={{
              // @ts-ignore
              img: ({ children }) => (
                <li>
                  <img
                    src={children.props.parent.src}
                    className="pl-small"
                    alt="project"
                    loading="lazy"
                    height={children.props.parent.height}
                    width={children.props.parent.width}
                  ></img>
                </li>
              ),
            }}
          />
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Images;
