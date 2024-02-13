import { FC } from "react";
import { Work } from "../../app/[slug]/page";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface HeaderProps {
  work: Work;
}
const Images: FC<HeaderProps> = ({ work }) => {
  if (work.images) {
    return (
      <div className="grid-work-images w-full pt-small">
        <ul className="flex flex-col gap-small">
          <RichText
            // @ts-ignore
            content={work.images.raw}
            renderers={{
              // @ts-ignore
              img: ({ children }) => (
                <img src={children.props.parent.src} className="pl-small"></img>
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
