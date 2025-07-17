function StudentGrades({ onBack }) {
    try {
        const [grades, setGrades] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        const mockGrades = [
            { id: 1, subject: 'Matemáticas', grade: 8.5, maxGrade: 10, teacher: 'Prof. García', period: 'Parcial 1' },
            { id: 2, subject: 'Español', grade: 9.2, maxGrade: 10, teacher: 'Prof. López', period: 'Parcial 1' },
            { id: 3, subject: 'Ciencias', grade: 7.8, maxGrade: 10, teacher: 'Prof. Martínez', period: 'Parcial 1' },
            { id: 4, subject: 'Historia', grade: 8.9, maxGrade: 10, teacher: 'Prof. Rodríguez', period: 'Parcial 1' },
            { id: 5, subject: 'Inglés', grade: 8.0, maxGrade: 10, teacher: 'Prof. Wilson', period: 'Parcial 1' }
        ];

        React.useEffect(() => {
            lucide.createIcons();
            loadGrades();
        }, []);

        const loadGrades = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setGrades(mockGrades);
            } catch (error) {
                console.error('Error loading grades:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const getGradeColor = (grade) => {
            if (grade >= 9) return 'text-green-600';
            if (grade >= 7) return 'text-yellow-600';
            return 'text-red-600';
        };

        const average = grades.length > 0 ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1) : 0;

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-8" data-name="student-grades" data-file="components/modules/StudentGrades.js">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-6" data-name="student-grades" data-file="components/modules/StudentGrades.js">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Mis Calificaciones</h2>
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
                        <h3 className="text-lg font-semibold">Promedio General</h3>
                        <div className={`text-2xl font-bold ${getGradeColor(parseFloat(average))}`}>
                            {average}/10
                        </div>
                    </div>

                    <div className="space-y-4">
                        {grades.map((grade) => (
                            <div key={grade.id} className="border rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-800">{grade.subject}</h4>
                                    <p className="text-sm text-gray-600">{grade.teacher} • {grade.period}</p>
                                </div>
                                <div className={`text-xl font-bold ${getGradeColor(grade.grade)}`}>
                                    {grade.grade}/{grade.maxGrade}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StudentGrades component error:', error);
        reportError(error);
    }
}
