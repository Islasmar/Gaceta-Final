import { Evento, Categoria } from "../models/index.js"

const propiedades = async (req, res) => {

    const eventos = await Evento.findAll({
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' }
        ]
    })

    res.json(eventos)
}

export {
    propiedades
}