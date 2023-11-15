import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
    host: "34.126.94.217",
    user: "postgres",
    port: 5432,
    password: "group25",
    database: "postgres"
});

export default pool;
