-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "login" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "albums" (
    "album_id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "year" INTEGER NOT NULL,
    "artist_id" TEXT,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "track_id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "artist_id" TEXT,
    "album_id" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("track_id")
);

-- CreateTable
CREATE TABLE "artists" (
    "artist_id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "favorites_artists" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,

    CONSTRAINT "favorites_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites_albums" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "album_id" TEXT NOT NULL,

    CONSTRAINT "favorites_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites_tracks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "track_id" TEXT NOT NULL,

    CONSTRAINT "favorites_tracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "albums_album_id_key" ON "albums"("album_id");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_track_id_key" ON "tracks"("track_id");

-- CreateIndex
CREATE UNIQUE INDEX "artists_artist_id_key" ON "artists"("artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_artists_id_key" ON "favorites_artists"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_albums_id_key" ON "favorites_albums"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_tracks_id_key" ON "favorites_tracks"("id");
