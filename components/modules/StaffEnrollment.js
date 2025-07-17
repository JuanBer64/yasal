function StaffEnrollment({ onBack }) {
    try {
        const [enrollments, setEnrollments] = React.useState([]);
        const [filter, setFilter] = React.useState('all');
        const [isLoading, setIsLoading] = React.useState(true);

        const mockEnrollments = [
            {
                id: 1,
                studentName: 'Pedro Ramírez',
                grade: '1° Grado',
                status: 'pending',
                applicationDate: '2024-01-15',
                documents: ['Acta de nacimiento', 'Certificado médico'],
                guardian: 'Ana Ramírez'
            },
            {
                id: 2,
                studentName: 'Lucía Torres',
                grade: '2° Grado',
                status: 'approved',
                applicationDate: '2024-01-12',
                documents: ['Acta de nacimiento', 'Certificado médico', 'Boletas anteriores'],
                guardian: 'Miguel Torres'
            },
            {
                id: 3,
                studentName: 'Diego Morales',
                grade: '3° Grado',
                status: 'rejected',
                applicationDate: '2024-01-10',
                documents: ['Acta de nacimiento'],
                guardian: 'Carmen Morales'
            }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadEnrollments();
        }, []);

        const loadEnrollments = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setEnrollments(mockEnrollments);
            } catch (error) {
                console.error('Error loading enrollments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const updateStatus = async (enrollmentId, newStatus) => {
            try {
                setEnrollments(prev => prev.map(enrollment => 
                    enrollment.id === enrollmentId ? { ...enrollment, status: newStatus } : enrollment
                ));
                alert(`Estado actualizado a: ${newStatus}`);
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

        const filteredEnrollments = enrollments.filter(enrollment => {
            if (filter === 'all') return true;
            return enrollment.status === filter;
        });

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="staff-enrollment" data-file="components/modules/StaffEnrollment.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="staff-enrollment" data-file="components/modules/StaffEnrollment.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Gestión de Inscripciones</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Solicitudes de Inscripción</h3>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="all">Todas</option>
                            <option value="pending">Pendientes</option>
                            <option value="approved">Aprobadas</option>
                            <option value="rejected">Rechazadas</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {filteredEnrollments.map((enrollment) => (
                            <div key={enrollment.id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{enrollment.studentName}</h4>
                                        <p className="text-gray-600">Grado: {enrollment.grade}</p>
                                        <p className="text-gray-600">Tutor: {enrollment.guardian}</p>
                                        <p className="text-sm text-gray-500">Solicitud: {enrollment.applicationDate}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enrollment.status)}`}>
                                        {getStatusText(enrollment.status)}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-700 mb-1">Documentos entregados:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {enrollment.documents.map((doc, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                {doc}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {enrollment.status === 'pending' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => updateStatus(enrollment.id, 'approved')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => updateStatus(enrollment.id, 'rejected')}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredEnrollments.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            <i data-lucide="user-plus" className="w-12 h-12 mx-auto mb-4 text-gray-300"></i>
                            <p>No hay inscripciones {filter === 'all' ? '' : filter} en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StaffEnrollment component error:', error);
        reportError(error);
    }
}
