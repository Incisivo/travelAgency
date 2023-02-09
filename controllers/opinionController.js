import { Opinion } from "../models/Opiniones.js";

const guardarOpinion = async (req, res) => {

    // Validación

    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre está vacío' });
    }

    if (email.trim() === '') {
        errores.push({ mensaje: 'El email está vacío' });
    }

    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje está vacío' });
    }

    if (errores.length > 0) {

        // Consultar opiniones existentes
        const opiniones = await Opinion.findAll();

        // Mostrar los errores
        res.render('opiniones', {
            pagina: 'Opiniones',
            errores,
            nombre,
            email,
            mensaje,
            opiniones

        })
    } else {
        // Almacenar en BD

        try {
            await Opinion.create({
                nombre,
                email,
                mensaje
            });

            res.redirect('/opiniones');
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarOpinion
}