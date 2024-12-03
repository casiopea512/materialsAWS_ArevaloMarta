document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() { // para cargar funciones que dependen del harware, por ejemplo la cámara
    // Cordova is now initialized. Have fun!

    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');
}

window.onload = (event) => {
    console.log("Pàgina carregada completament. Inicialitzant..");
    var options = { "swipeable": true };
    var el = document.getElementsByClassName('tabs');
    var instance = M.Tabs.init(el, options);

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
      // specify options here
    });
};