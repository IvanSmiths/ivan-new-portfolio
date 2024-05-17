-- CreateTable
CREATE TABLE "Photos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt" TEXT NOT NULL,
    "desktopUrl" TEXT NOT NULL,
    "tabletUrl" TEXT NOT NULL,
    "mobileUrl" TEXT NOT NULL,

    CONSTRAINT "Photos_pkey" PRIMARY KEY ("id")
);
