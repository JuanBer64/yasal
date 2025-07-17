function AdminDashboard({ user, onLogout }) {
    try {
        const [currentView, setCurrentView] = React.useState('dashboard');

        React.useEffect(() => {
            lucide.createIcons();
        }, [currentView]);

        const modules = [
            { id: 'access-logs', title: 'Registro de Accesos', icon: 'activity', description: 'Ver accesos de usuarios' },
            { id: 'module-config', title: 'Configurar Módulos', icon: 'settings', description: 'Activar/desactivar módulos' },
            { id: 'customization', title: 'Personalización', icon: 'palette', description: 'Personalizar apariencia del sistema' },
            { id: 'system-config', title: 'Configuración Sistema', icon: 'cog', description: 'Configuración general' }
        ];

        const handleModuleClick = (moduleId) => {
            setCurrentView(moduleId);
        };

        const handleBackToDashboard = () => {
            setCurrentView('dashboard');
        };

        if (currentView === 'module-config') {
            return (
                <div className="container mx-auto px-4 py-8" data-name="admin-dashboard" data-file="components/AdminDashboard.js">
                    <ModuleManager onBack={handleBackToDashboard} />
                </div>
            );
        }

        if (currentView === 'customization') {
            return (
                <div className="container mx-auto px-4 py-8" data-name="admin-dashboard" data-file="components/AdminDashboard.js">
                    <CustomizationSettings onBack={handleBackToDashboard} />
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 py-8" data-name="admin-dashboard" data-file="components/AdminDashboard.js">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Panel de Administrador
                        </h1>
                        <p className="text-white text-opacity-80">Superusuario: {user.username}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <i data-lucide="log-out" className="w-4 h-4"></i>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className="dashboard-card p-6 rounded-xl cursor-pointer"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                                <i data-lucide={module.icon} className="w-6 h-6 text-red-600"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminDashboard component error:', error);
        reportError(error);
    }
}
