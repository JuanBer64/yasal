function StaffGroups({ onBack }) {
    try {
        const [groups, setGroups] = React.useState([]);
        const [selectedGroup, setSelectedGroup] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockGroups = [
            { id: 1, name: '1° Grado A', students: 25, teacher: 'Prof. García', capacity: 30 },
            { id: 2, name: '1° Grado B', students: 23, teacher: 'Prof. López', capacity: 30 },
            { id: 3, name: '2° Grado A', students: 27, teacher: 'Prof. Martínez', capacity: 30 },
            { id: 4, name: '3° Grado A', students: 22, teacher: 'Prof. Rodríguez', capacity: 25 }
        ];

        const mockStudents = [
            { id: 1, name: 'Juan Pérez', studentId: '2024001', status: 'active' },
            { id: 2, name: 'María García', studentId: '2024002', status: 'active' },
            { id: 3, name: 'Carlos López', studentId: '2024003', status: 'inactive' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadGroups();
        }, []);

        const loadGroups = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setGroups(mockGroups);
            } catch (error) {
                console.error('Error loading groups:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="staff-groups" data-file="components/modules/StaffGroups.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
                </div>
            );
        }

        if (selectedGroup) {
            return (
                <div className="space-y-6" data-name="staff-groups" data-file="components/modules/StaffGroups.js">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Detalles del Grupo</h2>
                        <button
                            onClick={() => setSelectedGroup(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <i data-lucide="arrow-left" className="w-4 h-4"></i>
                            <span>Volver</span>
                        </button>
                    </div>

                    <div className="dashboard-card p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">{selectedGroup.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm text-purple-600">Estudiantes</p>
                                <p className="text-2xl font-bold text-purple-800">{selectedGroup.students}/{selectedGroup.capacity}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600">Profesor</p>
                                <p className="font-semibold text-blue-800">{selectedGroup.teacher}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600">Estado</p>
                                <p className="font-semibold text-green-800">Activo</p>
                            </div>
                        </div>

                        <h4 className="font-semibold mb-3">Lista de Estudiantes</h4>
                        <div className="space-y-2">
                            {mockStudents.map(student => (
                                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h5 className="font-medium">{student.name}</h5>
                                        <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {student.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="staff-groups" data-file="components/modules/StaffGroups.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Gestión de Grupos</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(group => (
                        <div
                            key={group.id}
                            onClick={() => setSelectedGroup(group)}
                            className="dashboard-card p-6 rounded-xl cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold mb-3">{group.name}</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Estudiantes:</strong> {group.students}/{group.capacity}</p>
                                <p><strong>Profesor:</strong> {group.teacher}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                    <div
                                        className="bg-purple-600 h-2 rounded-full"
                                        style={{ width: `${(group.students / group.capacity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StaffGroups component error:', error);
        reportError(error);
    }
}
