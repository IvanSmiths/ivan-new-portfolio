/* eslint-disable @next/next/no-img-element */

import { FC } from "react";
import { WorkPage } from "../../../../utils/graphql";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface HeaderProps {
  work: WorkPage;
}
const Images: FC<HeaderProps> = ({ work }) => {
  if (work.images) {
    return (
      <div className="col-start-1 col-end-7 md:col-start-6 md:col-end-13 w-full pt-medium">
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
