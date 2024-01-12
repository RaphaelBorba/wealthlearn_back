-- CreateTable
CREATE TABLE "answer_tb" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "answer_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_type_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_investment_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_type_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "performance_annual" DOUBLE PRECISION NOT NULL,
    "expires_in" TIMESTAMP(6) NOT NULL,
    "class_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investment_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "module_id" INTEGER NOT NULL,

    CONSTRAINT "lesson_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "module_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_invest_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_invest_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_tb" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,

    CONSTRAINT "question_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_investment_tb" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_investment_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_access_tb" (
    "id" SERIAL NOT NULL,
    "access" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_access_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_investment_tb" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "investment_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "bought_at" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_investment_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_access_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_tb_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progression_tb" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "module_level_id" INTEGER NOT NULL,
    "profile_invest_id" INTEGER,
    "progression_status" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_progression_tb_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "module_tb_name_key" ON "module_tb"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_tb_email_key" ON "user_tb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_progression_tb_user_id_key" ON "user_progression_tb"("user_id");

-- AddForeignKey
ALTER TABLE "answer_tb" ADD CONSTRAINT "answer_tb_fk0" FOREIGN KEY ("question_id") REFERENCES "question_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_type_tb" ADD CONSTRAINT "class_type_tb_fk0" FOREIGN KEY ("type_investment_id") REFERENCES "type_investment_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "investment_tb" ADD CONSTRAINT "investment_tb_fk0" FOREIGN KEY ("class_type_id") REFERENCES "class_type_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_tb" ADD CONSTRAINT "lesson_tb_fk0" FOREIGN KEY ("module_id") REFERENCES "module_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_tb" ADD CONSTRAINT "question_tb_fk0" FOREIGN KEY ("lesson_id") REFERENCES "lesson_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_investment_tb" ADD CONSTRAINT "user_investment_tb_fk0" FOREIGN KEY ("user_id") REFERENCES "user_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_investment_tb" ADD CONSTRAINT "user_investment_tb_fk1" FOREIGN KEY ("investment_id") REFERENCES "investment_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_tb" ADD CONSTRAINT "user_access_tb_fk0" FOREIGN KEY ("user_access_id") REFERENCES "user_access_tb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
