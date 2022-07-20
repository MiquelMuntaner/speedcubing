function empezarDetener() {
    if (timeout == 0) {
        inicio = vuelta = new Date().getTime();
        funcionando();
        blur()
    } else {
        clearTimeout(timeout);
        timeout = 0;
        almacenar();
        generar_mezcla();
    }
}

function funcionando() {
    var actual = new Date().getTime();
    var diff = new Date(actual - inicio);

    // mostramos la diferencia entre la fecha actual y la inicial
    var result = LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds()) + "." + LeadingZeroMilliseconds(diff.getUTCMilliseconds());
    document.getElementById('crono').innerHTML = result;

    // Indicamos que se ejecute esta función nuevamente dentro de 1 milisegundo
    timeout = setTimeout("funcionando()", 1);
}

function presionar_tecla() {
    tecla_esc = event.keyCode;

    if (tecla_esc == 32) {
        empezarDetener();
    } else if (timeout != 0) {
        empezarDetener();
    }
}

function touch() {
    empezarDetener()

    // Escondemos todo para que solo se vea el cronometro

    setTimeout(() => {
        document.getElementById("stop-timer-mobile").style.cssText = 'display: block;'
    }, 500);

    document.querySelector(".header").style.cssText = 'opacity: 0;'
    document.getElementById("scramble").style.cssText = 'opacity: 0;'
    document.querySelector(".stats-div").style.cssText = 'opacity: 0;'
    document.getElementById("div_borrar_tiempos").style.cssText = 'opacity: 0;'
    document.getElementById("lista_tiempos").style.cssText = 'opacity: 0;'
}

function stop_timer_mobile() {
    empezarDetener()

    setTimeout(() => {
        document.getElementById("stop-timer-mobile").style.cssText = 'display: none;'
    }, 300);

    document.querySelector(".header").style.cssText = 'opacity: 100;'
    document.getElementById("scramble").style.cssText = 'opacity: 100;'
    document.querySelector(".stats-div").style.cssText = 'opacity: 100;'
    document.getElementById("div_borrar_tiempos").style.cssText = 'opacity: 100;'
    document.getElementById("lista_tiempos").style.cssText = 'opacity: 100;'
}

document.querySelector('#crono').addEventListener('touchstart', touch)
window.onkeydown = presionar_tecla;