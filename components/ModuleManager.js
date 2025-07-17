function ModuleManager({ onBack }) {
    try {
        const [moduleConfig, setModuleConfig] = React.useState({});
        const [selectedRole, setSelectedRole] = React.useState('student');
        const [isLoading, setIsLoading] = React.useState(true);
        const [isSaving, setIsSaving] = React.useState(false);

        const allModules = {
            student: [
                { id: 'grades', title: 'Calificaciones', icon: 'award' },
                { id: 'schedule', title: 'Horarios', icon: 'calendar' },
                { id: 'teachers', title: 'Profesores', icon: 'users' },
                { id: 'assignments', title: 'Tareas', icon: 'clipboard-list' }
            ],
            teacher: [
                { id: 'attendance', title: 'Pase de Lista', icon: 'user-check' },
                { id: 'schedule', title: 'Horarios', icon: 'calendar' },
                { id: 'classes', title: 'Gestión de Clases', icon: 'book-open' },
                { id: 'grades', title: 'Calificaciones', icon: 'edit-3' }
            ],
            staff: [
                { id: 'groups', title: 'Gestión de Grupos', icon: 'users' },
                { id: 'approvals', title: 'Autorizaciones', icon: 'check-circle' },
                { id: 'reports', title: 'Reportes', icon: 'file-text' },
                { id: 'enrollment', title: 'Inscripciones', icon: 'user-plus' }
            ],
            coordinator: [
                { id: 'groups', title: 'Gestión de Grupos', icon: 'users' },
                { id: 'approvals', title: 'Autorizaciones', icon: 'check-circle' },
                { id: 'reports', title: 'Reportes', icon: 'file-text' },
                { id: 'enrollment', title: 'Inscripciones', icon: 'user-plus' }
            ]
        };

        React.useEffect(() => {
            lucide.createIcons();
            loadModuleConfig();
        }, []);

        const loadModuleConfig = async () => {
            try {
                setIsLoading(true);
                const config = {};
                for (const role of Object.keys(allModules)) {
                    config[role] = await getModuleConfig(role);
                }
                setModuleConfig(config);
            } catch (error) {
                console.error('Error loading module config:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const toggleModule = (moduleId) => {
            setModuleConfig(prev => {
                const currentModules = prev[selectedRole] || [];
                const updatedModules = currentModules.includes(moduleId)
                    ? currentModules.filter(id => id !== moduleId)
                    : [...currentModules, moduleId];
                
                return {
                    ...prev,
                    [selectedRole]: updatedModules
                };
            });
        };

        const saveChanges = async () => {
            try {
                setIsSaving(true);
                await updateModuleConfig(selectedRole, moduleConfig[selectedRole]);
                alert('Configuración guardada exitosamente');
            } catch (error) {
                alert('Error al guardar la configuración');
            } finally {
                setIsSaving(false);
            }
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="module-manager" data-file="components/ModuleManager.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
            );
        }

        const getRoleLabel = (role) => {
            switch (role) {
                case 'student': return 'Estudiantes';
                case 'teacher': return 'Docentes';
                case 'staff': return 'Administrativos';
                case 'coordinator': return 'Coordinadores';
                default: return role;
            }
        };

        return (
            <div className="space-y-6" data-name="module-manager" data-file="components/ModuleManager.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Configurar Módulos</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="flex space-x-4 mb-6">
                    {Object.keys(allModules).map(role => (
                        <button
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedRole === role 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                            }`}
                        >
                            {getRoleLabel(role)}
                        </button>
                    ))}
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">
                        Módulos para {getRoleLabel(selectedRole)}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allModules[selectedRole].map(module => (
                            <div
                                key={module.id}
                                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                    moduleConfig[selectedRole]?.includes(module.id)
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-300 bg-gray-50'
                                }`}
                                onClick={() => toggleModule(module.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <i data-lucide={module.icon} className="w-5 h-5 text-gray-600"></i>
                                        <span className="font-medium text-gray-800">{module.title}</span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        moduleConfig[selectedRole]?.includes(module.id)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-300'
                                    }`}>
                                        {moduleConfig[selectedRole]?.includes(module.id) && (
                                            <i data-lucide="check" className="w-4 h-4"></i>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={saveChanges}
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ModuleManager component error:', error);
        reportError(error);
    }
}
