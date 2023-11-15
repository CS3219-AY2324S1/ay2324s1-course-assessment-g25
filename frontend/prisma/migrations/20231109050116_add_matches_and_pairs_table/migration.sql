-- CreateTable
CREATE TABLE "matches" (
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complexity" TEXT NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "pairs" (
    "roomId" TEXT NOT NULL,
    "username1" TEXT NOT NULL,
    "username2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complexity" TEXT NOT NULL,
    "questionId" TEXT,

    CONSTRAINT "pairs_pkey" PRIMARY KEY ("roomId")
);
