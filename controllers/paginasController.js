import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio =  async (req, res ) => { 
  //para hacer mas de uno consulta a la db y que se ejecuten al mismo tiempo

const promisesDB = [];
promisesDB.push(Viaje.findAll({limit: 3}));
promisesDB.push(Testimonial.findAll({limit:3}));

    try {
    const resultado = await Promise.all(promisesDB);
    res.render('inicio',{
        pagina: 'Inicio',
        clase: 'home',
        viajes: resultado[0],
        testimoniales: resultado[1]
    });
  } catch (error) {
    console.log(error)
  }
}

const paginaNosotros =  (req, res)=>{

    res.render('nosotros',{
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res)=>{
    //consulta la DB
    //.findAll para traer todos los resultados
    const viajes = await Viaje.findAll();

    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes
    })
}

const paginaTestimoniales = async (req, res)=>{

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }
   
}

const paginaDetallesViaje = async(req, res)=>{
    const { slug } = req.params

    try {
        const viaje = await Viaje.findOne({where: { slug }})
        res.render('viaje-detalles',{
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
    
}

export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetallesViaje
}