-- CreateTable
CREATE TABLE `Admission` (
    `id` VARCHAR(191) NOT NULL,
    `programmeLevel` VARCHAR(191) NOT NULL,
    `programmeChoice` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `otherNames` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `placeOfBirth` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `presentAddress` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `permanentAddress` VARCHAR(191) NOT NULL,
    `postalAddress` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `nativeLanguage` VARCHAR(191) NOT NULL,
    `placeDiffNationality` BOOLEAN NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `denomination` VARCHAR(191) NOT NULL,
    `parentGuardian` VARCHAR(191) NOT NULL,
    `emergencyContact` VARCHAR(191) NOT NULL,
    `emergencyPhone` VARCHAR(191) NOT NULL,
    `nextOfKin` VARCHAR(191) NOT NULL,
    `nextOfKinPhone` VARCHAR(191) NOT NULL,
    `financeInfo` VARCHAR(191) NOT NULL,
    `healthInfo` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `academicReferee` VARCHAR(191) NOT NULL,
    `academicProfession` VARCHAR(191) NOT NULL,
    `academicInstitution` VARCHAR(191) NOT NULL,
    `academicAddress` VARCHAR(191) NOT NULL,
    `academicPhone` VARCHAR(191) NOT NULL,
    `academicEmail` VARCHAR(191) NOT NULL,
    `clergyReferee` VARCHAR(191) NOT NULL,
    `clergyPosition` VARCHAR(191) NOT NULL,
    `clergyChurch` VARCHAR(191) NOT NULL,
    `clergyAddress` VARCHAR(191) NOT NULL,
    `clergyPhone` VARCHAR(191) NOT NULL,
    `clergyEmail` VARCHAR(191) NOT NULL,
    `applicantSignature` VARCHAR(191) NOT NULL,
    `applicantDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Education` (
    `id` VARCHAR(191) NOT NULL,
    `admissionId` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `from` DATETIME(3) NOT NULL,
    `to` DATETIME(3) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` VARCHAR(191) NOT NULL,
    `admissionId` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PassportPhoto` (
    `id` VARCHAR(191) NOT NULL,
    `admissionId` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `Admission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `Admission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassportPhoto` ADD CONSTRAINT `PassportPhoto_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `Admission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
