import { FC, ReactNode } from "react";

const About: FC = async () => {
  const textStyle =
    "bebas lg:text-[11vw] lg:leading-[10vw] md:text-[20vw] md:leading-[19vw] text-[18vw] leading-[17vw]";

  const symbolStyle = "bebas lg:text-[11vw] lg:leading-[10vw] lg:block hidden";

  type SectionProps = {
    children: ReactNode;
    bgClass?: string;
  };

  type TextProps = {
    children: ReactNode;
    style?: string;
    textColor?: string;
  };

  const Wrapper: FC<SectionProps> = ({ children, bgClass = "" }) => (
    <div
      className={`flex flex-row flex-wrap items-center justify-between gap-small px-3 pt-5 ${bgClass}`}
    >
      {children}
    </div>
  );

  const Content: FC<TextProps> = ({
    children,
    style = textStyle,
    textColor = "",
  }) => <span className={`${style} ${textColor}`}>{children}</span>;

  return (
    <main
      data-testid="homeAboutSection"
      className="mt-large grid md:mt-section"
    >
      <section className="col-span-full uppercase">
        <Wrapper>
          <Content>I expertly blend</Content>
          <Content style={symbolStyle}>&#x265B;</Content>
          <Content style={textStyle}>my</Content>
        </Wrapper>
        <Wrapper bgClass="bg-primary">
          <Content style={textStyle} textColor="text-secondary">
            Design
          </Content>
          <span className="h-3 flex-1 rounded-full bg-secondary"></span>
          <Content textColor="text-secondary">Background</Content>
        </Wrapper>
        <Wrapper>
          <Content>With</Content>
          <Content>~</Content>
          <img
            className="-mt-4 h-40 flex-1 object-cover"
            src="/photo-of-me-about.png"
            alt="photo of me"
          />
          <Content>My</Content>
        </Wrapper>
        <Wrapper bgClass="bg-brand">
          <Content>Development</Content>
          <Content style={textStyle}>&#x2731;</Content>
          <Content style={textStyle}>Mastery</Content>
        </Wrapper>
      </section>
    </main>
  );
};

export default About;
