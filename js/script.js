var inicio = 0;
var timeout = 0;

var notacion = ["U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"]


//Funcion para replazar caracter en un indice especifico de una string
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// funcion para calcular el promedio de un array
function ArrayAvg(arr) {
    return arr.reduce((a,b)=> a+=b)/arr.length
}

/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}

function LeadingZeroMilliseconds(Time) {
    return (Time < 100) ? "0" + Time : +Time;
}

function convertir_milisegundos(milisegundos) {
    var tiempoMilisegundos = 0
    var tiempoSegundos = 0
    var tiempoMinutos = 0

    if(milisegundos > 1000) {
        tiempoSegundos = Math.floor(milisegundos/1000)
        tiempoMilisegundos = Math.floor(milisegundos%1000)

        if (tiempoSegundos >= 60) {
            tiempoMinutos = Math.floor(tiempoSegundos / 60);
            tiempoSegundos = Math.floor(tiempoSegundos % 60);
        } else {
            tiempoMinutos = 0;
        }
    } else {
        tiempoMinutos = 0
        tiempoSegundos = 0;
        if(milisegundos == 1000) {
            tiempoSegundos = 1
            tiempoMilisegundos = 0
        } else {
            tiempoMilisegundos = milisegundos
        }
    }

    return LeadingZero(tiempoMinutos) + ':' + LeadingZero(tiempoSegundos) + ':' + LeadingZeroMilliseconds(tiempoMilisegundos)
}

function verificacion_local_storage() {
    
    if (localStorage.getItem('tiempos_almacenados') !== undefined && localStorage.getItem('tiempos_almacenados')) {
        tiempos_almacenados = localStorage.getItem('tiempos_almacenados')
        tiempos_almacenados = tiempos_almacenados.split(",")
        try {
            mostrar_array_de_datos(tiempos_almacenados)
        } catch(err) {
            console.log(err);
        }
    } else {
        var tiempos_almacenados = []
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
    }

    return tiempos_almacenados
}

function time_to_milliseconds(time_array){
    for(i in time_array) {
        tiempo_en_milisegundos = 0
        x = time_array[i]
        tiempo_en_milisegundos += parseInt(x.charAt(6) + x.charAt(7) + x.charAt(8)) + parseInt(x.charAt(3) + x.charAt(4))*1000 + parseInt(x.charAt(0) + x.charAt(1))*60000
        time_array[i] = tiempo_en_milisegundos
    }
    return time_array
}

function extract_time(tiempos_almacenados) {
    var tiempos = []
    for(i in tiempos_almacenados) {
        if(tiempos_almacenados[i].length == 9) {
            tiempos.push(tiempos_almacenados[i])
        }
    }
    return tiempos
}

function show_statistics(tiempos_almacenados){
    actual_solve(tiempos_almacenados)
    ao5(tiempos_almacenados)
    ao12(tiempos_almacenados)
    mo3(tiempos_almacenados)

    best_solve(tiempos_almacenados)
    best_ao5(tiempos_almacenados)
    best_ao12(tiempos_almacenados)
    best_mo3(tiempos_almacenados)
}

function best_solve(tiempos_almacenados) {
    let tiempos = time_to_milliseconds(extract_time(tiempos_almacenados))
    let mejor_tiempo = "----"
    if(tiempos.length >= 1){
        mejor_tiempo = Math.min(...tiempos)
        mejor_tiempo = convertir_milisegundos(mejor_tiempo)
    }
    const mejor_solucion = document.getElementById("mejor_solucion")
    mejor_solucion.innerHTML = mejor_tiempo
}

function actual_solve(tiempos_almacenados) {
    time = document.getElementById('crono').innerHTML
    let actual_solve = "----"
    if (time !== "00:00.000" && tiempos_almacenados.length >= 1) {
        actual_solve = time
    }
    document.getElementById("actual_solucion").innerHTML = actual_solve
}

function ao_calculator(data) {
    data = data.filter(function(value, index, arr) {
        return value.charAt(0) !== "D"
    })
    
    data = time_to_milliseconds(data)

    let min = Math.min(...data);
    let max = Math.max(...data);

    data.splice(data.indexOf(min), 1);
    data.splice(data.indexOf(max), 1);

    ao5_text = Math.trunc(ArrayAvg(data))

    return ao5_text
}

