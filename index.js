import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//conecta con la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))
//definir puerto 
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Obteniendo el año actual
app.use((req, res, next )=>{
    const year = new Date();
//Para definir una variable global
res.locals.actualYear = year.getFullYear();
res.locals.pageName = 'Agencia de viajes'

//Next para continuar con el flujos de los middleware
next();
})

//Agrega el body parser para poder leer los datos del formulario
app.use(express.urlencoded({extended: true}))

//Definimos la carpeta publica
app.use(express.static('public'));

//Agrega router que como una extension de la app para las rutas
app.use(('/'), router);

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});