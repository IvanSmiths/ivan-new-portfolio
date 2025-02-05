import { db } from "../../db/db";
import {
  photos as photosTable,
  renders as rendersTable,
} from "../../db/schema";

export const getImages = async () => {
  const photos = await db
    .select({
      desktopUrl: photosTable.desktopUrl,
      alt: photosTable.alt,
      mobileUrl: photosTable.mobileUrl,
      id: photosTable.id,
      isHorizontal: photosTable.isHorizontal,
    })
    .from(photosTable)
    .all();

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

  return [...photos, ...renders];
};

export const getRenders = async () => {
  const images = await db
    .select({
      desktopUrl: rendersTable.desktopUrl,
      alt: rendersTable.alt,
      mobileUrl: rendersTable.mobileUrl,
      id: rendersTable.id,
      isHorizontal: rendersTable.isHorizontal,
    })
    .from(rendersTable)
    .all();

  return images;
};

export const getPhotos = async () => {
  const images = await db
    .select({
      desktopUrl: photosTable.desktopUrl,
      alt: photosTable.alt,
      mobileUrl: photosTable.mobileUrl,
      id: photosTable.id,
      isHorizontal: photosTable.isHorizontal,
    })
    .from(photosTable)
    .all();

  return images;
};
