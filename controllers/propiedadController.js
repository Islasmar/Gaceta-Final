import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator';
import { Categoria, Evento, Mensaje, Usuario } from '../models/index.js';
import { esVendedor, formatearFecha } from '../helpers/index.js'

const admin = async (req, res) => {
    //Leer QueryString
    const { pagina: paginaActual } = req.query
    const expresion = /^[0-9]$/ //Expresión regular donde solo se aceptan dígitos del 0-9
    if (!expresion.test(paginaActual)) { //Forma en la que se comprobará si la expresión regular comple con un patrón.
        return res.redirect('/mis-eventos?pagina=1')
    }

    try {
        const { id } = req.usuario

        //Limites y Offset para el paginador.
        const limit = 2;
        const offset = ((paginaActual * limit) - limit)

        const [eventos, total] = await Promise.all([
            Evento.findAll({
                limit,
                offset,
                where: {
                    usuarioId: id
                },
                include: [
                    {
                        model: Categoria,
                        as: 'categoria'
                    },
                    {
                        model: Mensaje,
                        as: 'mensajes'
                    }
                ]
            }),
            Evento.count({
                where: {
                    usuarioId: id
                }
            })
        ])

        res.render('eventos/admin', {
            pagina: 'Eventos y Noticias',
            eventos,
            csrfToken: req.csrfToken(),
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit
        })

    } catch (error) {
        console.log(error)
    }
}
//Formulario para crear un evento
const crear = async (req, res) => {
    //Consultar modelo de precios y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll()
    ])
    res.render('eventos/crear', {
        pagina: 'Crear Evento',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
}
const guardar = async (req, res) => {
    //Validación 
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {

        const [categorias, precios] = await Promise.all([
            Categoria.findAll()
        ])
        return res.render('eventos/crear', {
            pagina: 'Crear Evento',
            csrfToken: req.csrfToken(),
            categorias,
            errores: resultado.array(),
            datos: req.body
        })
    }
    //Crear un Registro
    const { titulo, descripcion, calle, lat, lng, categoria: categoriaId } = req.body

    const { id: usuarioId } = req.usuario

    try {
        const eventoGuardado = await Evento.create({
            titulo,
            descripcion,
            calle,
            lat,
            lng,
            categoriaId,
            usuarioId,
            imagen: ''

        })
        const { id } = eventoGuardado

        res.redirect(`/eventos/agregar-imagen/${id}`)

    } catch (error) {
        console.log(error)
    }
}
const agregarImagen = async (req, res) => {
    const { id } = req.params
    //Validar que el evento exista

    const evento = await Evento.findByPk(id)

    if (!evento) {
        return res.redirect('/mis-eventos')
    }
    //validar que la propiedD NO ESTE PUBLICADA
    if (evento.publicado) {
        return res.redirect('/mis-eventos')
    }
    //validar que el evento pertenece a quien visita esta pagina

    if (req.usuario.id.toString() !== evento.usuarioId.toString()) {
        return res.redirect('/mis-eventos')
    }

    return res.render('eventos/agregar-imagen', {
        pagina: `Agregar Imagen: ${evento.titulo}`,
        csrfToken: req.csrfToken(),
        evento
    })
}

const almacenarImagen = async (req, res, next) => {

    const { id } = req.params
    // Validar que el evento exista

    const evento = await Evento.findByPk(id)

    if (!evento) {
        return res.redirect('/mis-eventos')
    }
    // Validar que el evento NO ESTÉ PUBLICADA
    if (evento.publicado) {
        return res.redirect('/mis-eventos')
    }
    // Validar que el evento pertenezca a quien visita esta página

    if (req.usuario.id.toString() !== evento.usuarioId.toString()) {
        return res.redirect('/mis-eventos')
    }
    try {
        console.log(req.file)
        //Alamcenar la Imagen y publicar el evento
        evento.imagen = req.file.filename
        evento.publicado = 1

        await evento.save()

        next()

    } catch (error) {
        console.log(error)
    }
}
const editar = async (req, res) => {

    const { id } = req.params
    //Validar que el evento exista.
    const evento = await Evento.findByPk(id)
    if (!evento) {
        return res.redirect('/mis-eventos')
    }

    //Revisar que quien visita la URL es quien creó el evento
    if (evento.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-eventos')
    }

    //Consultar Modelo de Precio y Categoria.
    const [categorias] = await Promise.all([
        Categoria.findAll()
    ])
    res.render('eventos/editar', {
        pagina: `Editar evento: ${evento.titulo} `,
        csrfToken: req.csrfToken(),
        categorias,
        datos: evento
    })
}
const guardarCambios = async (req, res) => {
    //Verificar la validación.
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {

        const [categorias] = await Promise.all([
            Categoria.findAll()
        ])
        return res.render('eventos/editar', {
            pagina: 'Editar eventos',
            csrfToken: req.csrfToken(),
            categorias,
            errores: resultado.array(),
            datos: req.body
        })
    }

    const { id } = req.params
    //Validar que el evento exista.
    const evento = await Evento.findByPk(id)
    if (!evento) {
        return res.redirect('/mis-eventos')
    }

    //Revisar que quien visita la URL es quien creó el evento
    if (evento.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-eventos')
    }
    // Reescribir el objeto y actualizarlo.
    try {
        const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body

        const { id: usuarioId } = req.usuario

        evento.set({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })

        await evento.save()
        res.redirect('/mis-eventos')
    } catch (error) {
        console.log(error)
    }
}
const eliminar = async (req, res) => {
    const { id } = req.params
    //Validar que el evento exista.
    const evento = await Evento.findByPk(id)
    if (!evento) {
        return res.redirect('/mis-eventos')
    }

    //Revisar que quien visita la URL es quien creó el evento
    if (evento.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-eventos')
    }
    //Eliminar la imagen.
    await unlink(`public/uploads/${evento.imagen}`)
    console.log(`Se elimino la imagen ${evento.imagen}`)
    //Eliminar el evento
    await evento.destroy()
    res.redirect('/mis-eventos')
}

//Modificar el  Estado de el evento
const cambiarEstado = async (req,res)=>{
    const { id } = req.params

    //validar que el evento exista
    const evento = await Evento.findByPk(id)

    if (!evento) {
        return res.redirect('/mis-eventos')
    }

    //Revisar quin visita la URL sea dueño de la propeidd
    if (evento.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-eventos')
    }
    //Actualizar.
    evento.publicado = !evento.publicado

    await evento.save()

    res.json({
        resultado: 'true'
    })
}


//Muestra un evento
const mostrarPropiedad = async (req, res) => {
    const { id } = req.params
    //Validar que el evento exista.
    const evento = await Evento.findByPk(id, {
        include: [
            { model: Categoria, as: 'categoria' }
        ]
    })

    if (!evento || !evento.publicado) {
        return res.redirect('/404')
    }

    res.render('eventos/mostrar', {
        evento,
        pagina: evento.titulo,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, evento.usuarioId)
    })
}
const enviarMensaje = async (req, res) => {
    const { id } = req.params
    //Validar que el evento exista.
    const evento = await Evento.findByPk(id, {
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' }
        ]
    })

    if (!evento) {
        return res.redirect('/404')
    }

    //Renderizar los errores.
    //Validación 
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        return res.render('eventos/mostrar', {
            evento,
            pagina: evento.titulo,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            esVendedor: esVendedor(req.usuario?.id, evento.usuarioId),
            errores: resultado.array()
        })
    }

    const { mensaje } = req.body
    const { id: eventoId } = req.params
    const { id: usuarioId } = req.usuario

    //Almacenar el mensaje.
    await Mensaje.create({
        mensaje,
        eventoId,
        usuarioId
    })

    res.redirect('/')
}
//Leer mensajes recibidos.
const verMensajes = async (req, res) => {
    const { id } = req.params

    //validar que el evento exista
    const evento = await Evento.findByPk(id,{
        include: [
            {model: Mensaje, as: 'mensajes',
            include:[
                {model: Usuario.scope('eliminarPassword'), as: 'usuario'}
            ]
        } 
        ],
    })

    if (!evento) {
        return res.redirect('/mis-eventos')
    }

    //Revisar que quien visita la URL sea dueño de el evento
    if (evento.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-eventos')
    }

    res.render('eventos/mensajes', {
        pagina: 'Mensajes',
        mensajes: evento.mensajes,
        formatearFecha
    })
}
export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    cambiarEstado,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes
}