function ao5(tiempos_almacenados) {
    let tiempos = extract_time(tiempos_almacenados)
    let ao5_text = "----"

    if (tiempos.length >= 5) {
        ultimos_5_tiempos = tiempos.slice(tiempos.length-5, tiempos.length)
        ao5_text = convertir_milisegundos(ao_calculator(ultimos_5_tiempos))
    }

    const ao5_actual = document.getElementById("actual_ao5")
    ao5_actual.innerHTML = ao5_text
}

function best_ao5(tiempos_almacenados){
    let tiempos = extract_time(tiempos_almacenados)
    let all_ao5 = []
    let best_ao5_text = "----"

    if (tiempos.length > 5) {
        for (let [index, val] of tiempos.entries()) {
            if (index >= 5) {
                all_ao5.push(ao_calculator(tiempos.slice(index-5, index)))
            }
        }
    
        let min_ao5 = Math.min(...all_ao5)
        best_ao5_text = convertir_milisegundos(min_ao5)
    
    } else if (tiempos.length == 5) {
        best_ao5_text = convertir_milisegundos(ao_calculator(tiempos.slice(tiempos.length-5, tiempos.length)))
    }

    const mejor_ao5 = document.getElementById("mejor_ao5")
    mejor_ao5.innerHTML = best_ao5_text
}

function ao12(tiempos_almacenados) {
    let tiempos = extract_time(tiempos_almacenados)
    let ao12_text = "----"

    if (tiempos.length >= 12) {
        ultimos_12_tiempos = tiempos.slice(tiempos.length-12, tiempos.length)
        ao12_text = convertir_milisegundos(ao_calculator(ultimos_12_tiempos))
    }
    const ao12_actual = document.getElementById("actual_ao12")
    ao12_actual.innerHTML = ao12_text
}

function best_ao12(tiempos_almacenados){
    let tiempos = extract_time(tiempos_almacenados)
    let all_ao12 = []
    let best_ao12 = "----"

    if(tiempos.length > 12) {
        for (let [index, val] of tiempos.entries()) {
            if (index >= 12) {
                all_ao12.push(ao_calculator(tiempos.slice(index-12, index)))
            }
        }
    
        let min_ao12 = Math.min(...all_ao12)
        best_ao12 = convertir_milisegundos(min_ao12)
    }else if (tiempos.length === 12) {
        best_ao12 = convertir_milisegundos(ao_calculator(tiempos.slice(tiempos.length-12, tiempos.length)))
    }
    const mejor_ao12 = document.getElementById("mejor_ao12")
    mejor_ao12.innerHTML = best_ao12
}

function mo3_calculator(data) {
    data = data.filter(function(value, index, arr) {
        return value.charAt(0) !== "D"
    })
    
    data = time_to_milliseconds(data)
    mo3_text = Math.trunc(ArrayAvg(data))
    return mo3_text
}

function mo3(tiempos_almacenados) {
    let tiempos = extract_time(tiempos_almacenados)
    let mo3_text = "----"
    if (tiempos.length >= 3) {
        ultimos_3_tiempos = [tiempos[tiempos.length-1], tiempos[tiempos.length-2], tiempos[tiempos.length-3]]
        mo3_text = convertir_milisegundos(mo3_calculator(ultimos_3_tiempos))
    }
    const mo3_actual = document.getElementById("actual_mo3")
    mo3_actual.innerHTML = mo3_text
}

function best_mo3(tiempos_almacenados){
    let tiempos = extract_time(tiempos_almacenados)
    let all_mo3 = []
    let best_mo3_text = "----"

    if (tiempos.length > 3){
        for (let [index, val] of tiempos.entries()) {
            if (index >= 3) {
                all_mo3.push(mo3_calculator(tiempos.slice(index-3, index)))
            }
        }
    
        let min_mo3 = Math.min(...all_mo3)
        best_mo3_text = convertir_milisegundos(min_mo3)
    } else if(tiempos.length == 3) {
        ultimos_3_tiempos = [tiempos[tiempos.length-1], tiempos[tiempos.length-2], tiempos[tiempos.length-3]]
        best_mo3_text = convertir_milisegundos(mo3_calculator(ultimos_3_tiempos))
    }

    const mejor_mo3 = document.getElementById("mejor_mo3")
    mejor_mo3.innerHTML = best_mo3_text
}

