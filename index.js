//@ts-nocheck
// Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.
//  1.- Declara una funcion getAllBreeds que devuelva un array de strings con todas las razas de perro.
/**
 * Obtiene un array con todas las razas de perros desde la API de Dog CEO.
 * @async
 * @function getAllBreeds
 * @returns {Promise<string[]>} Un array con todas las razas de perros.
 * @throws {Error} Lanza un error si la petición falla.
 */
const getAllBreeds = async () => {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
        if (response.ok) {
            const data = await response.json();
            return Object.keys(data.message);
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw (error);
    }

}

// getAllBreeds();

//  2.- Declara una función getRandomDog que obtenga una imagen random de una raza.
/**
 * Obtiene una imagen aleatoria de un perro.
 * @async
 * @function getRandomDog
 * @returns {Promise<string>} URL de la magen aleatoria de un perro.
 * @throws {Error} Lanza un error si la petición falla.
 * 
 */
const getRandomDog = async () => {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        if (response.ok) {
            const data = await response.json();
            return data.message;
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw (error);
    }
}

// getRandomDog();

//  3.- Declara una función getAllImagesByBreed que obtenga todas las imágenes de la raza komondor.
/**
 * Obtiene todas las imágenes de la raza "komodor".
 * @async
 * @function getAllImagesByBreed
 * @returns {Promise<string[]>} Array con URLs con las imágenes de la raza "komodor".
 * @throws {Error} Lanza un error si la petición falla.
 */
const getAllImagesByBreed = async () => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/komondor/images`);
        if (response.ok) {
            const data = await response.json();
            return data.message;
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw (error);
    }
}

// getAllImagesByBreed();

//  4.- Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada por el argumento
/**
 * Obtiene todas las imágenes de una raza específica.
 * @async
 * @function getAllImagesByBreed2
 * @param {string} breed - Nombre de la raza para la petición.
 * @returns {Promise<string[]>} Array con URLs con las imágenes de la raza indicada.
 * @throws {Error} Lanza un error si la petición falla.
 */
const getAllImagesByBreed2 = async (breed) => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        if (response.ok) {
            const data = await response.json();
            return data.message;
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw (error);
    }
}

// getAllImagesByBreed2(komondor);

// GitHub API (I) - ¿Quieres saber mi información? Aquí la tienes
//  5.- Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a partir de su nombre de usuario. (https://api.github.com/users/{username}).
/**
 * Obtiene un perfil de un usuario de GitHub.
 * @async
 * @function getGitHubUserProfile
 * @param {string} username - Nombre de un usuario de GitHub.
 * @returns {Promise<Object>} Objeto con la información del perfil del usuario de GitHub.
 * @throws {Error} Lanza un error si la petición falla.
 */
const getGitHubUserProfile = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw (error);
    }
}

// getGitHubUserProfile('marisegu');

//  6.- Declara una función printGithubUserProfile(username) que reciba como argumento 
// el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM.
const paraPintar = document.querySelector('#paraPintar');
/**
 * Obtiene la información de un usuario de GitHub y la pinta en el DOM.
 * @async
 * @function printGithubUserProfile
 * @param {string} username - Nombre de usuario de GitHub.
 * @returns {Promise<{img: string, name: string}>} Objeto con la URL del avatar y el nombre del usuario.
 * @throws {Error} Lanza un error si la petición falla.
 */
const printGithubUserProfile = async (username) => {
    try {
        const object = await getGitHubUserProfile(username);
        const img = object.avatar_url;
        const name = object.name;
        pintarEnDOM(img, name)
        return { img, name };
    } catch (error) {
        throw (error);
    }
}
/**
 * Pinta en el DOM la imagen y el nombre de un usuario.
 * @function pintarEnDOM
 * @param {string} img - URL del avatar del usuario.
 * @param {string} name - Nombre del usuario.
 * @returns {void}
 */
const pintarEnDOM = (img, name) => {
    let avatar = document.createElement("IMG");
    let nombre = document.createElement("P");

    avatar.src = img;
    nombre.textContent = name;

    paraPintar.append(avatar, nombre);
}

// printGithubUserProfile('marisegu');

//  7. Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API 
// para obtener información de ese usuario y devuelva un string que represente 
// una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma:

// <section>
//     <img src="url de imagen" alt="imagen de usuario">
//     <h1>Nombre de usuario</h1>
//     <p>Public repos: (número de repos)</p>
// </section>

/**
 * Obtiene la información de un usuario de GitHub y devuelve una tarjeta HTML con sus datos.
 * @async
 * @function getAndPrintGitHubUserProfile
 * @param {string} username - Nombre de usuario de GitHub.
 * @returns {Promise<string>} String con el HTML de la tarjeta de usuario.
 * @throws {Error} Lanza un error si la petición falla.
 */
const getAndPrintGitHubUserProfile = async (username) => {
    try {
        const object = await getGitHubUserProfile(username);
        const avatar = object.avatar_url;
        const nombre = object.name;
        const publicRepos = object.public_repos;
        return crearTarjeta(avatar, nombre, publicRepos);
    } catch (error) {
        throw error;
    }
}

/**
 * Crea una tarjeta HTML con la información de un usuario de GitHub.
 * @function crearTarjeta
 * @param {string} avatar - URL del avatar del usuario.
 * @param {string} nombre - Nombre del usuario.
 * @param {number} publicRepos - Numero de repositorios públicos del usuario.
 * @returns {string} String con el HTML de la tarjeta.
 */
const crearTarjeta = (avatar, nombre, publicRepos) => {
    return `
