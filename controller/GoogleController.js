const GoogleService = require('./provider/GoogleService');

/**
 * @description Servicio para obtener texto de audio
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.leerAudio = async (request, response) => {
    /** Objeto para respuesta del servicio **/
    const respuestaServicio = {
        error: null,
        mensaje: null
    };
    try {
        /** Valores Request (JSON) **/
        const audioBas64 = request.body.audioBase64;
        const languageCode = request.body.languageCode || "es-CL";
        /** Validación si los campos fueron recividos **/
        if (audioBas64 && languageCode) {
            const googleService = new GoogleService();
            let googleResponse = await googleService.obtenerTexto(audioBas64, languageCode, 'LINEAR16');
            /** Si no se logró obtener el texto del audio se intenta otra codificación **/
            if (!googleResponse) {
                googleResponse = await googleService.obtenerTexto(audioBas64, languageCode, 'OGG_OPUS');
            }
            respuestaServicio.error = false;
            respuestaServicio.mensaje = googleResponse;
        } else {
            respuestaServicio.error = true;
            respuestaServicio.mensaje = 'Parametros incompletos';
        }
    } catch (exception) {
        console.error('[leerAudio] Exception: ' + exception.stack);
        respuestaServicio.error = true;
        respuestaServicio.mensaje = exception.message;
    } finally {
        response.json(respuestaServicio);
    }
};
