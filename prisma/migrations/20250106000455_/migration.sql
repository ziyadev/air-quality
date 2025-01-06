-- CreateTable
CREATE TABLE "AirQuality" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "aqius" INTEGER NOT NULL,
    "mainus" TEXT NOT NULL,
    "aqicn" INTEGER NOT NULL,
    "maincn" TEXT NOT NULL,

    CONSTRAINT "AirQuality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AirQuality_latitude_longitude_idx" ON "AirQuality"("latitude", "longitude");
