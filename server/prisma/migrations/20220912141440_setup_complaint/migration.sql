/*
  Warnings:

  - Added the required column `cellphoneNumber` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `complaints` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_complaints" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "cellphoneNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_complaints" ("cep", "created_at", "id", "updated_at") SELECT "cep", "created_at", "id", "updated_at" FROM "complaints";
DROP TABLE "complaints";
ALTER TABLE "new_complaints" RENAME TO "complaints";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
