import {Sequelize} from 'sequelize';
import {Categoria, Evento } from '../models/index.js';

const inicio = async (req, res) => {
    const [categorias, noticia, actividadesCulturales] = await Promise.all([
        Categoria.findAll({ raw: true }),
        Evento.findAll({
            limit: 3,
            where: {
                categoriaId: 1
            },
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Evento.findAll({
            limit: 3,
            where: {
                categoriaID: 2
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ])
    res.render('inicio', {
        pagina: 'Inicio',
        categorias,
        noticia,
        actividadesCulturales,
        csrfToken: req.csrfToken()
    })

}
const categoria = async(req, res) => {
    const {id} = req.params

    //Comprobar que la categoría exista.
    const categoria = await  Categoria.findByPk(id)
    if(!categoria){
        return res.redirect('/404')
    }
    //Obtener eventos  de las categorias.
    const eventos = await Evento.findAll({
        where:{
            categoriaId: id
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    })
    res.render('categoria',{
        pagina: `${categoria.nombre}s en Venta`,
        eventos,
        csrfToken: req.csrfToken()
    })

}
const noEncontrado = (req, res) => {
    res.render('404',{
        pagina: 'No encontrada.',
        csrfToken: req.csrfToken()
    })

}
const buscador = async (req, res) => {
    const {termino} = req.body
    //validar que termino no este vacio

    if(!termino.trim()){
        return res.redirect('back')
    }
        //consultar los eventos
        const eventos = await Evento.findAll({
            where: {
                titulo: {
                    [Sequelize.Op.like] : '%' + termino + '%'
                }
            },
            include: [
                {model: Precio , as: 'precio'}
            ]
        })
        res.render('busqueda',{
            pagina: 'Resultados de la Busqueda',
            eventos,
            csrfToken: req.csrfToken()
        })


}
export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}