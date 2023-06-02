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
  try {
    const { titulo, url, descripcion } = req.body;
    const result = await postsModel.addPost({ titulo, url, descripcion });
    return res.json({
      ok: true,
      message: "Nuevo Post añadido",
      result,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(code)
      .json({ ok: false, code: 404, message: "No se encuentra", result });
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
    console.log(error);
    if (error.code === "22P02") {
      return res
        .status(400)
        .json({ ok: false, message: "Formato no válido en el parámetro" });
    }
    if (error.code === "404") {
      return res
        .status(404)
        .json({ ok: false, message: "No existe ese registro" });
    }
    return res.status(500).json({ ok: false, message: "Error de Servidor" });
  }
};

export const indexController = {
  getAllPosts,
  makePost,
  getOnePost,
};
