function StudentTeachers({ onBack }) {
    try {
        const [teachers, setTeachers] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockTeachers = [
            {
                id: 1,
                name: 'Prof. María García',
                subject: 'Matemáticas',
                email: 'maria.garcia@escuela.edu',
                phone: '555-0101',
                office: 'Aula 101',
                schedule: 'Lun-Vie 8:00-14:00',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
            },
            {
                id: 2,
                name: 'Prof. Carlos López',
                subject: 'Español',
                email: 'carlos.lopez@escuela.edu',
                phone: '555-0102',
                office: 'Aula 102',
                schedule: 'Lun-Vie 9:00-15:00',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            },
            {
                id: 3,
                name: 'Prof. Ana Martínez',
                subject: 'Ciencias',
                email: 'ana.martinez@escuela.edu',
                phone: '555-0103',
                office: 'Laboratorio 1',
                schedule: 'Lun-Vie 8:30-14:30',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
            }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadTeachers();
        }, []);

        const loadTeachers = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setTeachers(mockTeachers);
            } catch (error) {
                console.error('Error loading teachers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="student-teachers" data-file="components/modules/StudentTeachers.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="student-teachers" data-file="components/modules/StudentTeachers.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Mis Profesores</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="dashboard-card p-6 rounded-xl">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={teacher.avatar}
                                    alt={teacher.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
                                    <p className="text-blue-600 font-medium">{teacher.subject}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <i data-lucide="mail" className="w-4 h-4 text-gray-500"></i>
                                    <span className="text-sm text-gray-700">{teacher.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <i data-lucide="phone" className="w-4 h-4 text-gray-500"></i>
                                    <span className="text-sm text-gray-700">{teacher.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <i data-lucide="map-pin" className="w-4 h-4 text-gray-500"></i>
                                    <span className="text-sm text-gray-700">{teacher.office}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <i data-lucide="clock" className="w-4 h-4 text-gray-500"></i>
                                    <span className="text-sm text-gray-700">{teacher.schedule}</span>
                                </div>
                            </div>
                            
                            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                                <i data-lucide="message-circle" className="w-4 h-4"></i>
                                <span>Contactar</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StudentTeachers component error:', error);
        reportError(error);
    }
}
