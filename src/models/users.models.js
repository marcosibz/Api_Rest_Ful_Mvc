import pool from "../../config/conexion.js";

export const getAllUsers = async () => {
  const sql = "SELECT * FROM users";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql);
    connection.release();
    return rows;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id) => {
  const sql = "SELECT * FROM users WHERE id_users = ?";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    return rows;
  } catch (error) {
    return error;
  }
};

export const createUser = async (values) => {
  const sql = "INSERT INTO users SET ?";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [values]);
    connection.release();
    return rows;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (newValues, id) => {
  const sql = "UPDATE users SET ? WHERE id_users = ?";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [newValues, id]);
    connection.release();
    return rows;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  const sql = "DELETE FROM users WHERE id_users = ?";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    return rows;
  } catch (error) {
    return error;
  }
};
