import express from 'express';

import { formularioLogin, formularioOlvidePassword, formularioRegistro,registrar,cerrarSesion,confirmar,resetPassword,comprobarToken,nuevoPassword,autenticar} from '../controllers/usuarioController.js';

const router = express.Router();

//Routing
router.get('/login',formularioLogin);
router.post('/login',autenticar);
//Cerrar sesión
router.post('/cerrar-sesion',cerrarSesion)

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', resetPassword)
router.get('/confirmar/:token',confirmar)

//Almacenar el nuevo password
router.get('/olvide-password/:token',comprobarToken);
router.post('/olvide-password/:token',nuevoPassword);


export default router