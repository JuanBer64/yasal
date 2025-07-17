function StaffReports({ onBack }) {
    try {
        const [reports, setReports] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isGenerating, setIsGenerating] = React.useState(false);

        const mockReports = [
            {
                id: 1,
                title: 'Reporte de Asistencia Mensual',
                type: 'attendance',
                period: 'Enero 2024',
                status: 'completed',
                generatedDate: '2024-01-31',
                downloadUrl: '#'
            },
            {
                id: 2,
                title: 'Reporte de Calificaciones por Grupo',
                type: 'grades',
                period: 'Primer Parcial',
                status: 'completed',
                generatedDate: '2024-01-28',
                downloadUrl: '#'
            },
            {
                id: 3,
                title: 'Estadísticas de Inscripciones',
                type: 'enrollment',
                period: 'Ciclo 2024',
                status: 'pending',
                generatedDate: null,
                downloadUrl: null
            }
        ];

        const reportTypes = [
            { id: 'attendance', title: 'Asistencia', icon: 'user-check' },
            { id: 'grades', title: 'Calificaciones', icon: 'award' },
            { id: 'enrollment', title: 'Inscripciones', icon: 'user-plus' },
            { id: 'financial', title: 'Financiero', icon: 'dollar-sign' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadReports();
        }, []);

        const loadReports = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setReports(mockReports);
            } catch (error) {
                console.error('Error loading reports:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const generateReport = async (reportType) => {
            try {
                setIsGenerating(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert(`Reporte de ${reportType} generado exitosamente`);
            } catch (error) {
                alert('Error al generar el reporte');
            } finally {
                setIsGenerating(false);
            }
        };

        const getStatusColor = (status) => {
            return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="staff-reports" data-file="components/modules/StaffReports.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="staff-reports" data-file="components/modules/StaffReports.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Reportes Administrativos</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="dashboard-card p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Generar Nuevo Reporte</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {reportTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => generateReport(type.title)}
                                    disabled={isGenerating}
                                    className="p-3 border border-purple-200 rounded-lg hover:bg-purple-50 flex items-center space-x-2 disabled:opacity-50"
                                >
                                    <i data-lucide={type.icon} className="w-4 h-4 text-purple-600"></i>
                                    <span className="text-sm">{type.title}</span>
                                </button>
                            ))}
                        </div>
                        {isGenerating && (
                            <div className="mt-4 flex items-center space-x-2 text-purple-600">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                                <span className="text-sm">Generando reporte...</span>
                            </div>
                        )}
                    </div>

                    <div className="dashboard-card p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Reportes Recientes</h3>
                        <div className="space-y-3">
                            {reports.map((report) => (
                                <div key={report.id} className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-800">{report.title}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                                            {report.status === 'completed' ? 'Completado' : 'Pendiente'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{report.period}</p>
                                    {report.status === 'completed' && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{report.generatedDate}</span>
                                            <button className="text-purple-600 hover:text-purple-800 text-sm">
                                                <i data-lucide="download" className="w-4 h-4 inline mr-1"></i>
                                                Descargar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StaffReports component error:', error);
        reportError(error);
    }
}
