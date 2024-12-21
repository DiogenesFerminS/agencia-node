import { Testimonial } from "../models/Testimoniales.js";


const guardarTestimoniales = async (req, res) => {

const {nombre, correo, mensaje} = req.body;

const errores = [];

if(nombre.trim() === ''){
    errores.push({alerta : 'El nombre esta vacio'})
}

if(correo.trim() === ''){
    errores.push({alerta : 'El correo esta vacio'})
}

if(mensaje.trim() === ''){
    errores.push({alerta : 'El mensaje esta vacio'})
}

if(errores.length > 0){

//se consultan los testimoniales Existentes
const testimoniales = await Testimonial.findAll();

//mostrar la vista con errores
res.render('testimoniales',{
    pagina: 'Testimoniales',
    errores,
    nombre,
    correo,
    mensaje,
    testimoniales
})
}else{
    //Almacenar testimonial en la base de datos

    try {
        await Testimonial.create({
            nombre,
            correo,
            mensaje
        })

        res.redirect('/testimoniales');
    } catch (error) {
        console.log(error);
    }
}


}

export {
    guardarTestimoniales
}