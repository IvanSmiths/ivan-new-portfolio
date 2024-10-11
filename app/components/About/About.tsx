import React from "react";
import { bebas_neue } from "../../../utils/fonts";

const About = () => {
  return (
    <div className="grid h-screen w-full bg-brand">
      <div className="col-start-2 col-end-12 flex flex-col items-center justify-center gap-x-small gap-y-0 bg-red-900">
        <div className="flex flex-wrap items-center gap-small">
          <span className={`${bebas_neue.className} text-9xl`}>I</span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            Expertly
          </span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            Blend
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-small">
          <span className={`${bebas_neue.className} hidden text-9xl`}>My</span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            Design
          </span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            Background
          </span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            With
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-small">
          <span className={`${bebas_neue.className} hidden text-9xl`}>My</span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            Development
          </span>
          <span className={`${bebas_neue.className} hidden text-9xl`}>
            Skills.
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
