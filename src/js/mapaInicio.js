
(function () {
    //Login Or 
    const lat = 20.237786;
    const lng = -97.9575799;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa)
    let eventos = [];
    //Filtros
    const filtros = {
        categoria: '',
    }

    const categoriasSelect = document.querySelector('#categorias');


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> contributors'
    }).addTo(mapa);

    //Filtrado de categorias y precios

    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value
        filtrarEventos();
    })

    const obtenerEventos = async () => {
        try {
            const url = '/api/eventos'
            const respuesta = await fetch(url)
            eventos = await respuesta.json()
            mostrarEventos(eventos)
        } catch (error) {
            console.log(error)
        }
    }
    const mostrarEventos = eventos => {
        //Limpiar los markers previos.
        markers.clearLayers()

        eventos.forEach(eventos => {
            //Agregar los pines

            const marker = new L.marker([eventos?.lat, eventos?.lng], {
                autoPan: true //Cunado de clikc en el marker se va a sentrar en el mapa
            })
                .addTo(mapa)
                .bindPopup(`
            <h1 class="text-xl font-extrabold uppercase my-5"> ${eventos.titulo} </h1>
            <img src="uploads/${eventos?.imagen}" alt="Imagen de la eventos ${eventos.titulo}">
            <p class="text-gray-600 font-bold">${eventos.categoria.nombre}</p>
            <a href="/eventos/${eventos.id}" class="bg-aqua w-full text-center block font-bold text-white p-3 uppercase rounded"> Ver eventos</a>
            `)

            markers.addLayer(marker)
        })

    }

    const filtrarEventos = () => {
        const resultado = eventos.filter(filtrarCategoria).filter(filtrarPrecio)
       mostrarEventos(resultado)
    }

    const filtrarCategoria = (eventos) => {
        return filtros.categoria ? eventos.categoriaId === filtros.categoria : eventos
    }

    const filtrarPrecio = (eventos) => {
        return filtros.precio ? eventos.precioId === filtros.precio : eventos
    }
    obtenerEventos()
})()