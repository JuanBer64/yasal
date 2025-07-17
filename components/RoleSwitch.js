function RoleSwitch({ selectedRole, onRoleChange, roleType = 'main', showAdminOption = false }) {
    try {
        const roleConfigs = {
            'main': {
                roles: ['student', 'teacher'],
                labels: ['Estudiante', 'Docente'],
                defaultSelected: 'student'
            },
            'admin': {
                roles: showAdminOption ? ['admin'] : ['coordinator', 'staff'],
                labels: showAdminOption ? ['Administrador'] : ['Coordinador', 'Administrativo'],
                defaultSelected: showAdminOption ? 'admin' : 'coordinator'
            }
        };

        const config = roleConfigs[roleType];
        const [currentIndex, setCurrentIndex] = React.useState(
            config.roles.indexOf(selectedRole) >= 0 ? config.roles.indexOf(selectedRole) : 0
        );

        React.useEffect(() => {
            const index = config.roles.indexOf(selectedRole);
            if (index >= 0) {
                setCurrentIndex(index);
            } else if (showAdminOption && selectedRole !== 'admin') {
                // If showAdminOption is true, force admin role
                setCurrentIndex(0);
                onRoleChange('admin');
            } else if (!showAdminOption && selectedRole === 'admin') {
                // If admin role selected but not available, reset to coordinator
                setCurrentIndex(0);
                onRoleChange('coordinator');
            }
        }, [selectedRole, config.roles, showAdminOption, onRoleChange]);

        // Update config when showAdminOption changes
        React.useEffect(() => {
            if (roleType === 'admin') {
                const newConfig = roleConfigs[roleType];
                const currentRoleIndex = newConfig.roles.indexOf(selectedRole);
                if (currentRoleIndex >= 0) {
                    setCurrentIndex(currentRoleIndex);
                }
            }
        }, [showAdminOption, selectedRole, roleType]);

        const handleRoleChange = (index) => {
            setCurrentIndex(index);
            onRoleChange(config.roles[index]);
        };

        if (roleType === 'main') {
            const isChecked = currentIndex === 1;
            const handleToggle = () => {
                const newIndex = isChecked ? 0 : 1;
                handleRoleChange(newIndex);
            };

            return (
                <div className="role-switch-wrapper" data-name="role-switch" data-file="components/RoleSwitch.js">
                    <label className="role-switch-label" htmlFor={`roleToggle-${roleType}`}>
                        <input
                            type="checkbox"
                            id={`roleToggle-${roleType}`}
                            checked={isChecked}
                            onChange={handleToggle}
                            className="role-switch-input"
                        />
                        <span className="role-option">{config.labels[0]}</span>
                        <span className="role-option">{config.labels[1]}</span>
                    </label>
                </div>
            );
        }

        if (roleType === 'admin') {
            const totalOptions = config.roles.length;
            const widthPercentage = 100 / totalOptions;
            
            // If only admin option, show single button style
            if (showAdminOption && config.roles.length === 1) {
                return (
                    <div className="role-switch-wrapper" data-name="role-switch" data-file="components/RoleSwitch.js">
                        <div className="admin-switch">
                            <button
                                type="button"
                                className="admin-option active text-red-200 font-bold w-full"
                            >
                                {config.labels[0]}
                            </button>
                            <div 
                                className="admin-slider" 
                                style={{ 
                                    left: '0%',
                                    width: '100%'
                                }}
                            ></div>
                        </div>
                    </div>
                );
            }
            
            return (
                <div className="role-switch-wrapper" data-name="role-switch" data-file="components/RoleSwitch.js">
                    <div className="admin-switch">
                        {config.labels.map((label, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleRoleChange(index)}
                                className={`admin-option ${currentIndex === index ? 'active' : ''}`}
                            >
                                {label}
                            </button>
                        ))}
                        <div 
                            className="admin-slider" 
                            style={{ 
                                left: `${(currentIndex * widthPercentage)}%`,
                                width: `${widthPercentage}%`
                            }}
                        ></div>
                    </div>
                </div>
            );
        }

        return null;
    } catch (error) {
        console.error('RoleSwitch component error:', error);
        reportError(error);
    }
}
