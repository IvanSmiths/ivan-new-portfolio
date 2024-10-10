import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";
import Social from "./Social";

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      data-cy="footer"
      className="flex min-h-[70vh] flex-col justify-end gap-2 px-small pb-small md:min-h-[80vh]"
    >
      <div className="mb-medium flex flex-wrap gap-small gap-y-10">
        <Social text="Github" link="https://github.com/IvanSmiths" />
        <Social
          text="LinkedIn"
          link="https://www.linkedin.com/in/ivan-fabbri"
        />
        <Social text="YouTube" link="https://youtube.com/@ivansmiths" />
        <Social text="info@ivansmiths.com" link="mailto:info@ivansmiths.com" />
      </div>
      <div className="flex justify-between">
        <span>©2024 Ivan Smiths</span>
        <span>Rocking Since 2020</span>
      </div>
      <Logo />
    </footer>
  );
};

export default Footer;
