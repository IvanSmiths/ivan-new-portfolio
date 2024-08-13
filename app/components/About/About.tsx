import { FC, ReactNode } from "react";

const About: FC = async () => {
  const textStyle = "bebas text-[14rem] leading-[13rem]";

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
      className={`flex flex-row flex-wrap items-center justify-between gap-small pt-5 ${bgClass}`}
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
      className="mt-large grid min-h-[100vh] md:mt-section"
    >
      <section className="col-span-full uppercase">
        <Wrapper>
          <Content>I expertly blend</Content>
          <Content style={textStyle}>&#x265B;</Content>
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
