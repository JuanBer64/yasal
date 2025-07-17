function TeacherSchedule({ onBack }) {
    try {
        const [schedule, setSchedule] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockSchedule = [
            { id: 1, day: 'Lunes', time: '8:00-9:00', subject: 'Matemáticas 1°A', room: 'Aula 101', students: 25 },
            { id: 2, day: 'Lunes', time: '9:00-10:00', subject: 'Matemáticas 2°B', room: 'Aula 102', students: 23 },
            { id: 3, day: 'Martes', time: '8:00-9:00', subject: 'Álgebra 3°A', room: 'Aula 201', students: 27 },
            { id: 4, day: 'Martes', time: '10:00-11:00', subject: 'Geometría 2°A', room: 'Aula 103', students: 24 },
            { id: 5, day: 'Miércoles', time: '8:00-9:00', subject: 'Matemáticas 1°A', room: 'Aula 101', students: 25 },
            { id: 6, day: 'Jueves', time: '9:00-10:00', subject: 'Cálculo 3°B', room: 'Aula 202', students: 22 }
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
                <div className="flex items-center justify-center p-8" data-name="teacher-schedule" data-file="components/modules/TeacherSchedule.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="teacher-schedule" data-file="components/modules/TeacherSchedule.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Mi Horario de Clases</h2>
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
                            <h3 className="text-lg font-semibold mb-4 text-green-600">{day}</h3>
                            <div className="space-y-3">
                                {classes.map((classItem) => (
                                    <div key={classItem.id} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{classItem.subject}</h4>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    <p><i data-lucide="map-pin" className="w-3 h-3 inline mr-1"></i>{classItem.room}</p>
                                                    <p><i data-lucide="users" className="w-3 h-3 inline mr-1"></i>{classItem.students} estudiantes</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-green-600 bg-white px-2 py-1 rounded">
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
        console.error('TeacherSchedule component error:', error);
        reportError(error);
    }
}
