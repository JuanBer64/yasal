function LoginForm({ onLogin, onShowAdminAccess, onShowCoordinatorAccess, onShowStaffAccess }) {
    try {
        const [credentials, setCredentials] = React.useState({
            username: '',
            password: '',
            role: 'student'
        });
        const [showPassword, setShowPassword] = React.useState(false);
        const [showAdminSwitch, setShowAdminSwitch] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(false);
        const [adminSecretMode, setAdminSecretMode] = React.useState(false);
        const [userIconClickCount, setUserIconClickCount] = React.useState(0);
        const [showAdminOption, setShowAdminOption] = React.useState(false);

        React.useEffect(() => {
            const timer = setTimeout(() => {
                if (window.lucide) {
                    lucide.createIcons();
                }
            }, 100);
            return () => clearTimeout(timer);
        }, [showPassword, showAdminSwitch, adminSecretMode, showAdminOption]);

        React.useEffect(() => {
            // Check for admin secret trigger
            if (credentials.username === 'superuser' && credentials.password === 'superuser') {
                setAdminSecretMode(true);
                setShowAdminSwitch(true);
                setShowAdminOption(true);
                if (credentials.role !== 'admin') {
                    setCredentials(prev => ({ ...prev, role: 'admin' }));
                }
            } else if (credentials.username === 'admin' && credentials.password === 'admin') {
                setAdminSecretMode(true);
                setShowAdminSwitch(true);
                setShowAdminOption(false);
                if (credentials.role === 'student' || credentials.role === 'teacher' || credentials.role === 'admin') {
                    setCredentials(prev => ({ ...prev, role: 'coordinator' }));
                }
            } else {
                setAdminSecretMode(false);
                setUserIconClickCount(0);
                setShowAdminOption(false);
                setShowAdminSwitch(false);
                if (['coordinator', 'staff', 'admin'].includes(credentials.role)) {
                    setCredentials(prev => ({ ...prev, role: 'student' }));
                }
            }
        }, [credentials.username, credentials.password]);

        const handleUserIconClick = () => {
            // No longer needed for admin access
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                const { username, password, role } = credentials;
                
                if (username === 'superuser' && password === 'superuser' && role === 'admin') {
                    onShowAdminAccess();
                } else if (username === 'admin' && password === 'admin' && role === 'coordinator') {
                    onShowCoordinatorAccess();
                } else if (username === 'admin' && password === 'admin' && role === 'staff') {
                    onShowStaffAccess();
                } else if (username && password) {
                    const mappedCredentials = {
                        ...credentials,
                        role: role === 'coordinator' ? 'staff' : role
                    };
                    onLogin(mappedCredentials);
                } else {
                    alert('Por favor complete todos los campos');
                }
            } catch (error) {
                alert('Error al iniciar sesión');
            } finally {
                setIsLoading(false);
            }
        };

        const handleRoleChange = (role) => {
            setCredentials(prev => ({ ...prev, role }));
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-6" data-name="login-form" data-file="components/LoginForm.js">
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Usuario
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ingrese su usuario"
                            required
                        />
                        <i 
                            data-lucide="user" 
                            className="absolute right-3 top-3 w-5 h-5 text-white opacity-70"
                        ></i>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ingrese su contraseña"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-white opacity-70 hover:opacity-100 focus:outline-none"
                        >
                            <i data-lucide={showPassword ? 'eye-off' : 'eye'} className="w-5 h-5"></i>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2 text-center">
                        Tipo de Usuario
                    </label>
                    <RoleSwitch
                        selectedRole={credentials.role}
                        onRoleChange={handleRoleChange}
                        roleType={showAdminSwitch ? 'admin' : 'main'}
                        showAdminOption={showAdminOption}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Iniciando sesión...</span>
                        </div>
                    ) : (
                        'Iniciar Sesión'
                    )}
                </button>
            </form>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
    }
}
