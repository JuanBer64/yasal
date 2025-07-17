function TeacherAttendance({ onBack }) {
    try {
        const [selectedClass, setSelectedClass] = React.useState('');
        const [students, setStudents] = React.useState([]);
        const [attendance, setAttendance] = React.useState({});
        const [isLoading, setIsLoading] = React.useState(false);

        const classes = [
            { id: '1a', name: 'Matemáticas 1°A' },
            { id: '2b', name: 'Matemáticas 2°B' },
            { id: '3a', name: 'Álgebra 3°A' }
        ];

        const mockStudents = [
            { id: 1, name: 'Juan Pérez', studentId: '2024001' },
            { id: 2, name: 'María García', studentId: '2024002' },
            { id: 3, name: 'Carlos López', studentId: '2024003' },
            { id: 4, name: 'Ana Martínez', studentId: '2024004' },
            { id: 5, name: 'Pedro Rodríguez', studentId: '2024005' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
        }, []);

        const loadStudents = async (classId) => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setStudents(mockStudents);
                const initialAttendance = {};
                mockStudents.forEach(student => {
                    initialAttendance[student.id] = 'present';
                });
                setAttendance(initialAttendance);
            } catch (error) {
                console.error('Error loading students:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleClassChange = (classId) => {
            setSelectedClass(classId);
            if (classId) loadStudents(classId);
        };

        const toggleAttendance = (studentId) => {
            setAttendance(prev => ({
                ...prev,
                [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
            }));
        };

        const saveAttendance = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                alert('Asistencia guardada exitosamente');
            } catch (error) {
                alert('Error al guardar la asistencia');
            }
        };

        return (
            <div className="space-y-6" data-name="teacher-attendance" data-file="components/modules/TeacherAttendance.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Pase de Lista</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Seleccionar Clase</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => handleClassChange(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="">Seleccione una clase</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
                        </div>
                    )}

                    {selectedClass && !isLoading && (
                        <div className="space-y-4">
                            {students.map(student => (
                                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">{student.name}</h4>
                                        <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleAttendance(student.id)}
                                        className={`px-4 py-2 rounded-lg font-medium ${
                                            attendance[student.id] === 'present'
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                        }`}
                                    >
                                        {attendance[student.id] === 'present' ? 'Presente' : 'Ausente'}
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={saveAttendance}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                            >
                                Guardar Asistencia
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TeacherAttendance component error:', error);
        reportError(error);
    }
}
