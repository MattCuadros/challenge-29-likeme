import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "ROOT",
  port: 5432,
  allowExitOnIdle: "true",
});

export const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

export const addPost = async ({ titulo, url, descripcion }) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion) VALUES ($1,$2,$3) RETURNING *";
  const { rows } = await pool.query(query, [titulo, url, descripcion]);
  console.log(rows[0]);
  return rows[0];
};

export const getPost = async (id) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};
