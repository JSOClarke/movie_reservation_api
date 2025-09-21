-- CreateTable
CREATE TABLE "public"."bookings" (
    "booking_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "show_id" INTEGER NOT NULL,
    "booking_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "public"."movies" (
    "movie_id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "poster" VARCHAR(255),
    "genre" VARCHAR(100),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "public"."screens" (
    "screen_id" SERIAL NOT NULL,
    "seating_max_capacity" INTEGER NOT NULL,

    CONSTRAINT "screens_pkey" PRIMARY KEY ("screen_id")
);

-- CreateTable
CREATE TABLE "public"."showings" (
    "show_id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "showtimes" tstzrange NOT NULL,
    "price" INTEGER NOT NULL,
    "screen_id" INTEGER NOT NULL,
    "seating_curr_capacity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "showings_pkey" PRIMARY KEY ("show_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(100) NOT NULL,
    "role" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "public"."showings"("show_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."showings" ADD CONSTRAINT "showings_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."showings" ADD CONSTRAINT "showings_screen_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("screen_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
