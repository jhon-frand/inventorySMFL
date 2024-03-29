import { connection } from '../database/database.js'

const postCategoria = async (peticion, respuesta) => {
    try {
        const categoria = peticion.body;
        const sql = "INSERT INTO categorias SET ?";
        const [registro] = await connection.query(sql, categoria);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Categoria registrada"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar categoria"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putCategoria = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const categoria = peticion.body;
        const sql = "UPDATE categorias SET ? WHERE id_categoria = ?";
        const [actualizar] = await connection.query(sql, [categoria, id]);
        if (actualizar.affectedRows> 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Categoria actualizada"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar categoria"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getCategoria = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = "SELECT * FROM categorias WHERE id_categoria = ?"
        const [categoria] = await connection.query(sql, id);
        if (categoria.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "categoria": categoria
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró la categoría"
            })
        } 
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getCategorias = async (peticion, respuesta) => {
    try {
        const sql = "SELECT * FROM categorias"
        const [categorias] = await connection.query(sql);
        if (categorias.length > 0) {
            return respuesta.status(200).json(categorias)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron las categorías"
            })
        } 
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const categorias = {
    postCategoria,
    putCategoria,
    getCategoria,
    getCategorias
}