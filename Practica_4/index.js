const express = require('express');
const app = express();

app.use(express.json());

/*EJERCICIO 1 — SALUDO*/
/*
{
  "nombre": "Luis"
}
*/

app.post("/saludo", (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre || typeof nombre !== "string") {
            return res.json({
                estado: "error",
                mensaje: "Nombre inválido"
            });
        }

        res.json({
            estado: "ok",
            mensaje: `Hola, ${nombre}`
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});


/*EJERCICIO 2 — CALCULADORA*/
/*
{
  "a": 10,
  "b": 5,
  "operacion": "division"
}
*/

app.post("/calcular", (req, res) => {
    try {
        const { a, b, operacion } = req.body;

        if (typeof a !== "number" || typeof b !== "number") {
            return res.json({ estado: "error", error: "a y b deben ser números" });
        }

        let resultado;

        switch (operacion) {
            case "suma":
                resultado = a + b;
                break;
            case "resta":
                resultado = a - b;
                break;
            case "multiplicacion":
                resultado = a * b;
                break;
            case "division":
                if (b === 0) {
                    return res.json({ estado: "error", error: "División por cero" });
                }
                resultado = a / b;
                break;
            default:
                return res.json({ estado: "error", error: "Operación inválida" });
        }

        res.json({
            estado: "ok",
            resultado
        });

    } catch (error) {
        res.json({ estado: "error", error: error.message });
    }
});


/*EJERCICIO 3 — CRUD TAREAS*/
/*
{
  "id": 1,
  "titulo": "Estudiar Node",
  "completada": false
}
*/

let tareas = [];

app.post("/tareas", (req, res) => {
    try {
        const { id, titulo, completada } = req.body;

        if (id == null || !titulo || typeof completada !== "boolean") {
            return res.json({ estado: "error", mensaje: "Datos inválidos" });
        }

        tareas.push({ id, titulo, completada });

        res.json({
            estado: "ok",
            mensaje: "Tarea creada"
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});

app.get("/tareas", (req, res) => {
    res.json({
        estado: "ok",
        tareas
    });
});

app.put("/tareas/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tarea = tareas.find(t => t.id === id);

        if (!tarea) {
            return res.json({ estado: "error", mensaje: "Tarea no encontrada" });
        }

        Object.assign(tarea, req.body);

        res.json({
            estado: "ok",
            mensaje: "Tarea actualizada"
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});

app.delete("/tareas/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        tareas = tareas.filter(t => t.id !== id);

        res.json({
            estado: "ok",
            mensaje: "Tarea eliminada"
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});


/*EJERCICIO 4 — VALIDAR PASSWORD*/
/*
{
  "password": "Hola1234"
}
*/
app.post("/validar-password", (req, res) => {
    try {
        const { password } = req.body;
        const errores = [];

        if (password.length < 8) errores.push("Mínimo 8 caracteres");
        if (!/[A-Z]/.test(password)) errores.push("Debe tener mayúscula");
        if (!/[a-z]/.test(password)) errores.push("Debe tener minúscula");
        if (!/[0-9]/.test(password)) errores.push("Debe tener número");

        res.json({
            estado: "ok",
            esValida: errores.length === 0,
            errores
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});


/*EJERCICIO 5 — TEMPERATURA*/
/*
{
  "valor": 25,
  "desde": "C",
  "hacia": "F"
}
*/
function convertir(valor, desde, hacia) {
    if (desde === hacia) return valor;

    if (desde === "C" && hacia === "F") return valor * 9/5 + 32;
    if (desde === "F" && hacia === "C") return (valor - 32) * 5/9;

    if (desde === "C" && hacia === "K") return valor + 273.15;
    if (desde === "K" && hacia === "C") return valor - 273.15;

    if (desde === "F" && hacia === "K") return (valor - 32) * 5/9 + 273.15;
    if (desde === "K" && hacia === "F") return (valor - 273.15) * 9/5 + 32;

    return null;
}

app.post("/convertir-temperatura", (req, res) => {
    try {
        const { valor, desde, hacia } = req.body;
        const resultado = convertir(valor, desde, hacia);

        if (resultado === null) {
            return res.json({ estado: "error", mensaje: "Escalas inválidas" });
        }

        res.json({
            estado: "ok",
            valorOriginal: valor,
            escalaOriginal: desde,
            valorConvertido: resultado,
            escalaConvertida: hacia
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});


/*EJERCICIO 6 — BUSCAR EN ARRAY*/
/*
{
  "array": [1,2,3,4],
  "elemento": 3
}
*/

app.post("/buscar", (req, res) => {
    try {
        const { array, elemento } = req.body;

        if (!Array.isArray(array)) {
            return res.json({ estado: "error", mensaje: "Debe ser un array" });
        }

        const indice = array.indexOf(elemento);

        res.json({
            estado: "ok",
            encontrado: indice !== -1,
            indice,
            tipoElemento: typeof elemento
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});


/*EJERCICIO 7 — CONTAR PALABRAS*/
/*
{
  "texto": "hola mundo hola node"
}
*/

app.post("/contar-palabras", (req, res) => {
    try {
        const { texto } = req.body;

        const palabras = texto.trim().split(/\s+/);
        const unicas = new Set(palabras);

        res.json({
            estado: "ok",
            totalPalabras: palabras.length,
            totalCaracteres: texto.length,
            palabrasUnicas: unicas.size
        });

    } catch (error) {
        res.json({ estado: "error", mensaje: error.message });
    }
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
