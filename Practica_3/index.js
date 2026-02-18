const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

/* =====================================
   FUNCIONES DE RESPUESTA ESTÁNDAR
===================================== */

function respuestaOK(resultado){
    return {
        ok: true,
        resultado: resultado
    };
}

function respuestaError(mensaje){
    return {
        ok: false,
        error: mensaje
    };
}

/* =====================================
   1. mascaracteres
===================================== */
app.post('/mascaracteres', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadena1, cadena2 } = req.body;

    if(cadena1 === undefined || cadena2 === undefined){
        return res.json(respuestaError("Faltan parámetros"));
    }

    const resultado = (cadena1.length >= cadena2.length)
        ? cadena1
        : cadena2;

    res.json(respuestaOK(resultado));
});


/* =====================================
   2. menoscaracteres
===================================== */
app.post('/menoscaracteres', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadena1, cadena2 } = req.body;

    if(cadena1 === undefined || cadena2 === undefined){
        return res.json(respuestaError("Faltan parámetros"));
    }

    const resultado = (cadena1.length <= cadena2.length)
        ? cadena1
        : cadena2;

    res.json(respuestaOK(resultado));
});


/* =====================================
   3. numcaracteres
===================================== */
app.post('/numcaracteres', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadena } = req.body;

    if(cadena === undefined){
        return res.json(respuestaError("Falta la cadena"));
    }

    res.json(respuestaOK(cadena.length));
});


/* =====================================
   4. palindroma
===================================== */
app.post('/palindroma', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadena } = req.body;

    if(cadena === undefined){
        return res.json(respuestaError("Falta la cadena"));
    }

    const limpia = cadena.toLowerCase().replace(/\s/g, '');
    const invertida = limpia.split('').reverse().join('');

    res.json(respuestaOK(limpia === invertida));
});


/* =====================================
   5. concat
===================================== */
app.post('/concat', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadena1, cadena2 } = req.body;

    if(cadena1 === undefined || cadena2 === undefined){
        return res.json(respuestaError("Faltan parámetros"));
    }

    res.json(respuestaOK(cadena1 + cadena2));
});


/* =====================================
   6. applysha256
===================================== */
app.post('/applysha256', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadena } = req.body;

    if(cadena === undefined){
        return res.json(respuestaError("Falta la cadena"));
    }

    const hash = crypto
        .createHash('sha256')
        .update(cadena)
        .digest('hex');

    res.json(respuestaOK({
        original: cadena,
        encriptada: hash
    }));
});


/* =====================================
   7. verifysha256
===================================== */
app.post('/verifysha256', (req, res) => {

    if(!req.body) return res.json(respuestaError("No se recibió JSON"));

    const { cadenaNormal, cadenaEncriptada } = req.body;

    if(cadenaNormal === undefined || cadenaEncriptada === undefined){
        return res.json(respuestaError("Faltan parámetros"));
    }

    const nuevoHash = crypto
        .createHash('sha256')
        .update(cadenaNormal)
        .digest('hex');

    const coincide = nuevoHash === cadenaEncriptada;

    res.json(respuestaOK(coincide));
});


/* =====================================
   INICIAR SERVIDOR
===================================== */
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
