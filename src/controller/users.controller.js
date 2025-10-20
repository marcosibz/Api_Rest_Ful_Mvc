import * as model from "../models/users.model.js";

export const getAllUsers = async (req, res) => {
  const rows = await model.getAllUsers();
  if (rows.errno) {
    return res
      .status(500)
      .send("ERROR, no se pudo realizar la consulta: " + rows.errno);
  }
  rows.length > 0
    ? res.json(rows)
    : res.status(404).send("No hay usuarios registrados");
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const rows = await model.getUserById(id);

  if (rows.errno) {
    return res
      .status(500)
      .send("ERROR, no se pudo realizar la consulta: " + rows.errno);
  }

  rows[0] ? res.json(rows[0]) : res.status(404).send("El usuario no existe");
};

export const createUser = async (req, res) => {
  const values = req.body;
  const rows = await model.createUser(values);
  if (rows.errno) {
    return res
      .status(500)
      .send("ERROR, no se pudo realizar la consulta: " + rows.errno);
  }
  res.status(201).send("Usuario creado con el id: " + rows.insertId);
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const newValues = req.body;

  const rows = await model.updateUser(newValues, id);

  if (rows.errno) {
    return res
      .status(500)
      .send("ERROR, no se pudo realizar la consulta: " + rows.errno);
  }

  rows.affectedRows === 0
    ? res.status(404).send("El usuario no existe")
    : res.send("Datos actualizados");
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const rows = await model.deleteUser(id);

  if (rows.errno) {
    return res
      .status(500)
      .send("ERROR, no se pudo realizar la consulta: " + rows.errno);
  }

  rows.affectedRows === 0
    ? res.status(404).send("El usuario no existe")
    : res.send("Dato eliminado");
};
