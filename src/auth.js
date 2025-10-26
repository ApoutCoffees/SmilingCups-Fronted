import { ref, readonly } from 'vue';

// Reactive state for the logged-in user's ID and type
const loggedInUserId = ref(null);
const loggedInUserType = ref(null);

// Function to set the user on login
function setUser(user) {
    if (user && user.id) {
        loggedInUserId.value = user.id;
        loggedInUserType.value = user.type; // Store the user type (customer/producer)
        // Optional: Store in localStorage to persist login across page refreshes
        localStorage.setItem('loggedInUserId', user.id);
        localStorage.setItem('loggedInUserType', user.type);
    } else {
        loggedInUserId.value = null;
        loggedInUserType.value = null;
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserType');
    }
}

// Function to clear the user on logout
function clearUser() {
    setUser(null);
}

// Function to check if user is logged in (reads from localStorage initially)
function checkInitialAuthState() {
    const storedId = localStorage.getItem('loggedInUserId');
    const storedType = localStorage.getItem('loggedInUserType');
    if (storedId && storedType) {
        loggedInUserId.value = parseInt(storedId, 10); // Ensure it's a number
        loggedInUserType.value = storedType;
    }
}

// Export the state (read-only) and functions
export function useAuth() {
    return {
        loggedInUserId: readonly(loggedInUserId),
        loggedInUserType: readonly(loggedInUserType),
        setUser,
        clearUser,
        checkInitialAuthState
    };
}