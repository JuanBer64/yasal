function TeacherGrades({ onBack }) {
    try {
        const [selectedClass, setSelectedClass] = React.useState('');
        const [students, setStudents] = React.useState([]);
        const [grades, setGrades] = React.useState({});
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
            { id: 4, name: 'Ana Martínez', studentId: '2024004' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
        }, []);

        const loadStudents = async (classId) => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setStudents(mockStudents);
                const initialGrades = {};
                mockStudents.forEach(student => {
                    initialGrades[student.id] = { parcial1: 8.5, parcial2: '', parcial3: '' };
                });
                setGrades(initialGrades);
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

        const updateGrade = (studentId, period, value) => {
            setGrades(prev => ({
                ...prev,
                [studentId]: {
                    ...prev[studentId],
                    [period]: value
                }
            }));
        };

        const saveGrades = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                alert('Calificaciones guardadas exitosamente');
            } catch (error) {
                alert('Error al guardar las calificaciones');
            }
        };

        return (
            <div className="space-y-6" data-name="teacher-grades" data-file="components/modules/TeacherGrades.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Captura de Calificaciones</h2>
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
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border p-3 text-left">Estudiante</th>
                                            <th className="border p-3">Parcial 1</th>
                                            <th className="border p-3">Parcial 2</th>
                                            <th className="border p-3">Parcial 3</th>
                                            <th className="border p-3">Promedio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(student => {
                                            const studentGrades = grades[student.id] || {};
                                            const avg = Object.values(studentGrades).filter(g => g !== '').reduce((a, b) => a + parseFloat(b || 0), 0) / Object.values(studentGrades).filter(g => g !== '').length || 0;
                                            return (
                                                <tr key={student.id}>
                                                    <td className="border p-3">
                                                        <div>
                                                            <div className="font-medium">{student.name}</div>
                                                            <div className="text-sm text-gray-600">{student.studentId}</div>
                                                        </div>
                                                    </td>
                                                    <td className="border p-3">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            step="0.1"
                                                            value={studentGrades.parcial1 || ''}
                                                            onChange={(e) => updateGrade(student.id, 'parcial1', e.target.value)}
                                                            className="w-full px-2 py-1 border rounded"
                                                        />
                                                    </td>
                                                    <td className="border p-3">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            step="0.1"
                                                            value={studentGrades.parcial2 || ''}
                                                            onChange={(e) => updateGrade(student.id, 'parcial2', e.target.value)}
                                                            className="w-full px-2 py-1 border rounded"
                                                        />
                                                    </td>
                                                    <td className="border p-3">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            step="0.1"
                                                            value={studentGrades.parcial3 || ''}
                                                            onChange={(e) => updateGrade(student.id, 'parcial3', e.target.value)}
                                                            className="w-full px-2 py-1 border rounded"
                                                        />
                                                    </td>
                                                    <td className="border p-3 text-center font-semibold">
                                                        {avg > 0 ? avg.toFixed(1) : '-'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={saveGrades}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                            >
                                Guardar Calificaciones
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TeacherGrades component error:', error);
        reportError(error);
    }
}
