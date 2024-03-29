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
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-11 w-full pt-medium">
        <ul className="flex flex-col gap-small">
          <RichText
            content={work.images.raw}
            renderers={{
              img: ({ src, height, width }) => (
                <li>
                  <img
                    src={src}
                    className="md:pl-small"
                    alt="project"
                    loading="lazy"
                    height={height}
                    width={width}
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
