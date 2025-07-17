// Simulated MongoDB operations for demo purposes
const mockDatabase = {
    users: [
        { username: 'estudiante1', password: 'pass123', role: 'student', name: 'Juan Pérez' },
        { username: 'profesor1', password: 'pass123', role: 'teacher', name: 'María García' },
        { username: 'coordinador1', password: 'pass123', role: 'staff', name: 'Carlos López' },
        { username: 'admin1', password: 'pass123', role: 'staff', name: 'Ana Martínez' },
        { username: 'superadmin', password: 'admin2024', role: 'admin', name: 'Administrador Sistema' }
    ],
    accessLogs: [],
    moduleConfig: {
        student: ['grades', 'schedule', 'teachers', 'assignments'],
        teacher: ['attendance', 'schedule', 'classes', 'grades'],
        staff: ['groups', 'approvals', 'reports', 'enrollment'],
        coordinator: ['groups', 'approvals', 'reports', 'enrollment'], // Same as staff
        admin: ['access-logs', 'module-config', 'customization', 'system-config']
    }
};

async function findUser(username, role) {
    try {
        // Simulate database query delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Map coordinator to staff for internal lookup
        const searchRole = role === 'coordinator' ? 'staff' : role;
        
        return mockDatabase.users.find(user => 
            user.username === username && user.role === searchRole
        );
    } catch (error) {
        console.error('Database findUser error:', error);
        throw new Error('Error al consultar usuario en base de datos');
    }
}

async function logAccess(username, role, timestamp = new Date()) {
    try {
        const accessLog = {
            id: Date.now(),
            username,
            role,
            timestamp: timestamp.toISOString(),
            ip: '127.0.0.1' // Simulated IP
        };
        
        mockDatabase.accessLogs.push(accessLog);
        console.log('Access logged:', accessLog);
        
        return accessLog;
    } catch (error) {
        console.error('Database logAccess error:', error);
        throw new Error('Error al registrar acceso');
    }
}

async function getAccessLogs() {
    try {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...mockDatabase.accessLogs].reverse(); // Most recent first
    } catch (error) {
        console.error('Database getAccessLogs error:', error);
        throw new Error('Error al obtener registros de acceso');
    }
}

async function getModuleConfig(role) {
    try {
        await new Promise(resolve => setTimeout(resolve, 200));
        return mockDatabase.moduleConfig[role] || [];
    } catch (error) {
        console.error('Database getModuleConfig error:', error);
        throw new Error('Error al obtener configuración de módulos');
    }
}

async function updateModuleConfig(role, modules) {
    try {
        await new Promise(resolve => setTimeout(resolve, 400));
        mockDatabase.moduleConfig[role] = modules;
        return true;
    } catch (error) {
        console.error('Database updateModuleConfig error:', error);
        throw new Error('Error al actualizar configuración de módulos');
    }
}