// Original scramble generator: https://codepen.io/ET23/pen/ExdrNz
function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function generar_mezcla() {
    var moves = new Array();
	moves['r'] = new Array("R","R'","R2");
	moves['l'] = new Array("L","L'","L2");
	moves['u'] = new Array("U","U'","U2");
	moves['d'] = new Array("D","D'","D2");
	moves['f'] = new Array("F","F'","F2");
	moves['b'] = new Array("B","B'","B2");

	var limit = 25;
	var last = "";
	var scramble = "";
	var keys = "";

	for (var i=1;i<=limit;i++) {
		keys = new Array("r","l","u","d","f","b");
		shuffle(keys);
		while (last == keys[0]) {
			shuffle(keys);
		}
		shuffle(moves[keys[0]]);
		move = moves[keys[0]][0];
		scramble += move+"&nbsp;&nbsp;";
		last = keys[0];
	}
	

	scramble = scramble.replace("R R", "R2");
	scramble = scramble.replace("L L", "L2");
	scramble = scramble.replace("U U", "U2");
	scramble = scramble.replace("D D", "D2");
	scramble = scramble.replace("F F", "F2");
	scramble = scramble.replace("B B", "B2");
    scramble = scramble.replace("R' R'", "R2");
	scramble = scramble.replace("L' L'", "L2");
	scramble = scramble.replace("U' U'", "U2");
	scramble = scramble.replace("D' D'", "D2");
	scramble = scramble.replace("F' F'", "F2");
	scramble = scramble.replace("B' B'", "B2");

    document.getElementById("scramble").innerHTML = scramble;
}

function almacenar() {
    resultado = document.getElementById('crono').innerHTML
    mezcla_resultado = document.getElementById('scramble').innerHTML
    num = tiempos_almacenados.length
    mostrar_datos(resultado, mezcla_resultado, num)
    tiempos_almacenados.push(resultado, mezcla_resultado)
    localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
    show_statistics(tiempos_almacenados)
}

function mostrar_datos(tiempo, mezcla, index) {
    dnf_id = "dnf"
    plus_two_id = "plus_two"

    if(mezcla.charAt(mezcla.length-2) + mezcla.charAt(mezcla.length-1) === "+2") {
        mezcla = mezcla.replace("+2", "")
        plus_two_id = "plus_two_added"

    } else if(tiempo.charAt(0) === "D") {
        dnf_id = "dnf_true"
        tiempo = "DNF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    }

    document.getElementById("lista_tiempos").innerHTML = 
        `<button id="boton_borrar_tiempo" onclick="borrar_tiempo(${index})" focusable="false"><img src="img/minitrash.png" alt="basura">` +
        `<button id="mostrar_scramble" onclick="mostrar_scramble(${index})" focusable="false"><p>scramble</p></button>` +
        `</button><button id="${plus_two_id}" onclick="plus_two(${index})" focusable="false"><p>+2</p></button>`+
        `<button id="${dnf_id}" onclick="dnf(${index})" focusable="false"><p>DNF</p></button>`+
        `<div id="tiempo"><p id="tiempo_tiempo">${tiempo}</p>` +
        `<p id="tiempo_scramble">${mezcla}</p></div>` +
        document.getElementById("lista_tiempos").innerHTML
}

function mostrar_array_de_datos(tiempos_almacenados) {
    num = tiempos_almacenados.length
    document.getElementById("lista_tiempos").innerHTML = ''
    for (var i = 0; i < num; i++) {
        if (i % 2 == 0) {
            tiempo = tiempos_almacenados[i]
            mezcla = tiempos_almacenados[i + 1]
            mostrar_datos(tiempo, mezcla, i)
        }
    }
}

function borrar_tiempos() {
    var respupesta = confirm("¿Estás seguro de que quieres eliminar todos tus tiempos?")
    if (respupesta) {
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados = [])
        tiempos_almacenados = []
        document.getElementById("lista_tiempos").innerHTML = ''

        //Borramos y volvemos a poner el boton para que al pulsarr espacio no se pulse
        document.getElementById("div_borrar_tiempos").innerHTML = ''
        document.getElementById("div_borrar_tiempos").innerHTML = '<button id="boton_borrar_tiempos" onclick="borrar_tiempos()" focusable="false"><img src="img/trash.png" alt="basura"></button>'

        show_statistics(tiempos_almacenados)
        document.getElementById('crono').innerHTML = "00:00.000"
    }
}

function borrar_tiempo(index) {
    tiempos_almacenados.splice(index, 1)
    tiempos_almacenados.splice(index, 1)
    localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
    mostrar_array_de_datos(tiempos_almacenados) 
    show_statistics(tiempos_almacenados) 
}

