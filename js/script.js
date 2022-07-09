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
    
    console.log('Verifying local storage')
    if (localStorage.getItem('tiempos_almacenados') !== undefined && localStorage.getItem('tiempos_almacenados')) {
        tiempos_almacenados = localStorage.getItem('tiempos_almacenados')
        tiempos_almacenados = tiempos_almacenados.split(",")
        console.log("localstorage obtained")
        try {
            mostrar_array_de_datos(tiempos_almacenados)
        } catch(err) {
            console.log(err);
        }
    } else {
        var tiempos_almacenados = []
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
        console.log("localstorage created")
    }

    try {
        ao5(tiempos_almacenados)
        ao12(tiempos_almacenados)
        mo3(tiempos_almacenados)
    } catch(err) {
        console.log(err);
    }

    return tiempos_almacenados
}

function ao5(tiempos_almacenados) {
    var tiempos = []
    for(i in tiempos_almacenados) {
        if(tiempos_almacenados[i].length == 9) {
            tiempos.push(tiempos_almacenados[i])
        }
    }
    if (tiempos.length >= 5) {
        ultimos_5_tiempos = [tiempos[tiempos.length-1], tiempos[tiempos.length-2], tiempos[tiempos.length-3], tiempos[tiempos.length-4], tiempos[tiempos.length-5]]
        
        ultimos_5_tiempos = ultimos_5_tiempos.filter(function(value, index, arr) {
            return value.charAt(0) !== "D"
        })
        // Pasando los numeros a milisegundos
        for(i in ultimos_5_tiempos) {
            tiempo_en_milisegundos = 0
            x = ultimos_5_tiempos[i]
            tiempo_en_milisegundos += parseInt(x.charAt(6) + x.charAt(7) + x.charAt(8)) + parseInt(x.charAt(3) + x.charAt(4))*1000 + parseInt(x.charAt(0) + x.charAt(1))*60000
            ultimos_5_tiempos[i] = tiempo_en_milisegundos
        }

        // eliminando el mayor y el menor numero
        var min = Math.min(...ultimos_5_tiempos);
        var max = Math.max(...ultimos_5_tiempos);

        ultimos_5_tiempos.splice(ultimos_5_tiempos.indexOf(min), 1);
        ultimos_5_tiempos.splice(ultimos_5_tiempos.indexOf(max), 1);

        // haciendo la media de los tres numeros
        ao5_text = Math.trunc(ArrayAvg(ultimos_5_tiempos))

        // Escribiendo el ao5 en el frontend
        const ao5_actual = document.getElementById("actual_ao5")
        ao5_actual.innerHTML = convertir_milisegundos(ao5_text)
    }
}

function ao12(tiempos_almacenados) {
    var tiempos = []
    for(i in tiempos_almacenados) {
        if(tiempos_almacenados[i].length == 9) {
            tiempos.push(tiempos_almacenados[i])
        }
    }

    if (tiempos.length >= 12) {
        ultimos_12_tiempos = [tiempos[tiempos.length-1], tiempos[tiempos.length-2], tiempos[tiempos.length-3], tiempos[tiempos.length-4], tiempos[tiempos.length-5], tiempos[tiempos.length-6], tiempos[tiempos.length-7], tiempos[tiempos.length-8], tiempos[tiempos.length-9], tiempos[tiempos.length-10], tiempos[tiempos.length-11], tiempos[tiempos.length-12]]
        
        ultimos_12_tiempos = ultimos_12_tiempos.filter(function(value, index, arr) {
            return value.charAt(0) !== "D"
        })

        console.log(ultimos_12_tiempos)

        // Pasando los numeros a milisegundos
        for(i in ultimos_12_tiempos) {
            tiempo_en_milisegundos = 0
            x = ultimos_12_tiempos[i]
            tiempo_en_milisegundos += parseInt(x.charAt(6) + x.charAt(7) + x.charAt(8)) + parseInt(x.charAt(3) + x.charAt(4))*1000 + parseInt(x.charAt(0) + x.charAt(1))*60000
            ultimos_12_tiempos[i] = tiempo_en_milisegundos
        }

        // eliminando el mayor y el menor numero
        var min = Math.min(...ultimos_12_tiempos);
        var max = Math.max(...ultimos_12_tiempos);

        ultimos_12_tiempos.splice(ultimos_12_tiempos.indexOf(min), 1);
        ultimos_12_tiempos.splice(ultimos_12_tiempos.indexOf(max), 1);

        // haciendo la media de los tres numeros
        ao12_text = Math.trunc(ArrayAvg(ultimos_12_tiempos))

        // Escribiendo el ao5 en el frontend
        const ao12_actual = document.getElementById("actual_ao12")
        ao12_actual.innerHTML = convertir_milisegundos(ao12_text)
    }
}

