-- CreateTable
CREATE TABLE "WedlyWaitlistSignup" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WedlyWaitlistSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WedlyWaitlistSignup_email_key" ON "WedlyWaitlistSignup"("email");
