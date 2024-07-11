import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { connection } from '../database/database.js';

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
        // Obtén el nombre original del archivo
        const originalName = file.originalname;
        // Elimina cualquier prefijo numérico
        const cleanedName = originalName.replace(/^\d+-/, '');
        cb(null, cleanedName);
    }
});

const upload = multer({ storage: storage });

const postEquipo = async (req, res) => {
    try {
        const equipo = req.body;
        equipo.imagen = req.file.filename;  // Nombre de la imagen
        const sql = "INSERT INTO equipos SET ?";
        const [registro] = await connection.query(sql, equipo);
        if (registro.affectedRows > 0) {
            return res.status(200).json({
                "status": 200,
                message: "Equipo registrado"
            })
        } else {
            return res.status(403).json({
                "status": 403,
                "message": "Error al registrar equipo"
            })
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const putEquipo = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const equipo = peticion.body;
        const sql = "UPDATE equipos SET ? WHERE id_equipo = ?";
        const [actualizar] = await connection.query(sql, [equipo, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Equipo actualizado"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar equipo"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putImgEquipo = async (req, res) => {
    try {
      const { id } = req.params;
      let imagen = req.body.imagen;
  
      if (req.file) {
        imagen = req.file.filename; // Nombre de la imagen nueva
      }
  
      const sql = "UPDATE equipos SET imagen = ? WHERE id_equipo = ?";
      const [actualizar] = await connection.query(sql, [imagen, id]);
  
      if (actualizar.affectedRows > 0) {
        return res.status(200).json({
          "status": 200,
          message: "Imagen actualizada"
        });
      } else {
        return res.status(403).json({
          "status": 403,
          "message": "Error al actualizar imagen"
        });
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

const getEquipo = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const sql = `SELECT equipos.*,
                     categorias.nombre_categoria,
                     ubicaciones.ambiente,
                     ubicaciones.sitio,
                     unidades_productivas.nombre_unidad
                     FROM equipos
                     JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                     JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                     JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                     WHERE id_equipo = ?`;
        const [equipo] = await connection.query(sql, id);
        if (equipo.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "equipo": equipo
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró el equipo"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
//traer equipos por unidad
const getEquiposUnidad = async (peticion, respuesta) => {
    try {
        const { unidad } = peticion.params;
        const sql = `SELECT equipos.*,
                     categorias.nombre_categoria,
                     ubicaciones.ambiente,
                     ubicaciones.sitio,
                     unidades_productivas.nombre_unidad
                     FROM equipos
                     JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                     JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                     JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                     WHERE nombre_unidad = ?
                     ORDER BY equipos.id_equipo DESC`;
        const [equipo] = await connection.query(sql, unidad);
        if (equipo.length > 0) {
            return respuesta.status(200).json(equipo)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No hay equipos en esta unidad"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
//traer total de equipos por unidad
const getTotalEquiposUnidad = async (peticion, respuesta) => {
    try {
        const { unidad } = peticion.params;
        const sql = `
                    SELECT COUNT(*) AS totalEquipos,
                     unidades_productivas.nombre_unidad
                     FROM equipos
                     JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                     JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                     WHERE unidades_productivas.nombre_unidad = ?

                    `;
        const [equipos] = await connection.query(sql, unidad);
        const total = equipos[0].totalEquipos;
        respuesta.status(200).json(total);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

const getEquipos = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const sql = `SELECT equipos.*,
                    categorias.nombre_categoria,
                    ubicaciones.ambiente,
                    ubicaciones.sitio,
                    unidades_productivas.nombre_unidad
                    FROM equipos
                    JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                    JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                    ORDER BY equipos.id_equipo DESC`;
        const [equipos] = await connection.query(sql, id);
        if (equipos.length > 0) {
            return respuesta.status(200).json(equipos)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron equipos"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

//traer el total de equipos por estado
const getEquiposEstado = async (peticion, respuesta) => {
    try {

        const sql = `SELECT COUNT(*) AS total,
                     estado FROM equipos 
                    GROUP BY equipos.estado
                    `;
        const [resultado] = await connection.query(sql);
        if (resultado.length > 0) {
            return respuesta.status(200).json(resultado)
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
//traer el total de equipos por estado por unidad
const getEquiposEstadoUnidad = async (peticion, respuesta) => {
    try {
        const {unidad} = peticion.params;
        const sql = `SELECT COUNT(*) AS total,
	                unidades_productivas.nombre_unidad,
                    estado FROM equipos 
                    JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                    WHERE unidades_productivas.nombre_unidad = ?
                    GROUP BY equipos.estado`;
        const [resultado] = await connection.query(sql, unidad);

        if (resultado.length > 0) {
            return respuesta.status(200).json(resultado)
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

//listar equipos por estado
const getEquiposStatus = async (peticion, respuesta) => {
    try {
        const { estado } = peticion.params;
        const sql = `
            SELECT equipos.*,
                    categorias.nombre_categoria,
                    ubicaciones.ambiente,
                    ubicaciones.sitio,
                    unidades_productivas.nombre_unidad
                    FROM equipos
                    JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                    JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
            WHERE estado = ?
            ORDER BY equipos.id_equipo DESC
        `;
        const [equipos] = await connection.query(sql, estado);

        if (equipos.length > 0) {
            return respuesta.status(200).json(equipos)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron equipos"
            })
        }

    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}
//listar equipos por estado y unidad
const getEquiposStatusUnit = async (peticion, respuesta) => {
    try {
        const { estado, unidad } = peticion.params;
        const sql = `
            SELECT equipos.*,
                    categorias.nombre_categoria,
                    ubicaciones.ambiente,
                    ubicaciones.sitio,
                    unidades_productivas.nombre_unidad
            FROM equipos
            JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
            JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
            JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
            WHERE equipos.estado = ? AND unidades_productivas.nombre_unidad = ?
            ORDER BY equipos.id_equipo DESC
        `;
        const [equipos] = await connection.query(sql, [estado, unidad]);

        if (equipos.length > 0) {
            return respuesta.status(200).json(equipos);
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron equipos"
            });
        }

    } catch (error) {
        respuesta.status(500).send(error.message);
    }
};


const getTotal = async (peticion, respuesta) => {
    try {
        const sql = "SELECT COUNT(*) AS total_equipos FROM equipos";
        const [result] = await connection.query(sql);
        const total = result[0].total_equipos;
        respuesta.status(200).json({ totalEquipos: total });
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}
const putEstado = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const { estado } = peticion.body;
        const sql = `UPDATE equipos SET estado = ? WHERE id_equipo =?`;
        const [updateState] = await connection.query(sql, [estado, id]);
        if (updateState.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Estado actualizado"
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "Equipo no encontrado"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
export { upload };
export const equipos = {
    postEquipo,
    putEquipo,
    putImgEquipo,
    putEstado,
    getEquipo,
    getEquipos,
    getEquiposUnidad,
    getTotalEquiposUnidad,
    getEquiposEstado,
    getEquiposEstadoUnidad,
    getEquiposStatus,
    getEquiposStatusUnit,
    getTotal
}