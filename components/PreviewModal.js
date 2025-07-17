function PreviewModal({ isOpen, onClose, settings }) {
    try {
        React.useEffect(() => {
            if (window.lucide) {
                lucide.createIcons();
            }
        }, [isOpen]);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="preview-modal" data-file="components/PreviewModal.js">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Vista Previa del Login</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i data-lucide="x" className="w-5 h-5"></i>
                        </button>
                    </div>
                    
                    <div 
                        className="rounded-lg p-4 min-h-[400px] flex items-center justify-center"
                        style={{ 
                            background: `linear-gradient(135deg, ${settings.backgroundColor} 0%, #764ba2 100%)` 
                        }}
                    >
                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white border-opacity-20 shadow-2xl">
                            <div className="text-center mb-8">
                                {settings.logoUrl && (
                                    <img 
                                        src={settings.logoUrl} 
                                        alt="Logo preview" 
                                        className="h-16 w-auto mx-auto mb-4 rounded"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                )}
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {settings.title}
                                </h1>
                                <p className="text-white text-opacity-80">
                                    Ingrese sus credenciales para acceder
                                </p>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Usuario</label>
                                    <div className="relative">
                                        <div className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 text-sm">
                                            usuario@ejemplo.com
                                        </div>
                                        <div className="absolute right-3 top-3 w-5 h-5 text-white opacity-70">👤</div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Contraseña</label>
                                    <div className="relative">
                                        <div className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white text-sm">
                                            ••••••••
                                        </div>
                                        <div className="absolute right-3 top-3 w-5 h-5 text-white opacity-70">👁️</div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2 text-center">Tipo de Usuario</label>
                                    <div className="flex justify-center">
                                        <div className="bg-white bg-opacity-20 rounded-full p-1 border border-white border-opacity-30">
                                            <div className="grid grid-cols-2 gap-0">
                                                <div className="px-6 py-2 bg-blue-600 rounded-full text-white text-sm font-medium">Estudiante</div>
                                                <div className="px-6 py-2 text-white text-opacity-70 text-sm font-medium">Docente</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                        <button
                            onClick={onClose}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Cerrar Vista Previa
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PreviewModal component error:', error);
        reportError(error);
    }
}
