import { pool } from "../db/query.js";

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const addPost = async ({ titulo, url, descripcion }) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion) VALUES ($1,$2,$3) RETURNING *";
  const { rows } = await pool.query(query, [titulo, url, descripcion]);
  console.log(rows[0]);
  return rows[0];
};

const getPost = async (id) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

export const  postsModel  = {
  getPosts,
  addPost,
  getPost,
};
