class TokenC {

    isValid(token) {
        const payload = this.payload(token);

        if (payload) {
            return payload.iss == 'http://localhost:8000/api/auth/login' ||
                'http://localhost:8000/api/auth/signup' ? true : false;
        }

        return false;
    }

    payload(token) {
        //split ->te devuelve un array con los elmentos, dependiendo el separador
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload) {
        if (this.isBase64(payload)) {
            // atob ->descodifica una cadena, te devuelve en formato JSON, solo el payload
            return JSON.parse(atob(payload));
        }
        return false;
    }

    isBase64(str) {
        // console.log(btoa(atob(str)).replace(/=/g, ""));
        try {
            // 2+2 = 4 4/2=2
            // btoa ->codifica en Base64
            return btoa(atob(str)).replace(/=/g, "") == str;
        } catch (err) {
            return false;
        }
    }
}

const Token = new TokenC();

export default Token;