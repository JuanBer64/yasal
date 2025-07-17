function CoordinatorAccess({ onCoordinatorLogin, onBack }) {
    try {
        const [coordinatorCredentials, setCoordinatorCredentials] = React.useState({
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
                if (coordinatorCredentials.username && coordinatorCredentials.password) {
                    onCoordinatorLogin({ ...coordinatorCredentials, role: 'coordinator' });
                } else {
                    alert('Por favor complete todos los campos');
                }
            } catch (error) {
                alert('Error al validar credenciales de coordinador');
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="space-y-6" data-name="coordinator-access" data-file="components/CoordinatorAccess.js">
                <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="user-check" className="w-8 h-8 text-purple-300"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Acceso de Coordinador</h2>
                    <p className="text-white text-opacity-80 text-sm">
                        Ingrese sus credenciales de coordinador para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Usuario Coordinador
                        </label>
                        <input
                            type="text"
                            value={coordinatorCredentials.username}
                            onChange={(e) => setCoordinatorCredentials(prev => ({ ...prev, username: e.target.value }))}
                            className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Usuario coordinador"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Contraseña Coordinador
                        </label>
                        <input
                            type="password"
                            value={coordinatorCredentials.password}
                            onChange={(e) => setCoordinatorCredentials(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Contraseña coordinador"
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
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Validando...' : 'Acceder'}
                        </button>
                    </div>
                </form>
            </div>
        );
    } catch (error) {
        console.error('CoordinatorAccess component error:', error);
        reportError(error);
    }
}
