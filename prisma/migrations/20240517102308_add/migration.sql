-- CreateTable
CREATE TABLE "Renders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt" TEXT NOT NULL,
    "desktopUrl" TEXT NOT NULL,
    "mobileUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "Renders_pkey" PRIMARY KEY ("id")
);
