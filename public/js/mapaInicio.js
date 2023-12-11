/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n(function () {\r\n    //Login Or \r\n    const lat = 20.617893;\r\n    const lng = -97.818094;\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);\r\n\r\n    let markers = new L.FeatureGroup().addTo(mapa)\r\n    let propiedades = [];\r\n    //Filtros\r\n    const filtros = {\r\n        categoria: '',\r\n        precio: ''\r\n    }\r\n\r\n    const categoriasSelect = document.querySelector('#categorias');\r\n    const preciosSelect = document.querySelector('#precios');\r\n\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\"> openstreetmap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    //Filtrado de categorias y precios\r\n\r\n    categoriasSelect.addEventListener('change', e => {\r\n        filtros.categoria = +e.target.value\r\n        filtrarPropiedades();\r\n    })\r\n\r\n    preciosSelect.addEventListener('change', e => {\r\n        filtros.precio = +e.target.value\r\n        filtrarPropiedades();\r\n    })\r\n\r\n    const obtenerPropiedades = async () => {\r\n        try {\r\n            const url = '/api/propiedades'\r\n            const respuesta = await fetch(url)\r\n            propiedades = await respuesta.json()\r\n            mostrarPropiedades(propiedades)\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n    const mostrarPropiedades = propiedades => {\r\n        //Limpiar los markers previos.\r\n        markers.clearLayers()\r\n\r\n        propiedades.forEach(propiedades => {\r\n            //Agregar los pines\r\n\r\n            const marker = new L.marker([propiedades?.lat, propiedades?.lng], {\r\n                autoPan: true //Cunado de clikc en el marker se va a sentrar en el mapa\r\n            })\r\n                .addTo(mapa)\r\n                .bindPopup(`\r\n            <h1 class=\"text-xl font-extrabold uppercase my-5\"> ${propiedades.titulo} </h1>\r\n            <img src=\"uploads/${propiedades?.imagen}\" alt=\"Imagen de la propiedades ${propiedades.titulo}\">\r\n            <p class=\"text-gray-600 font-bold\">${propiedades.precio.nombre}</p>\r\n            <a href=\"/propiedades/${propiedades.id}\" class=\"bg-aqua w-full text-center block font-bold text-white p-3 uppercase rounded\"> Ver propiedades </a>\r\n            `)\r\n\r\n            markers.addLayer(marker)\r\n        })\r\n\r\n    }\r\n\r\n    const filtrarPropiedades = () => {\r\n        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)\r\n       mostrarPropiedades(resultado)\r\n    }\r\n\r\n    const filtrarCategoria = (propiedades) => {\r\n        return filtros.categoria ? propiedades.categoriaId === filtros.categoria : propiedades\r\n    }\r\n\r\n    const filtrarPrecio = (propiedades) => {\r\n        return filtros.precio ? propiedades.precioId === filtros.precio : propiedades\r\n    }\r\n    obtenerPropiedades()\r\n})()\n\n//# sourceURL=webpack://bienes-raices/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;