function mo3(tiempos_almacenados) {
    var tiempos = []
    for(i in tiempos_almacenados) {
        if(tiempos_almacenados[i].length == 9) {
            tiempos.push(tiempos_almacenados[i])
        }
    }

    if (tiempos.length >= 3) {
        ultimos_3_tiempos = [tiempos[tiempos.length-1], tiempos[tiempos.length-2], tiempos[tiempos.length-3]]

        ultimos_3_tiempos = ultimos_3_tiempos.filter(function(value, index, arr) {
            return value.charAt(0) !== "D"
        })
        
        // Pasando los numeros a milisegundos
        for(i in ultimos_3_tiempos) {
            tiempo_en_milisegundos = 0
            x = ultimos_3_tiempos[i]
            tiempo_en_milisegundos += parseInt(x.charAt(6) + x.charAt(7) + x.charAt(8)) + parseInt(x.charAt(3) + x.charAt(4))*1000 + parseInt(x.charAt(0) + x.charAt(1))*60000
            ultimos_3_tiempos[i] = tiempo_en_milisegundos
        }

        // haciendo la media de los tres numeros
        mo3_text = Math.trunc(ArrayAvg(ultimos_3_tiempos))

        // Escribiendo el ao5 en el frontend
        const mo3_actual = document.getElementById("actual_mo3")
        mo3_actual.innerHTML = convertir_milisegundos(mo3_text)
    }
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
    ao5(tiempos_almacenados)
    ao12(tiempos_almacenados)
    mo3(tiempos_almacenados)
    
    resultado = document.getElementById('crono').innerHTML
    mezcla_resultado = document.getElementById('scramble').innerHTML
    num = tiempos_almacenados.length
    mostrar_datos(resultado, mezcla_resultado, num)
    tiempos_almacenados.push(resultado, mezcla_resultado)
    localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
}

function mostrar_datos(tiempo, mezcla, index) {
    if(mezcla.charAt(mezcla.length-2) + mezcla.charAt(mezcla.length-1) !== "+2" && tiempo.charAt(0) !== "D") {
        document.getElementById("lista_tiempos").innerHTML = 
        '<button id="boton_borrar_tiempo" onclick="borrar_tiempo(' +
        index +
        ')" focusable="false"><img src="img/minitrash.png" alt="basura">' +
        '<button id="mostrar_scramble" onclick="mostrar_scramble(' + index + ')" focusable="false"><p>scramble</p></button>' +
        '</button><button id="plus_two" onclick="plus_two(' +
        index +
        ')" focusable="false"><p>+2</p></button><button id="dnf" onclick="dnf('
        + index +
        ')" focusable="false"><p>DNF</p></button><div id="tiempo"><p id="tiempo_tiempo">' +
        tiempo +
        '</p>' +
        '<p id="tiempo_scramble">' + mezcla + '</p></div>' +
        document.getElementById("lista_tiempos").innerHTML
    } else if(mezcla.charAt(mezcla.length-2) + mezcla.charAt(mezcla.length-1) === "+2") {
        document.getElementById("lista_tiempos").innerHTML = 
        '<button id="boton_borrar_tiempo" onclick="borrar_tiempo(' +
        index +
        ')" focusable="false"><img src="img/minitrash.png" alt="basura">' +
        '<button id="mostrar_scramble" onclick="mostrar_scramble(' + index + ')" focusable="false"><p>scramble</p></button>' +
        '</button><button id="plus_two_added" onclick="plus_two(' +
        index +
        ')" focusable="false"><p>+2</p></button><button id="dnf" onclick="dnf('
        + index +
        ')" focusable="false"><p>DNF</p></button><div id="tiempo"><p id="tiempo_tiempo">' +
        tiempo +
        '</p>' +
        '<p id="tiempo_scramble">' + mezcla.replace("+2", "") + '</p></div>' +
        document.getElementById("lista_tiempos").innerHTML
    } else if(tiempo.charAt(0) === "D") {
        document.getElementById("lista_tiempos").innerHTML = 
        '<button id="boton_borrar_tiempo" onclick="borrar_tiempo(' +
        index +
        ')" focusable="false"><img src="img/minitrash.png" alt="basura">' +
        '<button id="mostrar_scramble" onclick="mostrar_scramble(' + index + ')" focusable="false"><p>scramble</p></button>' +
        '</button><button id="plus_two" onclick="plus_two(' +
        index +
        ')" focusable="false"><p>+2</p></button><button id="dnf_true" onclick="dnf('
        + index +
        ')" focusable="false"><p>DNF</p></button><div id="tiempo"><p id="tiempo_tiempo">' +
        "DNF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        '</p>' +
        '<p id="tiempo_scramble">' + mezcla + '</p></div>' +
        document.getElementById("lista_tiempos").innerHTML
    }
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
        document.getElementById("lista_tiempos").innerHTML = ''

        //Borramos y volvemos a poner el boton para que al pulsarr espacio no se pulse
        document.getElementById("div_borrar_tiempos").innerHTML = ''
        document.getElementById("div_borrar_tiempos").innerHTML = '<button id="boton_borrar_tiempos" onclick="borrar_tiempos()" focusable="false"><img src="img/trash.png" alt="basura"></button>'
    }
}

