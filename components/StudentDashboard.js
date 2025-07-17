function StudentDashboard({ user, onLogout }) {
    try {
        const [availableModules, setAvailableModules] = React.useState([]);
        const [currentModule, setCurrentModule] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(true);

        const allModules = [
            { id: 'grades', title: 'Calificaciones', icon: 'award', description: 'Ver mis calificaciones y promedios' },
            { id: 'schedule', title: 'Horarios', icon: 'calendar', description: 'Consultar horarios de clases' },
            { id: 'teachers', title: 'Profesores', icon: 'users', description: 'Información de mis profesores' },
            { id: 'assignments', title: 'Tareas', icon: 'clipboard-list', description: 'Tareas y trabajos pendientes' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadModules();
        }, []);

        const loadModules = async () => {
            try {
                const activeModuleIds = await getModuleConfig('student');
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
                case 'grades':
                    return React.createElement(StudentGrades, { onBack: handleBackToDashboard });
                case 'schedule':
                    return React.createElement(StudentSchedule, { onBack: handleBackToDashboard });
                case 'teachers':
                    return React.createElement(StudentTeachers, { onBack: handleBackToDashboard });
                case 'assignments':
                    return React.createElement(StudentAssignments, { onBack: handleBackToDashboard });
                default:
                    return null;
            }
        };

        if (currentModule) {
            return (
                <div className="container mx-auto px-4 py-8" data-name="student-dashboard" data-file="components/StudentDashboard.js">
                    {renderModule()}
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="container mx-auto px-4 py-8 flex items-center justify-center" data-name="student-dashboard" data-file="components/StudentDashboard.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 py-8" data-name="student-dashboard" data-file="components/StudentDashboard.js">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Bienvenido, {user.username}
                        </h1>
                        <p className="text-white text-opacity-80">Panel de Estudiante</p>
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
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                                <i data-lucide={module.icon} className="w-6 h-6 text-blue-600"></i>
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
        console.error('StudentDashboard component error:', error);
        reportError(error);
    }
}
