-- CreateTable
CREATE TABLE "pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_poke_api" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_id_poke_api_key" ON "pokemons"("id_poke_api");
