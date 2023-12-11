import express from "express";
import { body } from 'express-validator';
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, cambiarEstado, mostrarPropiedad, enviarMensaje, verMensajes } from '../controllers/propiedadController.js'
import protegerRuta from "../middleware/protegerRutas.js";
import upload from '../middleware/subirImagen.js';
import identificarUsuario from "../middleware/identificarUsuario.js";

const router = express.Router()

router.get('/mis-eventos', protegerRuta, admin)
router.get('/eventos/crear', protegerRuta, crear)
router.post('/eventos/crear',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El Título del Anuncio es Obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La Descripción no puede ir vacia')
        .isLength({ max: 200 }).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('lat').notEmpty().withMessage('Ubica el Evento en el Mapa'),
    guardar
)
router.get('/eventos/agregar-imagen/:id',
    protegerRuta,
    agregarImagen
)

router.post('/eventos/agregar-imagen/:id',
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen
);
router.get('/eventos/editar/:id',
    protegerRuta,
    editar
)

router.post('/eventos/editar/:id',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El Título del Anuncio es Obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La Descripción no puede ir vacia')
        .isLength({ max: 200 }).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('lat').notEmpty().withMessage('Ubica el evento en el Mapa'),
    guardarCambios
)
router.post('/eventos/eliminar/:id',
    protegerRuta,
    eliminar
)
router.put('/eventos/:id',
    protegerRuta,
    cambiarEstado
)

//Área pública
router.get('/eventos/:id',
    identificarUsuario,
    mostrarPropiedad
)

//Almacenar los mensajes.
router.post('/eventos/:id',
    identificarUsuario,
    body('mensaje').isLength({ min: 10 }).withMessage('El Mensaje no puede ir vacio o es muy corto'),
    enviarMensaje
)

router.get('/mensajes/:id',
    protegerRuta,
    verMensajes
)
export default router