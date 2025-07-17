function TeacherDashboard({ user, onLogout }) {
    try {
        const [availableModules, setAvailableModules] = React.useState([]);
        const [currentModule, setCurrentModule] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(true);

        const allModules = [
            { id: 'attendance', title: 'Pase de Lista', icon: 'user-check', description: 'Registrar asistencia de alumnos' },
            { id: 'schedule', title: 'Horarios', icon: 'calendar', description: 'Ver horarios de clases' },
            { id: 'classes', title: 'Gestión de Clases', icon: 'book-open', description: 'Administrar contenido de clases' },
            { id: 'grades', title: 'Calificaciones', icon: 'edit-3', description: 'Capturar calificaciones' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadModules();
        }, []);

        const loadModules = async () => {
            try {
                const activeModuleIds = await getModuleConfig('teacher');
                const filteredModules = allModules.filter(module => 
                    activeModuleIds.includes(module.id)
                );
                setAvailableModules(filteredModules);
            } catch (error) {
                console.error('Error loading modules:', error);
                setAvailableModules(allModules);
            } finally {
                setIsLoading(false);
            }
        };

        const handleModuleClick = (moduleId) => {
            setCurrentModule(moduleId);
        };

        const handleBackToDashboard = () => {
            setCurrentModule(null);
        };

        const renderModule = () => {
            switch (currentModule) {
                case 'attendance':
                    return React.createElement(TeacherAttendance, { onBack: handleBackToDashboard });
                case 'schedule':
                    return React.createElement(TeacherSchedule, { onBack: handleBackToDashboard });
                case 'classes':
                    return React.createElement(TeacherClasses, { onBack: handleBackToDashboard });
                case 'grades':
                    return React.createElement(TeacherGrades, { onBack: handleBackToDashboard });
                default:
                    return null;
            }
        };

        if (currentModule) {
            return (
                <div className="container mx-auto px-4 py-8" data-name="teacher-dashboard" data-file="components/TeacherDashboard.js">
                    {renderModule()}
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="container mx-auto px-4 py-8 flex items-center justify-center" data-name="teacher-dashboard" data-file="components/TeacherDashboard.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 py-8" data-name="teacher-dashboard" data-file="components/TeacherDashboard.js">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Bienvenido, Prof. {user.username}
                        </h1>
                        <p className="text-white text-opacity-80">Panel de Docente</p>
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
                    {availableModules.map((module) => (
                        <div
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className="dashboard-card p-6 rounded-xl cursor-pointer"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                                <i data-lucide={module.icon} className="w-6 h-6 text-green-600"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                        </div>
                    ))}
                </div>

                {availableModules.length === 0 && (
                    <div className="text-center text-white mt-8">
                        <p>No hay módulos disponibles en este momento.</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('TeacherDashboard component error:', error);
        reportError(error);
    }
}
