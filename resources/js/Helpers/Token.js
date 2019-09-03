class TokenC {

    isValid(token) {
        const payload = this.payload(token);

        if (payload) {
            return payload.iss == 'http://localhost:8000/api/auth/login' ? true : false;
        }

        return false;
    }

    payload(token) {
        //split ->te devuelve un array con los elmentos, dependiendo el separador
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload) {
        // atob ->descodifica una cadena, te devuelve en formato JSON, solo el payload
        return JSON.parse(atob(payload));
    }
}

const Token = new TokenC();

export default Token;