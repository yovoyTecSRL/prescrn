
const reporte = JSON.parse(localStorage.getItem('reportePruebasBCR') || '{"total":0,"fallos":0,"detalles":[]}');
document.getElementById('estadistica').innerHTML = `
    <b>Total de pruebas:</b> ${reporte.total}<br>
    <span style="color:green;"><b>Éxitos:</b> ${reporte.total - reporte.fallos}</span> &nbsp; 
    <span style="color:red;"><b>Fallos:</b> ${reporte.fallos}</span>
`;
function mostrarDetalles() {
    document.getElementById('detalles').style.display = '';
    document.getElementById('recomendaciones').style.display = 'none';
    document.getElementById('detalles').innerHTML = reporte.detalles && reporte.detalles.length
        ? reporte.detalles.map((d,i) => `<b>Prueba ${i+1}:</b> ${d}`).join('<br>')
        : 'No hay detalles individuales disponibles.';
}
function mostrarRecomendaciones() {
    document.getElementById('detalles').style.display = 'none';
    document.getElementById('recomendaciones').style.display = '';
    document.getElementById('recomendaciones').innerHTML = `
        <ul>
            <li>Verifica que todos los campos del formulario estén correctamente validados.</li>
            <li>Mejora la experiencia visual en dispositivos móviles.</li>
            <li>Implementa validación real en el backend para producción.</li>
            <li>Agrega logs de auditoría para cada solicitud.</li>
            <li>Conecta el estado de la tarjeta a un backend real.</li>
        </ul>
    `;
}