import { BaseApi } from "../../shared/infrastructure/BaseApi.js";

class IamApi extends BaseApi {
    constructor() {
        super();
        this.endpoint = '/users';
    }

    getUsers() {
        return this.http.get(this.endpoint);
    }

    getUserById(id) {
        return this.http.get(`${this.endpoint}?id=${id}`);
    }

    login(email, password) {
        return this.http.get(`${this.endpoint}?email=${email}&password=${password}`);
    }

    createUser(userResource) {
        return this.http.post(this.endpoint, userResource);
    }
}

export default new IamApi();