function borrar_tiempo(index) {
    tiempos_almacenados.splice(index, 1)
    tiempos_almacenados.splice(index, 1)
    localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
    mostrar_array_de_datos(tiempos_almacenados)
}

function plus_two(index) {
    tiempo = tiempos_almacenados[index]
    scramble = tiempos_almacenados[index + 1]
    console.log(tiempo)
    if (tiempo.charAt(0) !== "D" && scramble.charAt(scramble.length-2) + scramble.charAt(scramble.length-1) !== "+2") {
        segundos = tiempo.charAt(3) + tiempo.charAt(4)
        segundos_mas_dos = (parseInt(segundos) + 2).toString()
        if (parseInt(segundos_mas_dos) > 59) {
            minutos = tiempo.charAt(0) + tiempo.charAt(1)
            minutos_mas_uno = (parseInt(minutos) + 1).toString()
            segundos_mas_dos = (parseInt(segundos_mas_dos) - 60).toString()
            if (parseInt(segundos_mas_dos) < 10) { segundos_mas_dos = "0" + segundos_mas_dos }
            if (parseInt(minutos_mas_uno) < 10) { minutos_mas_uno = "0" + minutos_mas_uno }
            tiempo = minutos_mas_uno[0] + minutos_mas_uno[1] + tiempo[2] + segundos_mas_dos[0] + segundos_mas_dos[1] + tiempo[5] + tiempo[6] + tiempo[7] + tiempo[8]
        } else {
            if (parseInt(segundos_mas_dos) < 10) { segundos_mas_dos = "0" + segundos_mas_dos }
            tiempo = tiempo[0] + tiempo[1] + tiempo[2] + segundos_mas_dos[0] + segundos_mas_dos[1] + tiempo[5] + tiempo[6] + tiempo[7] + tiempo[8]
        }
        tiempos_almacenados[index] = tiempo
        tiempos_almacenados[index+1] = tiempos_almacenados[index+1] + "+2"
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
        mostrar_array_de_datos(tiempos_almacenados)
    } else if(tiempo.charAt(0) !== "D") {
        segundos = tiempo.charAt(3) + tiempo.charAt(4)
        segundos_mas_dos = (parseInt(segundos) - 2).toString()
        if (parseInt(segundos_mas_dos) > 59) {
            minutos = tiempo.charAt(0) + tiempo.charAt(1)
            minutos_mas_uno = (parseInt(minutos) + 1).toString()
            segundos_mas_dos = (parseInt(segundos_mas_dos) - 60).toString()
            if (parseInt(segundos_mas_dos) < 10) { segundos_mas_dos = "0" + segundos_mas_dos }
            if (parseInt(minutos_mas_uno) < 10) { minutos_mas_uno = "0" + minutos_mas_uno }
            tiempo = minutos_mas_uno[0] + minutos_mas_uno[1] + tiempo[2] + segundos_mas_dos[0] + segundos_mas_dos[1] + tiempo[5] + tiempo[6] + tiempo[7] + tiempo[8]
        } else {
            if (parseInt(segundos_mas_dos) < 10) { segundos_mas_dos = "0" + segundos_mas_dos }
            tiempo = tiempo[0] + tiempo[1] + tiempo[2] + segundos_mas_dos[0] + segundos_mas_dos[1] + tiempo[5] + tiempo[6] + tiempo[7] + tiempo[8]
        }
        tiempos_almacenados[index] = tiempo
        tiempos_almacenados[index+1] = tiempos_almacenados[index+1].replace("+2", "")
        localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
        mostrar_array_de_datos(tiempos_almacenados)
    }
}

function dnf(index) {
    scramble = tiempos_almacenados[index+1]
    if(tiempos_almacenados[index].charAt(0) !== "D") {
        if(scramble.charAt(scramble.length-2) + scramble.charAt(scramble.length-1) !== "+2") {
            tiempos_almacenados[index] = "DNF" + tiempos_almacenados[index]
            localStorage.setItem('tiempos_almacenados', tiempos_almacenados)
            mostrar_array_de_datos(tiempos_almacenados)
        }
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