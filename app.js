function App() {
    try {
        const [currentView, setCurrentView] = React.useState('login');
        const [user, setUser] = React.useState(null);
        const [showAdminAccess, setShowAdminAccess] = React.useState(false);
        const [showCoordinatorAccess, setShowCoordinatorAccess] = React.useState(false);
        const [showStaffAccess, setShowStaffAccess] = React.useState(false);
        const [customization, setCustomization] = React.useState({
            title: 'Sistema de Gestión Escolar',
            logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center',
            backgroundColor: '#667eea'
        });

        React.useEffect(() => {
            lucide.createIcons();
            loadCustomization();
        }, []);

        React.useEffect(() => {
            const existingSession = getUserSession();
            if (existingSession && isValidSession(existingSession)) {
                setUser(existingSession);
                setCurrentView('dashboard');
            }
        }, []);

        const loadCustomization = () => {
            try {
                const savedSettings = localStorage.getItem('appCustomization');
                if (savedSettings) {
                    const settings = JSON.parse(savedSettings);
                    setCustomization(settings);
                    document.title = settings.title;
                    document.body.style.background = `linear-gradient(135deg, ${settings.backgroundColor} 0%, #764ba2 100%)`;
                    
                    // Set CSS custom properties for global color changes
                    document.documentElement.style.setProperty('--primary-color', settings.backgroundColor);
                    document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${settings.backgroundColor} 0%, #764ba2 100%)`);
                }
            } catch (error) {
                console.error('Error loading customization:', error);
            }
        };

        const handleLogin = async (credentials) => {
            try {
                const sessionData = createUserSession(credentials);
                setUser(sessionData);
                setCurrentView('dashboard');
                resetAccessViews();
            } catch (error) {
                console.error('Login error:', error);
                alert('Error al iniciar sesión');
            }
        };

        const handleSpecialLogin = async (credentials) => {
            try {
                const sessionData = createUserSession(credentials);
                setUser(sessionData);
                setCurrentView('dashboard');
                resetAccessViews();
            } catch (error) {
                console.error('Special login error:', error);
                alert('Error al iniciar sesión');
            }
        };

        const handleLogout = () => {
            try {
                clearUserSession();
                setUser(null);
                setCurrentView('login');
                resetAccessViews();
            } catch (error) {
                console.error('Logout error:', error);
                alert('Error al cerrar sesión');
            }
        };

        const resetAccessViews = () => {
            setShowAdminAccess(false);
            setShowCoordinatorAccess(false);
            setShowStaffAccess(false);
        };

        const renderCurrentView = () => {
            if (currentView === 'dashboard' && user) {
                return React.createElement(Dashboard, {
                    user: user,
                    onLogout: handleLogout
                });
            }

            if (showAdminAccess) {
                return (
                    <div className="min-h-screen flex items-center justify-center p-4">
                        <ParallaxBackground />
                        <div className="relative z-10 w-full max-w-md">
                            <div className="login-card p-8 rounded-2xl">
                                <AdminAccess
                                    onAdminLogin={handleSpecialLogin}
                                    onBack={resetAccessViews}
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (showCoordinatorAccess) {
                return (
                    <div className="min-h-screen flex items-center justify-center p-4">
                        <ParallaxBackground />
                        <div className="relative z-10 w-full max-w-md">
                            <div className="login-card p-8 rounded-2xl">
                                <CoordinatorAccess
                                    onCoordinatorLogin={handleSpecialLogin}
                                    onBack={resetAccessViews}
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (showStaffAccess) {
                return (
                    <div className="min-h-screen flex items-center justify-center p-4">
                        <ParallaxBackground />
                        <div className="relative z-10 w-full max-w-md">
                            <div className="login-card p-8 rounded-2xl">
                                <StaffAccess
                                    onStaffLogin={handleSpecialLogin}
                                    onBack={resetAccessViews}
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <ParallaxBackground />
                    <div className="relative z-10 w-full max-w-md">
                        <div className="login-card p-8 rounded-2xl">
                            <div className="text-center mb-8">
                                {customization.logoUrl && (
                                    <img 
                                        src={customization.logoUrl} 
                                        alt="Logo" 
                                        className="h-16 w-auto mx-auto mb-4 rounded"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                )}
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {customization.title}
                                </h1>
                                <p className="text-white text-opacity-80">
                                    Ingrese sus credenciales para acceder
                                </p>
                            </div>
                            <LoginForm
                                onLogin={handleLogin}
                                onShowAdminAccess={() => setShowAdminAccess(true)}
                                onShowCoordinatorAccess={() => setShowCoordinatorAccess(true)}
                                onShowStaffAccess={() => setShowStaffAccess(true)}
                            />
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div data-name="app" data-file="app.js">
                {renderCurrentView()}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
