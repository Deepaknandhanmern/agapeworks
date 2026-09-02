-- CreateTable
CREATE TABLE "ViviraDownloadLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViviraDownloadLead_pkey" PRIMARY KEY ("id")
);
