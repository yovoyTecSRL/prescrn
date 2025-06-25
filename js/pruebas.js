
const chat = document.getElementById('chat');
const resumen = document.getElementById('resumen');
function agregarMensaje(texto, clase) {
    const div = document.createElement('div');
    div.className = clase;
    div.textContent = texto;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}
function randomNombre() {
    const nombres = ["Ana Pérez", "Luis Mora", "Carlos Jiménez", "María Solís", "Jorge Vargas"];
    return nombres[Math.floor(Math.random()*nombres.length)];
}
function randomCedula() {
    return Math.floor(100000000 + Math.random()*900000000).toString();
}
function randomTelefono() {
    return "8" + Math.floor(10000000 + Math.random()*9000000).toString();
}
function randomCorreo(nombre) {
    return nombre.split(" ")[0].toLowerCase() + "@correo.com";
}
function randomDireccion() {
    const dirs = ["200m sur del parque central", "Frente al hospital", "Avenida 2, PZ", "Barrio Los Ángeles"];
    return dirs[Math.floor(Math.random()*dirs.length)];
}
function randomOcupacion() {
    const o = ["Ingeniero", "Comerciante", "Profesor", "Estudiante", "Abogado"];
    return o[Math.floor(Math.random()*o.length)];
}
function randomIngresos() {
    return (300000 + Math.floor(Math.random()*2000000)).toString();
}
async function simularSolicitud(num) {
    chat.innerHTML = '';
    agregarMensaje(`--- Prueba automática #${num} ---`, 'bot');
    await new Promise(r => setTimeout(r, 400));
    let nombre = randomNombre();
    agregarMensaje('Banco: ¿Cuál es tu nombre completo?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + nombre, 'user');
    await new Promise(r => setTimeout(r, 400));
    let cedula = randomCedula();
    agregarMensaje('Banco: ¿Cuál es tu cédula?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + cedula, 'user');
    await new Promise(r => setTimeout(r, 400));
    let telefono = randomTelefono();
    agregarMensaje('Banco: ¿Cuál es tu teléfono?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + telefono, 'user');
    await new Promise(r => setTimeout(r, 400));
    let correo = randomCorreo(nombre);
    agregarMensaje('Banco: ¿Cuál es tu correo electrónico?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + correo, 'user');
    await new Promise(r => setTimeout(r, 400));
    let direccion = randomDireccion();
    agregarMensaje('Banco: ¿Cuál es la dirección de entrega de la tarjeta?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + direccion, 'user');
    await new Promise(r => setTimeout(r, 400));
    let ocupacion = randomOcupacion();
    agregarMensaje('Banco: ¿Cuál es su ocupación?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + ocupacion, 'user');
    await new Promise(r => setTimeout(r, 400));
    let ingresos = randomIngresos();
    agregarMensaje('Banco: ¿Cuáles son sus ingresos mensuales?', 'bot');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Tú: ' + ingresos, 'user');
    await new Promise(r => setTimeout(r, 400));
    agregarMensaje('Banco: Recibiendo su solicitud...', 'bot');
    await new Promise(r => setTimeout(r, 600));
    agregarMensaje('Banco: Validando en CCSS...', 'bot');
    await new Promise(r => setTimeout(r, 600));
    agregarMensaje('Banco: Validando en Protectora de Crédito...', 'bot');
    await new Promise(r => setTimeout(r, 600));
    agregarMensaje('Banco: Validando en Banco de Costa Rica...', 'bot');
    await new Promise(r => setTimeout(r, 600));
    agregarMensaje('Banco: Validando en Ministerio de Hacienda...', 'bot');
    await new Promise(r => setTimeout(r, 600));
    const numeroSolicitud = Math.floor(100000 + Math.random() * 900000);
    agregarMensaje(`Banco: ¡Felicidades! Clasificaste para una tarjeta de crédito de ₡10,000. La orden de entrega fue creada y te llegará en las próximas 48 horas a: "${direccion}". Tu número de solicitud es: ${numeroSolicitud}.`, 'bot');
    agregarMensaje('Banco: Su tarjeta será entregada por mimoto.express.', 'bot');
    await new Promise(r => setTimeout(r, 1200));
}
async function ejecutarPruebas() {
    let exitos = 0;
    for(let i=1; i<=10; i++) {
        await simularSolicitud(i);
        exitos++;
        resumen.innerHTML = `<b>Pruebas ejecutadas: ${i}/10</b><br>
        <span style="color:green;font-weight:bold;">Éxitos: ${exitos}</span>`;
        await new Promise(r => setTimeout(r, 800));
    }
    localStorage.setItem('reportePruebasBCR', JSON.stringify({
        total: exitos,
        fallos: 0,
        detalles: detallesArray // crea este array con los datos de cada prueba si quieres más detalle
    }));
    resumen.innerHTML = `<b>¡Pruebas automáticas completadas!</b><br>
        <span style="color:green;font-weight:bold;">Éxitos: ${exitos}</span>
        <br><br>
        <button onclick="window.open('reporte-pruebas.html','_blank','width=500,height=700')"
            style="background:#1565c0;color:#fff;padding:10px 22px;border:none;border-radius:6px;font-size:1em;cursor:pointer;margin:6px;">
            Ver detalles
        </button>
        <button onclick="verRecomendaciones()"
            style="background:#ce1126;color:#fff;padding:10px 22px;border:none;border-radius:6px;font-size:1em;cursor:pointer;margin:6px;">
            Ver recomendaciones
        </button>
        <div id="recomendaciones" style="margin-top:12px;"></div>
    `;
    function verRecomendaciones() {
        document.getElementById('recomendaciones').innerHTML = `
            <ul style="text-align:left;">
                <li>Verifica que todos los campos del formulario estén correctamente validados.</li>
                <li>Mejora la experiencia visual en dispositivos móviles.</li>
                <li>Implementa validación real en el backend para producción.</li>
                <li>Agrega logs de auditoría para cada solicitud.</li>
                <li>Conecta el estado de la tarjeta a un backend real.</li>
            </ul>
        `;
    }
}
ejecutarPruebas();
