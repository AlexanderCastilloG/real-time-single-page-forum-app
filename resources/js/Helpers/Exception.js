import User from './User';

class ExceptionC {

    handle(error) {
        this.isExpired(error.response.data.error);
    }

    isExpired(error) {
        if (error == 'Token is expired') {
            User.logout();
        }
    }
}
const Exception = new ExceptionC();

export default Exception;