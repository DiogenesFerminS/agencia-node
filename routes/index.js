import express from 'express';
import { paginaInicio, 
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetallesViaje } from '../controllers/paginasController.js';
import { guardarTestimoniales } from '../controllers/testimonialesController.js';
const router = express.Router();

// req- es lo que enviamos : res-lo que express no responde
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes)
//pagina para ver los detalles del viajes segun su slug
router.get('/viajes/:slug', paginaDetallesViaje);

router.get('/testimoniales', paginaTestimoniales );
router.post('/testimoniales', guardarTestimoniales );


export default router;