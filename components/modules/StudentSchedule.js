function StudentSchedule({ onBack }) {
    try {
        const [schedule, setSchedule] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockSchedule = [
            { id: 1, day: 'Lunes', time: '8:00-9:00', subject: 'Matemáticas', teacher: 'Prof. García', room: 'Aula 101' },
            { id: 2, day: 'Lunes', time: '9:00-10:00', subject: 'Español', teacher: 'Prof. López', room: 'Aula 102' },
            { id: 3, day: 'Martes', time: '8:00-9:00', subject: 'Ciencias', teacher: 'Prof. Martínez', room: 'Lab 1' },
            { id: 4, day: 'Martes', time: '10:00-11:00', subject: 'Historia', teacher: 'Prof. Rodríguez', room: 'Aula 103' },
            { id: 5, day: 'Miércoles', time: '8:00-9:00', subject: 'Inglés', teacher: 'Prof. Wilson', room: 'Aula 104' },
            { id: 6, day: 'Jueves', time: '9:00-10:00', subject: 'Educación Física', teacher: 'Prof. Morales', room: 'Gimnasio' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadSchedule();
        }, []);

        const loadSchedule = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setSchedule(mockSchedule);
            } catch (error) {
                console.error('Error loading schedule:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const groupedSchedule = schedule.reduce((acc, item) => {
            if (!acc[item.day]) acc[item.day] = [];
            acc[item.day].push(item);
            return acc;
        }, {});

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="student-schedule" data-file="components/modules/StudentSchedule.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="student-schedule" data-file="components/modules/StudentSchedule.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Mi Horario</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Volver</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Object.entries(groupedSchedule).map(([day, classes]) => (
                        <div key={day} className="dashboard-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-blue-600">{day}</h3>
                            <div className="space-y-3">
                                {classes.map((classItem) => (
                                    <div key={classItem.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{classItem.subject}</h4>
                                                <p className="text-sm text-gray-600">{classItem.teacher}</p>
                                                <p className="text-sm text-gray-600">{classItem.room}</p>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600 bg-white px-2 py-1 rounded">
                                                {classItem.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StudentSchedule component error:', error);
        reportError(error);
    }
}
