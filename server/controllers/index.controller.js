import { handleErrors } from "../db/handleErrors.js";
import { postsModel } from "../model/index.model.js";

const getAllPosts = async (req, res) => {
  try {
    const result = await postsModel.getPosts();
    return res.json({
      ok: true,
      message: "Lista de Posts",
      result,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(code)
      .json({ ok: false, code: 404, message: "No se encuentra", result });
  }
};

const makePost = async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  if (!titulo || !img || !descripcion) {
    return res
      .status(400)
      .json({ ok: false, message: "Faltan datos por ingresar" });
  }
  try {
    const result = await postsModel.addPost({ titulo, img, descripcion });
    return res.json({
      ok: true,
      message: "Nuevo Post añadido",
      result,
    });
  } catch (error) {
    console.log(error.code);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postsModel.getPost(id);
    return res.json({
      ok: true,
      message: "Post encontrado",
      result,
    });
  } catch (error) {
    console.log(error.code);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message });
  }
};

const modifyPost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postsModel.putPost(id);
    return res.json({
      ok: true,
      message: "Like Añadido",
      result,
    });
  } catch (error) {
    console.log(error.code);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postsModel.removePost(id);
    return res.json({
      ok: true,
      message: "Post eliminado",
      result,
    });
  } catch (error) {
    console.log(error);
    console.log(error.code);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message });
  }
};

export const indexController = {
  getAllPosts,
  makePost,
  getOnePost,
  modifyPost,
  deletePost,
};
