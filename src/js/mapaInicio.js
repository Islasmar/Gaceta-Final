
(function () {
    //Login Or 
    const lat = 20.617893;
    const lng = -97.818094;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa)
    let propiedades = [];
    //Filtros
    const filtros = {
        categoria: '',
        precio: ''
    }

    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> contributors'
    }).addTo(mapa);

    //Filtrado de categorias y precios

    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value
        filtrarPropiedades();
    })

    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value
        filtrarPropiedades();
    })

    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades'
            const respuesta = await fetch(url)
            propiedades = await respuesta.json()
            mostrarPropiedades(propiedades)
        } catch (error) {
            console.log(error)
        }
    }
    const mostrarPropiedades = propiedades => {
        //Limpiar los markers previos.
        markers.clearLayers()

        propiedades.forEach(propiedades => {
            //Agregar los pines

            const marker = new L.marker([propiedades?.lat, propiedades?.lng], {
                autoPan: true //Cunado de clikc en el marker se va a sentrar en el mapa
            })
                .addTo(mapa)
                .bindPopup(`
            <h1 class="text-xl font-extrabold uppercase my-5"> ${propiedades.titulo} </h1>
            <img src="uploads/${propiedades?.imagen}" alt="Imagen de la propiedades ${propiedades.titulo}">
            <p class="text-gray-600 font-bold">${propiedades.precio.nombre}</p>
            <a href="/propiedades/${propiedades.id}" class="bg-aqua w-full text-center block font-bold text-white p-3 uppercase rounded"> Ver propiedades </a>
            `)

            markers.addLayer(marker)
        })

    }

    const filtrarPropiedades = () => {
        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)
       mostrarPropiedades(resultado)
    }

    const filtrarCategoria = (propiedades) => {
        return filtros.categoria ? propiedades.categoriaId === filtros.categoria : propiedades
    }

    const filtrarPrecio = (propiedades) => {
        return filtros.precio ? propiedades.precioId === filtros.precio : propiedades
    }
    obtenerPropiedades()
})()