
(function () {
        //Login Or 
        const lat =  20.617893; 
        const lng =  -97.818094;
        const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);

        let markers = new L.FeatureGroup().addTo(mapa)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> contributors'
        }).addTo(mapa);

        const obtenerPropiedades = async () => {
            try {
                const url = '/api/propiedades'
                const respuesta = await fetch(url)
                const propiedades = await respuesta.json()
                mostrarPropiedades(propiedades)
            } catch (error) {
                console.log(error)
            }
        }
        const mostrarPropiedades = propiedades =>{

        propiedades.forEach(propiedad => {
            //Agregar los pines

            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true //Cunado de clikc en el marker se va a sentrar en el mapa
            })
                .addTo(mapa)
                .bindPopup(`
            <h1 class="text-xl font-extrabold uppercase my-5"> ${propiedad.titulo} </h1>
            <img src="uploads/${propiedad?.imagen}" alt="Imagen de la propiedad">
            <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
            <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase text-white"> Ver Propiedad </a>
            `)

            markers.addLayer(marker)
        })

        }
        obtenerPropiedades()
})()