import { FC, ReactNode } from "react";

const About: FC = async () => {
  const textStyle =
    "bebas lg:text-[11vw] lg:leading-[11vw] md:text-[20vw] md:leading-[19vw] text-[18vw] leading-[17vw]";

  type WrapperProps = {
    children: ReactNode;
    bgClass?: string;
  };

  type ContentProps = {
    children: ReactNode;
    style?: string;
    textColor?: string;
    isMobileHidden?: boolean;
  };

  const Wrapper: FC<WrapperProps> = ({ children, bgClass = "" }) => (
    <div
      className={`flex flex-row flex-wrap items-center justify-between gap-small px-3 pt-5 ${bgClass}`}
    >
      {children}
    </div>
  );

  const Content: FC<ContentProps> = ({
    children,
    style = textStyle,
    textColor = "",
    isMobileHidden = "",
  }) => (
    <span
      className={`${style} ${textColor} ${isMobileHidden ? "hidden lg:block" : ""}`}
    >
      {children}
    </span>
  );

  return (
    <main
      data-testid="homeAboutSection"
      className="mt-large grid md:mt-section"
    >
      <section className="col-span-full uppercase">
        <Wrapper>
          <Content>I expertly blend</Content>
          <Content isMobileHidden={true}>&#x262F;</Content>
          <Content isMobileHidden={true}>+</Content>
          <Content>my</Content>
        </Wrapper>
        <Wrapper bgClass="bg-primary">
          <Content textColor="text-secondary">Design</Content>
          <span className="h-3 flex-1 rounded-full bg-secondary"></span>
          <Content textColor="text-secondary">Background</Content>
        </Wrapper>
        <Wrapper>
          <Content>With</Content>
          <Content>~</Content>
          <img
            className="-mt-4 h-40 w-2/4 flex-1 object-cover"
            src="/photo-of-me-about.png"
            alt="photo of me"
            width="978"
            height="293"
            loading="lazy"
          />
          <Content>My</Content>
        </Wrapper>
        <Wrapper bgClass="bg-brand">
          <Content>Development</Content>
          <Content>&#x2605;</Content>
          <Content>Mastery</Content>
        </Wrapper>
      </section>
    </main>
  );
};

export default About;
