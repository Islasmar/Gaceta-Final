import { Evento, Categoria } from "../models/index.js"

const eventos = async (req, res) => {

    const eventos = await Evento.findAll({
        include: [
            { model: Categoria, as: 'categoria' }
        ]
    })

    res.json(eventos)
}

export {
   eventos
}