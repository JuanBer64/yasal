function AdminAccess({ onAdminLogin, onBack }) {
    try {
        const [adminCredentials, setAdminCredentials] = React.useState({
            username: '',
            password: ''
        });
        const [isLoading, setIsLoading] = React.useState(false);

        React.useEffect(() => {
            const timer = setTimeout(() => {
                if (window.lucide) {
                    lucide.createIcons();
                }
            }, 100);
            return () => clearTimeout(timer);
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                // Allow any admin credentials for testing (no database validation)
                if (adminCredentials.username && adminCredentials.password) {
                    onAdminLogin({ ...adminCredentials, role: 'admin' });
                } else {
                    alert('Por favor complete todos los campos');
                }
            } catch (error) {
                alert('Error al validar credenciales de administrador');
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="space-y-6" data-name="admin-access" data-file="components/AdminAccess.js">
                <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="shield-alert" className="w-8 h-8 text-red-300"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Acceso Administrativo</h2>
                    <p className="text-white text-opacity-80 text-sm">
                        Ingrese sus credenciales de administrador para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Usuario Administrador
                        </label>
                        <input
                            type="text"
                            value={adminCredentials.username}
                            onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                            className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Usuario administrador"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Contraseña Administrador
                        </label>
                        <input
                            type="password"
                            value={adminCredentials.password}
                            onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Contraseña administrador"
                            required
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Volver
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Validando...' : 'Acceder'}
                        </button>
                    </div>
                </form>
            </div>
        );
    } catch (error) {
        console.error('AdminAccess component error:', error);
        reportError(error);
    }
}