function plus_two(index) {
    tiempo = tiempos_almacenados[index]
    scramble = tiempos_almacenados[index + 1]
    segundos = parseInt(tiempo.charAt(3) + tiempo.charAt(4))

    if (tiempo.charAt(0) !== "D" && scramble.slice(scramble.length-2) !== "+2") {
        segundos = (segundos + 2).toString()
        if (parseInt(segundos) > 59) {
            minutos = (parseInt(tiempo.charAt(0) + tiempo.charAt(1)) + 1).toString()
            segundos = (parseInt(segundos) - 60).toString()

            if (parseInt(segundos) < 10) { segundos = "0" + segundos }
            if (parseInt(minutos) < 10) { minutos = "0" + minutos }

            tiempo = minutos + tiempo[2] + segundos + tiempo.slice(5)
        } else {
            if (parseInt(segundos) < 10) { segundos = "0" + segundos }
            tiempo = tiempo.slice(0, 3) + segundos + tiempo.slice(5)
        }

        tiempos_almacenados[index+1] = tiempos_almacenados[index+1] + "+2"

    } else if(tiempo.charAt(0) !== "D") {
        if (parseInt(segundos) < 2) {
            minutos = (parseInt(tiempo.charAt(0) + tiempo.charAt(1)) - 1).toString()
            segundos = (60-segundos).toString()

            if (parseInt(segundos) < 10) { segundos = "0" + segundos }
            if (parseInt(minutos) < 10) { minutos = "0" + minutos }

            tiempo = minutos + tiempo[2] + segundos + tiempo.slice(5)
        } else {
            segundos = (segundos - 2).toString()
            if (parseInt(segundos) < 10) { segundos = "0" + segundos }
            tiempo = tiempo.slice(0, 3) + segundos + tiempo.slice(5)
        }

        tiempos_almacenados[index+1] = tiempos_almacenados[index+1].replace("+2", "")
    }
    tiempos_almacenados[index] = tiempo
    localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
    mostrar_array_de_datos(tiempos_almacenados)
}

function dnf(index) {
    scramble = tiempos_almacenados[index+1]
    if(tiempos_almacenados[index].charAt(0) !== "D" && scramble.slice(scramble.length-2) !== "+2") {
        tiempos_almacenados[index] = "DNF" + tiempos_almacenados[index]
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
        mostrar_array_de_datos(tiempos_almacenados)
    } else {
        tiempos_almacenados[index] = tiempos_almacenados[index].replace("DNF", "")
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
        mostrar_array_de_datos(tiempos_almacenados)
    }
}

function reemplazarTodos( texto, reemplazarQue, reemplazarCon, ignorarMayMin){
    var reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
        reemplazarCon = reemplazarCon.replace(/\$(?=[$&`'\d])/g, "$$$$"),
        modif = "g" + (ignorarMayMin ? "i" : ""),
        regex = new RegExp(reemplazarQue, modif);
    
    return texto.replace(regex,reemplazarCon);
  }

function mostrar_scramble(index){
    scramble = tiempos_almacenados[index+1]
    scramble = reemplazarTodos(scramble, "&nbsp;&nbsp;", "  ", true)
    alert(scramble)
}

var tiempos_almacenados = verificacion_local_storage();
show_statistics(tiempos_almacenados)

// Desabilitar que la pagina se desplace al pulsar espacio
window.addEventListener('keydown', function(event) {
    if (event.keyCode == 32 && event.target == document.body) {
        event.preventDefault();
    }
});

try {
    generar_mezcla();
} catch(err) {
    console.log(err);
}

document.getElementById("export-button").addEventListener('click', function() {
    data = Object.values(tiempos_almacenados)
    json_string = JSON.stringify(data)
    json_string = json_string.split('&nbsp;').join(' ')
    navigator.clipboard.writeText(json_string)
        .then(() => {
        alert("Datos copiados al portapapeles")
    })
        .catch(err => {
        alert('No se pudieron copiar los datos al portapapeles', err);
    })
})

document.getElementById("submit-import").addEventListener('click', function() {
    var respuesta = confirm("¿Estas seguro de que deseas reescribir todos tus datos?")
    if (respuesta) {
        data = document.getElementById("import").value
        data = JSON.parse(data.replace(' ', '&nbsp;'))
        tiempos_almacenados = data
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
    }
})