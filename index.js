import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import eventosRoutes from './routes/eventosRoute.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';
//Crear la app
const app = express();

//Abilitando lectura de datos de formularios
app.use(express.urlencoded({extended: true}))
//Habilitar Cokkie  Parser
app.use(cookieParser() )
//Habilitar CSRF
app.use(csrf({cookie: true}))

//Conexión a la base de datos.

try{
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la  Base de Datos.')
}catch (error){
    console.log(error)
}

//Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views')

//Routing 
app.use('/',appRoutes)
app.use('/auth', userRoutes);
app.use('/', eventosRoutes);
app.use('/api',apiRoutes)


//Carpeta Publica
app.use(express.static('public'));


//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando el en puerto ${port}`);
});