//Peticiones a APIs usando Callbacks
//npm install xmlhttprequest --save
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // importamos el modulo para hacer las peticiones

let API = 'https://rickandmortyapi.com/api/character/'; // direccion de la API

function fetchData(url_api, callback) { // funcion principal
    let xhttp = new XMLHttpRequest(); // instanciamos la conexion
    xhttp.open('GET', url_api, true);  // abrir una conexion con el metodo, la ruta y si es asincrono
    xhttp.onreadystatechange = function (event) { // validacion del llamado
        if (xhttp.readyState === 4) { // el state 4 es el ultimo de la petición
            if (xhttp.status === 200) { // verificamos que el status este en 200, que dice que todo bien, no un 400 o 500
                callback(null, JSON.parse(xhttp.responseText)); // el primer valor es el err, y el siguiente el resultado
                // ejecutamos el callback con el resultado
            } else {
                const error = new Error('Error ' + url_api); // si no es 200
                return callback(error, null) // matamos el proceso con un error
            }
        }
    }
    xhttp.send(); // por ultimo enviamos la peticion
}

//Múltiples Peticiones a un API con Callbacks
fetchData(API, function (error1, data1) { // primero buscamos la lista de personajes
    if (error1) return console.error(error1);  // si error, matamos retornando un error
    fetchData(API + data1.results[0].id, function (error2, data2) { // luego buscamos en la api el id de Rick
        if (error2) return console.error(error2);  // si error, matamos retornando un error
        fetchData(data2.origin.url, function (error3, data3) { // por ultimo la consulta a la api que contiene su dimension
            if (error3) return console.error(error3); // si error, matamos retornando un error

            // mostramos los resultados
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    });
});