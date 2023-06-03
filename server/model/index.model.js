import { pool } from "../db/query.js";

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const addPost = async ({ titulo, img, descripcion }) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion) VALUES ($1,$2,$3) RETURNING *";
  const { rows } = await pool.query(query, [titulo, img, descripcion]);
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

const putPost = async (id) => {
  const text = "UPDATE posts SET likes=likes+1 WHERE id=$1 RETURNING *";
  const { rows } = await pool.query(text, [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

const removePost = async (id) => {
  const text = "DELETE FROM posts WHERE id=$1 RETURNING *";
  const { rows } = await pool.query(text, [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

export const postsModel = {
  getPosts,
  addPost,
  getPost,
  putPost,
  removePost,
};
