async function validateLogin(credentials) {
    try {
        const { username, password, role } = credentials;
        
        if (!username || !password || !role) {
            throw new Error('Credenciales incompletas');
        }

        // For testing purposes - allow any credentials
        // In production, this would validate against real database
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        
        // Log access for demo
        await logAccess(username, role);
        
        return true;
    } catch (error) {
        console.error('Authentication validateLogin error:', error);
        throw new Error('Error durante la validación de credenciales');
    }
}

async function validateAdminLogin(credentials) {
    try {
        const { username, password } = credentials;
        
        if (!username || !password) {
            throw new Error('Credenciales de administrador incompletas');
        }

        // For testing purposes - allow any admin credentials
        // In production, this would validate against real database
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        
        // Log admin access
        await logAccess(username, 'admin');
        
        return true;
    } catch (error) {
        console.error('Authentication validateAdminLogin error:', error);
        throw new Error('Error durante la validación de credenciales de administrador');
    }
}

function createUserSession(credentials) {
    try {
        const sessionData = {
            username: credentials.username,
            role: credentials.role,
            loginTime: new Date().toISOString(),
            sessionId: generateSessionId()
        };

        // Store session in localStorage for demo purposes
        localStorage.setItem('userSession', JSON.stringify(sessionData));
        
        return sessionData;
    } catch (error) {
        console.error('Authentication createUserSession error:', error);
        throw new Error('Error al crear sesión de usuario');
    }
}

function getUserSession() {
    try {
        const sessionData = localStorage.getItem('userSession');
        return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
        console.error('Authentication getUserSession error:', error);
        return null;
    }
}

function clearUserSession() {
    try {
        localStorage.removeItem('userSession');
        return true;
    } catch (error) {
        console.error('Authentication clearUserSession error:', error);
        return false;
    }
}

function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function isValidSession(session) {
    try {
        if (!session || !session.sessionId || !session.username || !session.role) {
            return false;
        }

        // Check if session is not older than 24 hours
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        return hoursDiff < 24;
    } catch (error) {
        console.error('Authentication isValidSession error:', error);
        return false;
    }
}
