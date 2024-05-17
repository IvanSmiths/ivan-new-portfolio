/*
  Warnings:

  - Added the required column `name` to the `Renders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Renders" ADD COLUMN     "name" TEXT NOT NULL;
