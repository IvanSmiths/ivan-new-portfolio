import { FC } from "react";
import { Bebas_Neue } from "next/font/google";

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas_neue",
  display: "swap",
});

type HeaderProps = {
  work: {
    company: string;
    homeImage: {
      url: string;
      height: number;
      width: number;
      fileName: string;
    };
  };
};

const Hero: FC<HeaderProps> = ({ work }) => {
  console.log(work);
  return (
    <>
      <h1
        className={`${bebas_neue.className} mt-96 col-span-full md:text-9xl text-5xl uppercase`}
      >
        {work.company}
      </h1>
      <img
        className="col-span-full w-full"
        src={work.homeImage.url}
        height={work.homeImage.height}
        width={work.homeImage.width}
        alt={work.homeImage.fileName}
      />
    </>
  );
};

export default Hero;
