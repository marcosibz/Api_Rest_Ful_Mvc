import { Router } from "express";
const router = Router();
import pool from '../../config/conexion.js';

export default router;

router.get("/users", async( req, res) => {

    const sql = 'SELECT * FROM users';
    try {
        const connection = await pool.getConnection(); //activar conexion
        const [rows] = await connection.query(sql); //ejecutar sql
        connection.release(); //liberar conexion
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

router.get("/users/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'SELECT * FROM users WHERE id_user = ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        (rows[0]) ? res.json(rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' }); 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

router.post("/users", async(req, res) => {
    const values = req.body;
    const sql = 'INSERT INTO users SET ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [values]);
        connection.release();
        console.log(rows)
        res.send('nuevo usuario creado');
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

router.put("/users/:id", async(req, res) => {
    const id = req.params.id;
    const newvalues = req.body;
    const sql = 'UPDATE users SET ? WHERE id_user = ?';

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [newvalues, id]);
        connection.release();
        rows.affectedRows === 0
            ? res.status(404).json({ error: 'Usuario no encontrado' })
            : res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

router.delete("/users/:id", async(req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id_user = ?';

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        rows.affectedRows === 0
            ? res.status(404).json({ error: 'Usuario no encontrado' })
            : res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});