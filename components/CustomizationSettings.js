function CustomizationSettings({ onBack }) {
    try {
        const [settings, setSettings] = React.useState({
            title: 'Sistema de Gestión Escolar',
            logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center',
            backgroundColor: '#667eea'
        });
        const [isSaving, setIsSaving] = React.useState(false);
        const [showPreview, setShowPreview] = React.useState(false);

        React.useEffect(() => {
            lucide.createIcons();
            loadSettings();
        }, []);

        React.useEffect(() => {
            // Real-time updates to current page
            document.title = settings.title;
            document.body.style.background = `linear-gradient(135deg, ${settings.backgroundColor} 0%, #764ba2 100%)`;
            
            // Update CSS custom properties for global color changes
            document.documentElement.style.setProperty('--primary-color', settings.backgroundColor);
            document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${settings.backgroundColor} 0%, #764ba2 100%)`);
        }, [settings]);

        const loadSettings = async () => {
            try {
                const savedSettings = localStorage.getItem('appCustomization');
                if (savedSettings) {
                    setSettings(JSON.parse(savedSettings));
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        const handleFileUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setSettings(prev => ({ ...prev, logoUrl: event.target.result }));
                };
                reader.readAsDataURL(file);
            }
        };

        const resetLogo = () => {
            setSettings(prev => ({ 
                ...prev, 
                logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center' 
            }));
        };

        const saveSettings = async () => {
            try {
                setIsSaving(true);
                localStorage.setItem('appCustomization', JSON.stringify(settings));
                alert('Configuración guardada exitosamente');
            } catch (error) {
                alert('Error al guardar la configuración');
            } finally {
                setIsSaving(false);
            }
        };

        const resetToDefaults = () => {
            setSettings({
                title: 'Sistema de Gestión Escolar',
                logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center',
                backgroundColor: '#667eea'
            });
        };

        return (
            <div className="space-y-6" data-name="customization-settings" data-file="components/CustomizationSettings.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Personalización del Sistema</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-6">Configuración Visual</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Título del Sistema</label>
                            <input
                                type="text"
                                value={settings.title}
                                onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nombre del sistema"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Logo del Sistema</label>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={settings.logoUrl}
                                    onChange={(e) => setSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="URL de la imagen o seleccione archivo"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                {settings.logoUrl && (
                                    <div className="flex items-center space-x-3">
                                        <img 
                                            src={settings.logoUrl} 
                                            alt="Logo preview" 
                                            className="h-16 w-auto rounded border"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                        <button
                                            onClick={resetLogo}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Usar Logo por Defecto
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Color de Fondo</label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="color"
                                    value={settings.backgroundColor}
                                    onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                    className="w-16 h-10 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={settings.backgroundColor}
                                    onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="#667eea"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3 mt-8">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Vista Previa
                        </button>
                        <button
                            onClick={saveSettings}
                            disabled={isSaving}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                        <button
                            onClick={resetToDefaults}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                        >
                            Restaurar Predeterminados
                        </button>
                    </div>
                </div>

                <PreviewModal 
                    isOpen={showPreview}
                    onClose={() => setShowPreview(false)}
                    settings={settings}
                />
            </div>
        );
    } catch (error) {
        console.error('CustomizationSettings component error:', error);
        reportError(error);
    }
}
