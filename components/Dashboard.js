function Dashboard({ user, onLogout }) {
    try {
        const renderDashboard = () => {
            switch (user.role) {
                case 'student':
                    return React.createElement(StudentDashboard, { user, onLogout });
                case 'teacher':
                    return React.createElement(TeacherDashboard, { user, onLogout });
                case 'staff':
                    return React.createElement(StaffDashboard, { user, onLogout });
                case 'admin':
                    return React.createElement(AdminDashboard, { user, onLogout });
                default:
                    return React.createElement(StudentDashboard, { user, onLogout });
            }
        };

        return (
            <div className="min-h-screen" data-name="dashboard" data-file="components/Dashboard.js">
                <ParallaxBackground />
                <div className="relative z-10">
                    {renderDashboard()}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
    }
}
