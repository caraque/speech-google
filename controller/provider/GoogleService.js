const speech = require('@google-cloud/speech');

/**
 * Provider para servicio de Google1
 */
class GoogleService {

    /**
     * @description Servicio para comunicación con API speech de google
     * @param base64
     * @param languageCode
     * @param encoding
     * @returns {Promise<string|boolean>}
     */
    async obtenerTexto(base64, languageCode, encoding) {
        try {
            /** Se realiza la creación del cliente de API **/
            const client = new speech.SpeechClient();
            /** Crea estructura para decodificación del audio**/
            const audio = {
                content: base64,
            };
            const config = {
                encoding: encoding,
                sampleRateHertz: 16000,
                languageCode: languageCode,
            };
            const request = {
                audio: audio,
                config: config,
            };
            /** Realiza la llamada a la API para decodificación del audio */
            const [response] = await client.recognize(request);
            /** Realiza la limpieza de la respuesta de la api y obtener texto del audio **/
            return response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
        } catch (exception) {
            console.error(exception.stack);
            return false;
        }
    }

}

module.exports = GoogleService;
