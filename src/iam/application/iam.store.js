import { ref, readonly } from 'vue';


const loggedInUserId = ref(null);
const loggedInUserType = ref(null);


function setUser(user) {
    if (user && user.id) {
        loggedInUserId.value = user.id;
        loggedInUserType.value = user.type;
        localStorage.setItem('loggedInUserId', user.id);
        localStorage.setItem('loggedInUserType', user.type);
    } else {
        loggedInUserId.value = null;
        loggedInUserType.value = null;
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserType');
    }
}


function clearUser() {
    setUser(null);
}


function checkInitialAuthState() {
    const storedId = localStorage.getItem('loggedInUserId');
    const storedType = localStorage.getItem('loggedInUserType');
    if (storedId && storedType) {
        loggedInUserId.value = parseInt(storedId, 10);
        loggedInUserType.value = storedType;
    }
}

// Export
export function useAuth() {
    return {
        loggedInUserId: readonly(loggedInUserId),
        loggedInUserType: readonly(loggedInUserType),
        setUser,
        clearUser,
        checkInitialAuthState
    };
}