<section>
    <img src="${avatar}" alt="${nombre}">
    <h1>${nombre}</h1>
    <p>Public repos: ${publicRepos}</p>
</section>`
};

//  8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. 
// El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. 
// Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.
// (Esto no se testea).

const formulario = document.querySelector('#formulario');
const nombreUsuario = document.querySelector('#nombreUsuario');
/**
 * Evento del formulario que obtiene y muestra la información de un usuario de GitHub al enviar el formulario.
 * @event submit
 * @param {SubmitEvent} ev - Evento de envío del formulario.
 * @returns {void}
 */
formulario.addEventListener('submit', (ev) => {
    ev.preventDefault();
    getAndPrintGitHubUserProfile(nombreUsuario.value);
});

// GitHub API (II)- Promesas, promesas y más promesas
//  9.- Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames) 
// que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
// Objetivo: Usar Promise.all()
// Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
// Pregunta. ¿cuántas promesas tendremos?
// Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// Pasos:
// Mapear el array y hacer un fetch() para cada usuario. Esto nos devuelve un array lleno de promesas.
// Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
// Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario. 
// Consigue que se imprima por consola el nombre de cada usuario.

/**
 * Obtiene los perfiles de múltiples usuarios de GitHub utilizando Promise.all().
 * @async
 * @function fetchGithubUsers
 * @param {string[]} userNames - Array con los nombres de usuario de GitHub.
 * @returns {Promise<{name: string, html_url: string}[]>} Array de objetos con el nombre y URL de cada usuario solicitado.
 * @throws {Error} Lanza un error si la petición falla.
 */
const fetchGithubUsers = (userNames) => {

    const arrayPromesas = userNames.map((name) => fetch(`https://api.github.com/users/${name}`));

    return Promise.all(arrayPromesas)
        .then((respuestas) => {
            const promesasJSON = respuestas.map((respuesta) => {
                if (respuesta.ok) {
                    return respuesta.json();
                } else {
                    throw 'Error 404! Page not found';
                }
            });
            return Promise.all(promesasJSON);
        })
        .then((json) => {
            return json.map((data) => ({
                name: data.name,
                html_url: data.html_url,
            }));
        })
        .catch((error) => {
            throw error;
        })
}

// const userNames = ['octocat', 'alenriquez96', 'alejandroereyesb'];
// fetchGithubUsers(userNames).then(console.log);