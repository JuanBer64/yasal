function RoleSelector({ selectedRole, onRoleChange, showAdminTrigger }) {
    try {
        const roles = [
            { id: 'student', label: 'Alumno', icon: 'graduation-cap' },
            { id: 'teacher', label: 'Docente', icon: 'user-check' },
            { id: 'staff', label: 'Administrativo', icon: 'briefcase' }
        ];

        React.useEffect(() => {
            const timer = setTimeout(() => {
                if (window.lucide) {
                    lucide.createIcons();
                }
            }, 100);
            return () => clearTimeout(timer);
        }, [selectedRole, showAdminTrigger]);

        const handleRoleClick = (roleId) => {
            onRoleChange(roleId);
        };

        return (
            <div className="space-y-3" data-name="role-selector" data-file="components/RoleSelector.js">
                <label className="block text-sm font-medium text-white mb-2">
                    Tipo de Usuario
                </label>
                
                <div className="grid grid-cols-1 gap-2">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            type="button"
                            onClick={() => handleRoleClick(role.id)}
                            className={`role-switch flex items-center justify-between p-3 rounded-lg transition-all ${
                                selectedRole === role.id ? 'active' : ''
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <i data-lucide={role.icon} className="w-4 h-4"></i>
                                <span className="text-sm font-medium">{role.label}</span>
                            </div>
                            {selectedRole === role.id && (
                                <i data-lucide="check" className="w-4 h-4"></i>
                            )}
                        </button>
                    ))}
                </div>

                {showAdminTrigger && (
                    <button
                        type="button"
                        onClick={() => handleRoleClick('admin')}
                        className={`admin-trigger ${showAdminTrigger ? 'visible' : ''} role-switch flex items-center justify-between p-2 rounded-lg transition-all mt-4 ${
                            selectedRole === 'admin' ? 'active' : ''
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <i data-lucide="shield" className="w-4 h-4"></i>
                            <span className="text-xs font-medium">Acceso Administrativo</span>
                        </div>
                        {selectedRole === 'admin' && (
                            <i data-lucide="check" className="w-4 h-4"></i>
                        )}
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('RoleSelector component error:', error);
        reportError(error);
    }
}
