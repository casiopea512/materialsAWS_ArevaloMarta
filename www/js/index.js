document.addEventListener("DOMContentLoaded", function () {
    console.log("Página cargada completamente. Inicializando...");

    // Inicializamos los tabs
    var options = { "swipeable": true };
    var el = document.getElementsByClassName('tabs');
    var instance = M.Tabs.init(el, options);

    // Inicializamos el sidenav
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    // Evento para cargar las noticias al hacer clic en el botón
    document.getElementById('load-news-btn').addEventListener('click', () => {
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const allNews = data.amiibo.slice(0, 10); // Limitar a las primeras 10 noticias
                const selectedNews = getRandomItems(allNews, 3); // Seleccionar 3 noticias aleatorias
                loadNewsDivs(selectedNews); // Cargar las noticias seleccionadas
            });
    });

    function loadNewsDivs(news) {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos ítems

        news.forEach(item => {
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('col', 's12', 'm4', 'l4', 'card', 'hoverable');

            // Crear un enlace dentro de cada div
            const linkElement = document.createElement('a');
            linkElement.href = '#';
            linkElement.classList.add('card-content');
            linkElement.innerHTML = `<span class="card-title">${item.name}</span>`;

            // Añadir el enlace al div
            linkElement.addEventListener('click', function () {
                loadAmiiboDetails(item); // Cargar detalles del amiibo al hacer clic
                navigateToTab2(); // Cambiar a la pestaña 2
            });

            // Crear una imagen dentro del div
            const imageElement = document.createElement('img');
            imageElement.src = item.image;
            imageElement.alt = item.name;
            imageElement.classList.add('responsive-img'); // Clase de Materialize para imágenes responsivas
            newsDiv.appendChild(imageElement);

            // Añadir el enlace (con la tarjeta) al contenedor
            newsDiv.appendChild(linkElement);
            newsContainer.appendChild(newsDiv);
        });
    }

    function loadAmiiboDetails(item) {
        // Cargar los detalles del amiibo en la pestaña 2
        document.getElementById('amiibo-title').textContent = item.name;
        document.getElementById('amiibo-image').src = item.image;
        document.getElementById('amiibo-details').textContent = `Serie: ${item.amiiboSeries}\nLanzamiento: ${item.release.na} (NA)`;
    }

    function navigateToTab2() {
        // Navegar a la pestaña 2 usando el método select de Materialize
        var elems = document.getElementsByClassName('tabs');
        var instance = M.Tabs.getInstance(elems[0]);
        instance.select('test-swipe-2'); // Cambiar a la pestaña 2
    }

    // Función para seleccionar elementos aleatorios de un array
    function getRandomItems(arr, num) {
        const shuffled = arr.slice(0); // Copiar el array original
        let i = arr.length, temp, index;

        // Mientras haya elementos en el array
        while (i--) {
            index = Math.floor(Math.random() * (i + 1)); // Obtener un índice aleatorio
            temp = shuffled[i]; // Intercambiar el elemento
            shuffled[i] = shuffled[index];
            shuffled[index] = temp;
        }

        return shuffled.slice(0, num); // Devolver los primeros 'num' elementos del array barajado
    }


    // Manejo de la cámara
    document.addEventListener('deviceready', function() {
        console.log('Cordova está listo');
        
        document.getElementById("btnCapture").addEventListener("click", function() {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                correctOrientation: true,
                sourceType: Camera.PictureSourceType.CAMERA
            });
        });
    });

    function onSuccess(imageData) {
        // Convertir la imagen a base64
        const base64Image = imageData;

        // Actualizar el avatar del menú lateral
        document.querySelector('.circle').src = base64Image;

        // Guardar en localStorage
        localStorage.setItem("profilePhoto", base64Image);
    }

    function onFail(message) {
        alert('Error: ' + message);
    }
});
