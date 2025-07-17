function TeacherClasses({ onBack }) {
    try {
        const [classes, setClasses] = React.useState([]);
        const [selectedClass, setSelectedClass] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockClasses = [
            {
                id: 1,
                name: 'Matemáticas 1°A',
                students: 25,
                nextClass: '2024-01-25 08:00',
                materials: ['Libro de texto Cap. 5', 'Ejercicios prácticos', 'Calculadora'],
                topics: ['Álgebra básica', 'Ecuaciones lineales', 'Sistemas de ecuaciones']
            },
            {
                id: 2,
                name: 'Matemáticas 2°B',
                students: 23,
                nextClass: '2024-01-25 09:00',
                materials: ['Libro de texto Cap. 8', 'Geometría práctica', 'Regla y compás'],
                topics: ['Geometría plana', 'Área y perímetro', 'Teorema de Pitágoras']
            },
            {
                id: 3,
                name: 'Álgebra 3°A',
                students: 27,
                nextClass: '2024-01-26 08:00',
                materials: ['Álgebra avanzada', 'Calculadora científica', 'Gráficas'],
                topics: ['Funciones cuadráticas', 'Parábolas', 'Sistemas complejos']
            }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadClasses();
        }, []);

        const loadClasses = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setClasses(mockClasses);
            } catch (error) {
                console.error('Error loading classes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="teacher-classes" data-file="components/modules/TeacherClasses.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
                </div>
            );
        }

        if (selectedClass) {
            return (
                <div className="space-y-6" data-name="teacher-classes" data-file="components/modules/TeacherClasses.js">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Detalles de la Clase</h2>
                        <button
                            onClick={() => setSelectedClass(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <i data-lucide="arrow-left" className="w-4 h-4"></i>
                            <span>Volver</span>
                        </button>
                    </div>

                    <div className="dashboard-card p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">{selectedClass.name}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-semibold mb-3 text-green-600">Información General</h4>
                                <div className="space-y-2">
                                    <p><strong>Estudiantes:</strong> {selectedClass.students}</p>
                                    <p><strong>Próxima clase:</strong> {selectedClass.nextClass}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-3 text-green-600">Materiales Necesarios</h4>
                                <ul className="space-y-1">
                                    {selectedClass.materials.map((material, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500"></i>
                                            <span className="text-sm">{material}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-green-600">Temas del Programa</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {selectedClass.topics.map((topic, index) => (
                                    <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                                        <span className="text-sm font-medium text-green-800">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                                Editar Contenido
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                Ver Estudiantes
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="teacher-classes" data-file="components/modules/TeacherClasses.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Gestión de Clases</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map(classItem => (
                        <div
                            key={classItem.id}
                            onClick={() => setSelectedClass(classItem)}
                            className="dashboard-card p-6 rounded-xl cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold mb-3">{classItem.name}</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Estudiantes:</strong> {classItem.students}</p>
                                <p><strong>Próxima clase:</strong> {classItem.nextClass}</p>
                                <p className="text-green-600 font-medium">Click para ver detalles</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TeacherClasses component error:', error);
        reportError(error);
    }
}
