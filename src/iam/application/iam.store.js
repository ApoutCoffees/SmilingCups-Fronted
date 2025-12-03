import { reactive } from "vue";
import { iamApi } from "../infrastructure/iamApi.js";
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
            localStorage.removeItem('authToken');
        }
    },

    /**
     * Authenticates the user and retrieves profile data.
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        state.errors = [];
        try {
            // Paso 1: Obtener Token
            const loginResponse = await iamApi.login(email, password);

            if (loginResponse && loginResponse.token) {
                localStorage.setItem('authToken', loginResponse.token);

                // Paso 2: Obtener datos completos del usuario usando el token
                const userProfile = await iamApi.getUserById(loginResponse.id);
                const userEntity = UserAssembler.toEntityFromResource(userProfile);

                this.setCurrentUser(userEntity);
                return true;
            } else {
                state.errors.push("Login failed: No token received");
                return false;
            }
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || "Invalid credentials";
            state.errors.push(msg);
            return false;
        }
    },

    async register(userData) {
        state.errors = [];
        try {
            await iamApi.createUser(userData);
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            state.errors.push(msg);
            return false;
        }
    },

    logout() {
        this.setCurrentUser(null);
    },

    checkInitialAuthState() {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');

        if (storedUser && token) {
            try {
                const user = JSON.parse(storedUser);
                state.currentUser = UserAssembler.toEntityFromResource(user);
                state.isAuthenticated = true;
            } catch (e) {
                this.logout();
            }
        } else {
            this.logout();
        }
    }
};

export const useAuth = () => iamStore;