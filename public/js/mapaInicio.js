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

eval("__webpack_require__.r(__webpack_exports__);\n\r\n(function () {\r\n    //Login Or \r\n    const lat = 20.237786;\r\n    const lng = -97.9575799;\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);\r\n\r\n    let markers = new L.FeatureGroup().addTo(mapa)\r\n    let eventos = [];\r\n    //Filtros\r\n    const filtros = {\r\n        categoria: '',\r\n    }\r\n\r\n    const categoriasSelect = document.querySelector('#categorias');\r\n\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\"> openstreetmap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    //Filtrado de categorias y precios\r\n\r\n    categoriasSelect.addEventListener('change', e => {\r\n        filtros.categoria = +e.target.value\r\n        filtrarEventos();\r\n    })\r\n\r\n    const obtenerEventos = async () => {\r\n        try {\r\n            const url = '/api/eventos'\r\n            const respuesta = await fetch(url)\r\n            eventos = await respuesta.json()\r\n            mostrarEventos(eventos)\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n    const mostrarEventos = eventos => {\r\n        //Limpiar los markers previos.\r\n        markers.clearLayers()\r\n\r\n        eventos.forEach(eventos => {\r\n            //Agregar los pines\r\n\r\n            const marker = new L.marker([eventos?.lat, eventos?.lng], {\r\n                autoPan: true //Cunado de clikc en el marker se va a sentrar en el mapa\r\n            })\r\n                .addTo(mapa)\r\n                .bindPopup(`\r\n            <h1 class=\"text-xl font-extrabold uppercase my-5\"> ${eventos.titulo} </h1>\r\n            <img src=\"uploads/${eventos?.imagen}\" alt=\"Imagen de la eventos ${eventos.titulo}\">\r\n            <p class=\"text-gray-600 font-bold\">${eventos.categoria.nombre}</p>\r\n            <a href=\"/eventos/${eventos.id}\" class=\"bg-aqua w-full text-center block font-bold text-white p-3 uppercase rounded\"> Ver eventos</a>\r\n            `)\r\n\r\n            markers.addLayer(marker)\r\n        })\r\n\r\n    }\r\n\r\n    const filtrarEventos = () => {\r\n        const resultado = eventos.filter(filtrarCategoria).filter(filtrarPrecio)\r\n       mostrarEventos(resultado)\r\n    }\r\n\r\n    const filtrarCategoria = (eventos) => {\r\n        return filtros.categoria ? eventos.categoriaId === filtros.categoria : eventos\r\n    }\r\n\r\n    const filtrarPrecio = (eventos) => {\r\n        return filtros.precio ? eventos.precioId === filtros.precio : eventos\r\n    }\r\n    obtenerEventos()\r\n})()\n\n//# sourceURL=webpack://bienes-raices/./src/js/mapaInicio.js?");

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