import { reactive, computed } from "vue";
import iamApi from "../infrastructure/iamApi.js";
import { UserAssembler } from "../infrastructure/UserAssembler.js";

const state = reactive({
    currentUser: null,
    isAuthenticated: false,
    errors: [],
});

export const iamStore = {
    get currentUser() { return state.currentUser },
    get isAuthenticated() { return state.isAuthenticated },
    get errors() { return state.errors },

    setCurrentUser(user) {
        state.currentUser = user;
        state.isAuthenticated = !!user;
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    },

    async login(email, password) {
        state.errors = [];
        try {
            const response = await iamApi.login(email, password);
            const users = UserAssembler.toEntitiesFromResponse(response);

            if (users.length > 0) {
                this.setCurrentUser(users[0]);
                return true;
            } else {
                state.errors.push("Credenciales inválidas");
                return false;
            }
        } catch (error) {
            state.errors.push(error.message);
            return false;
        }
    },

    async register(userData) {
        state.errors = [];
        try {
            const response = await iamApi.createUser(userData);
            const newUser = UserAssembler.toEntityFromResource(response.data);
            this.setCurrentUser(newUser);
            return true;
        } catch (error) {
            state.errors.push(error.message);
            return false;
        }
    },

    logout() {
        this.setCurrentUser(null);
    },

    checkInitialAuthState() {
        const stored = localStorage.getItem('user');
        if (stored) {
            const user = UserAssembler.toEntityFromResource(JSON.parse(stored));
            this.setCurrentUser(user);
        }
    }
};

export const useAuth = () => iamStore;