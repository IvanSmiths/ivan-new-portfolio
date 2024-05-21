import { FC } from "react";
import { db } from "../../../db/db";
import { renders as rendersTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter from "../components/Filter";

const Renders: FC = async () => {
  const renders = await db
    .select({
      desktopUrl: rendersTable.desktopUrl,
      alt: rendersTable.alt,
      mobileUrl: rendersTable.mobileUrl,
      id: rendersTable.id,
      isHorizontal: rendersTable.isHorizontal,
    })
    .from(rendersTable)
    .all();

  return (
    <>
      <Filter />
      <Navbar position={Position.Fixed} />
      <div className="mt-small grid">
        <div className="col-span-full">
          <main className="col-span-full flex flex-wrap gap-small">
            {renders.map((render, index: number) => (
              <div
                key={index}
                className={`w-full flex-auto md:w-3/12 ${render.isHorizontal ? " md:w-[58.8%]" : ""}`}
              >
                <img
                  src={render.desktopUrl}
                  srcSet={`${render.desktopUrl} 2000w, ${render.mobileUrl} 1500w`}
                  sizes="(min-width: 66em) 2000px, 1500px"
                  fetchPriority={index < 4 ? "high" : "low"}
                  loading={index > 4 ? "lazy" : "eager"}
                  height="2000"
                  width="3000"
                  alt={render.alt}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
              </div>
            ))}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Renders;
