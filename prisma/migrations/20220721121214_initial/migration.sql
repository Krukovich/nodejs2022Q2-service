-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "login" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "artists" (
    "artist_id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "grammy" BOOLEAN NOT NULL,
    "favoriteId" TEXT,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "albums" (
    "album_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,
    "favoriteId" TEXT,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "track_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "favoriteId" TEXT,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("track_id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "artists_artist_id_key" ON "artists"("artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "albums_album_id_key" ON "albums"("album_id");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_track_id_key" ON "tracks"("track_id");

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("artist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("artist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("album_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
