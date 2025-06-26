/**
 * Envía un mensaje al servidor Node.js que gestiona la API de OpenAI.
 * @param {string} mensaje - Texto ingresado por el usuario.
 * @param {Array<{role: string, content: string}>} historial - (Opcional) Historial de mensajes para mantener el contexto.
 * @returns {Promise<string>} Respuesta generada por el modelo.
 */
export async function enviarMensaje(mensaje, historial = []) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje, historial })
      });
  
      if (!response.ok) {
        console.error('Error en /api/chat:', await response.text());
        return 'Lo siento, hubo un error al procesar tu solicitud.';
      }
  
      const data = await response.json();
      return data.respuesta;
    } catch (error) {
      console.error('Error de red al llamar a /api/chat:', error);
      return 'Lo siento, no pude conectarme al servicio de asistencia.';
    }
  }
  
