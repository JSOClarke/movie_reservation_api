import pool from "../config/db.js";
import logger from "../config/logger.js";

const screens = [
  {
    screen_number: 1,
    screen_rows: [
      {
        row_label: "A",
        max_seats: 10,
        seat_type: "standard",
      },
      {
        row_label: "B",
        max_seats: 10,
        seat_type: "standard",
      },
    ],
  },
  {
    screen_number: 2,
    screen_rows: [
      {
        row_label: "A",
        max_seats: 10,
        seat_type: "standard",
      },
      {
        row_label: "B",
        max_seats: 10,
        seat_type: "luxury",
      },
      {
        row_label: "C",
        max_seats: 6,
        seat_type: "standard",
      },
    ],
  },
];

export const seedScreens = async () => {
  let screen_count: number = 0;
  let seat_count: number = 0;

  await pool.query(`TRUNCATE TABLE screens RESTART IDENTITY CASCADE`);
  await pool.query(`TRUNCATE TABLE seats RESTART IDENTITY CASCADE`);

  for (const screen of screens) {
    const response = await pool.query(
      `INSERT INTO screens (screen_id) VALUES ($1) RETURNING screen_id`,
      [screen.screen_number]
    );
    const screen_id = response.rows[0].screen_id;
    screen_count = screen_count + 1;

    for (const rows of screen.screen_rows) {
      const query = `INSERT INTO screen_rows (screen_id,row_label,max_seats,seat_type) VALUES ($1,$2,$3,$4)`;
      await pool.query(query, [
        screen_id,
        rows.row_label,
        rows.max_seats,
        rows.seat_type,
      ]);
      for (let i = 0; i < rows.max_seats; i++) {
        const seat_code = `${rows.row_label}${i}`;
        const query = `INSERT INTO seats (screen_id,row_label,col_number,seat_code) VALUES ($1,$2,$3,$4) RETURNING seat_id`;
        await pool.query(query, [screen_id, rows.row_label, i, seat_code]);
        seat_count = seat_count + 1;
      }
    }
  }
  logger.info(
    `Seeding Completed, ${screen_count}: Screens Added to DB, and ${seat_count} Seats added`
  );
};

// const seedScreenSeats = async (screen) => {
//   // Go over the screen rows and the create seays from that.
//   // for (let i = 0; i < screen.col_number; i++) {
//   //   for (let j = 0; j < screen.row_number; j++) {
//   //     const seat_code = `${String.fromCharCode(65 + i)}${j}`;
//   //     console.log(seat_code);
//   //     const query = `INSERT INTO seats (screen_id,row_label,col_number,seat_code) VALUES ($1,$2,$3,$4) RETURNING seat_id`;
//   //     await pool.query(query, [
//   //       screen_id,
//   //       String.fromCharCode(65 + i),
//   //       j,
//   //       seat_code,
//   //     ]);
//   //     seat_count = seat_count + 1;
//   //   }
//   //   console.log(`End of Seat row`);
//   // }
// };
await seedScreens();
