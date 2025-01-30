import {
  craftsDescription,
  photosDescription,
  rendersDescription,
} from "../../../utils/metadata/craftsMetadata";
import { description } from "../../../utils/metadata/worksMetadata";
import { description as projectsDescription } from "../../../utils/metadata/projectsMetadata";

export const photoHeaderProps = {
  h1: "Photos",
  h2: "Trough a lens.",
  paragraph: photosDescription,
};

export const rendersHeaderProps = {
  h1: "Renders",
  h2: "The beginning.",
  paragraph: rendersDescription,
};

export const craftsHeaderProps = {
  h1: "Crafts",
  h2: "My passions outside the code",
  paragraph: craftsDescription,
};

export const worksHeaderProps = {
  h1: "Works",
  h2: "All my works",
  paragraph: description,
};

export const projectsHeaderProps = {
  h1: "Projects",
  h2: "All my projects",
  paragraph: projectsDescription,
};
