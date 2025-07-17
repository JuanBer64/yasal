function StudentAssignments({ onBack }) {
    try {
        const [assignments, setAssignments] = React.useState([]);
        const [filter, setFilter] = React.useState('all');
        const [isLoading, setIsLoading] = React.useState(true);

        const mockAssignments = [
            {
                id: 1,
                title: 'Ejercicios de Álgebra',
                subject: 'Matemáticas',
                teacher: 'Prof. García',
                dueDate: '2024-01-25',
                status: 'pending',
                description: 'Resolver ejercicios del capítulo 5, páginas 120-125'
            },
            {
                id: 2,
                title: 'Ensayo sobre la Revolución',
                subject: 'Historia',
                teacher: 'Prof. Rodríguez',
                dueDate: '2024-01-28',
                status: 'pending',
                description: 'Escribir un ensayo de 500 palabras sobre las causas de la Revolución'
            },
            {
                id: 3,
                title: 'Experimento de Química',
                subject: 'Ciencias',
                teacher: 'Prof. Martínez',
                dueDate: '2024-01-20',
                status: 'completed',
                description: 'Realizar experimento sobre reacciones químicas básicas'
            },
            {
                id: 4,
                title: 'Lectura Comprensiva',
                subject: 'Español',
                teacher: 'Prof. López',
                dueDate: '2024-01-30',
                status: 'overdue',
                description: 'Leer capítulos 1-3 del libro y responder cuestionario'
            }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadAssignments();
        }, []);

        const loadAssignments = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setAssignments(mockAssignments);
            } catch (error) {
                console.error('Error loading assignments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'completed': return 'bg-green-100 text-green-800';
                case 'pending': return 'bg-yellow-100 text-yellow-800';
                case 'overdue': return 'bg-red-100 text-red-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        };

        const getStatusIcon = (status) => {
            switch (status) {
                case 'completed': return 'check-circle';
                case 'pending': return 'clock';
                case 'overdue': return 'alert-circle';
                default: return 'help-circle';
            }
        };

        const getStatusText = (status) => {
            switch (status) {
                case 'completed': return 'Completada';
                case 'pending': return 'Pendiente';
                case 'overdue': return 'Atrasada';
                default: return 'Desconocido';
            }
        };

        const filteredAssignments = assignments.filter(assignment => {
            if (filter === 'all') return true;
            return assignment.status === filter;
        });

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="student-assignments" data-file="components/modules/StudentAssignments.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="student-assignments" data-file="components/modules/StudentAssignments.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Mis Tareas</h2>
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
                        <h3 className="text-lg font-semibold">Filtrar Tareas</h3>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="all">Todas</option>
                            <option value="pending">Pendientes</option>
                            <option value="completed">Completadas</option>
                            <option value="overdue">Atrasadas</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {filteredAssignments.map((assignment) => (
                            <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h4 className="text-lg font-semibold text-gray-800">{assignment.title}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                                <i data-lucide={getStatusIcon(assignment.status)} className="w-3 h-3 inline mr-1"></i>
                                                {getStatusText(assignment.status)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span><strong>Materia:</strong> {assignment.subject}</span>
                                            <span><strong>Profesor:</strong> {assignment.teacher}</span>
                                            <span><strong>Entrega:</strong> {assignment.dueDate}</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {assignment.status === 'pending' && (
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                                                Marcar como Completada
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredAssignments.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            <i data-lucide="clipboard-list" className="w-12 h-12 mx-auto mb-4 text-gray-300"></i>
                            <p>No hay tareas {filter === 'all' ? '' : filter === 'pending' ? 'pendientes' : filter === 'completed' ? 'completadas' : 'atrasadas'} en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StudentAssignments component error:', error);
        reportError(error);
    }
}
