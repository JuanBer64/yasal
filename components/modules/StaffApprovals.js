function StaffApprovals({ onBack }) {
    try {
        const [approvals, setApprovals] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockApprovals = [
            {
                id: 1,
                type: 'grade_change',
                title: 'Cambio de Calificación',
                description: 'Solicitud de cambio de calificación en Matemáticas',
                requestedBy: 'Prof. García',
                student: 'Juan Pérez',
                status: 'pending',
                date: '2024-01-22'
            },
            {
                id: 2,
                type: 'schedule_change',
                title: 'Cambio de Horario',
                description: 'Modificación de horario para grupo 2°A',
                requestedBy: 'Prof. López',
                status: 'approved',
                date: '2024-01-20'
            },
            {
                id: 3,
                type: 'student_transfer',
                title: 'Transferencia de Estudiante',
                description: 'Transferir estudiante de 1°A a 1°B',
                requestedBy: 'Prof. Martínez',
                student: 'Ana Torres',
                status: 'rejected',
                date: '2024-01-18'
            }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadApprovals();
        }, []);

        const loadApprovals = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setApprovals(mockApprovals);
            } catch (error) {
                console.error('Error loading approvals:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const updateStatus = async (approvalId, newStatus) => {
            try {
                setApprovals(prev => prev.map(approval => 
                    approval.id === approvalId ? { ...approval, status: newStatus } : approval
                ));
                alert(`Solicitud ${newStatus === 'approved' ? 'aprobada' : 'rechazada'} exitosamente`);
            } catch (error) {
                alert('Error al actualizar el estado');
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'approved': return 'bg-green-100 text-green-800';
                case 'pending': return 'bg-yellow-100 text-yellow-800';
                case 'rejected': return 'bg-red-100 text-red-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        };

        const getStatusText = (status) => {
            switch (status) {
                case 'approved': return 'Aprobada';
                case 'pending': return 'Pendiente';
                case 'rejected': return 'Rechazada';
                default: return 'Desconocido';
            }
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="staff-approvals" data-file="components/modules/StaffApprovals.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="staff-approvals" data-file="components/modules/StaffApprovals.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Autorizaciones Pendientes</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                    <div className="space-y-4">
                        {approvals.map((approval) => (
                            <div key={approval.id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{approval.title}</h4>
                                        <p className="text-gray-600">{approval.description}</p>
                                        <div className="text-sm text-gray-500 mt-2">
                                            <p><strong>Solicitado por:</strong> {approval.requestedBy}</p>
                                            {approval.student && <p><strong>Estudiante:</strong> {approval.student}</p>}
                                            <p><strong>Fecha:</strong> {approval.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(approval.status)}`}>
                                        {getStatusText(approval.status)}
                                    </span>
                                </div>

                                {approval.status === 'pending' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => updateStatus(approval.id, 'approved')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => updateStatus(approval.id, 'rejected')}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {approvals.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            <i data-lucide="check-circle" className="w-12 h-12 mx-auto mb-4 text-gray-300"></i>
                            <p>No hay solicitudes pendientes de autorización.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StaffApprovals component error:', error);
        reportError(error);
    }
}
