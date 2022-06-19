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
    setTimeout(() => {
        document.getElementById("stop-timer-mobile").style.cssText = 'display: block;'
    }, 500);
}

function stop_timer_mobile() {
    empezarDetener()
    setTimeout(() => {
        document.getElementById("stop-timer-mobile").style.cssText = 'display: none;'
    }, 500);
}

document.querySelector('.timer_div').addEventListener('touchstart', touch)
window.onkeydown = presionar_tecla;