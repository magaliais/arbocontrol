-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_complaints" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'pending',
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
INSERT INTO "new_complaints" ("cellphoneNumber", "cep", "complement", "created_at", "email", "houseNumber", "id", "neighborhood", "notes", "phoneNumber", "place", "reference", "street", "updated_at") SELECT "cellphoneNumber", "cep", "complement", "created_at", "email", "houseNumber", "id", "neighborhood", "notes", "phoneNumber", "place", "reference", "street", "updated_at" FROM "complaints";
DROP TABLE "complaints";
ALTER TABLE "new_complaints" RENAME TO "complaints";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
