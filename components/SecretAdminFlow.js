function SecretAdminFlow({ credentials, onLogoClickable, onShowAdminButton }) {
    try {
        const [secretStep, setSecretStep] = React.useState(0);
        
        React.useEffect(() => {
            if (credentials.username === 'admin' && credentials.password === 'admin') {
                setSecretStep(1);
            } else {
                setSecretStep(0);
                onLogoClickable(false);
                onShowAdminButton(false);
            }
        }, [credentials.username, credentials.password]);

        const handleUserIconClick = () => {
            if (secretStep === 1) {
                setSecretStep(2);
                onLogoClickable(true);
            }
        };

        const handleLogoClick = () => {
            if (secretStep === 2) {
                setSecretStep(3);
                onShowAdminButton(true);
            }
        };

        return {
            isSecretMode: secretStep > 0,
            userIconClickable: secretStep === 1,
            logoClickable: secretStep === 2,
            showAdminButton: secretStep === 3,
            handleUserIconClick,
            handleLogoClick
        };
    } catch (error) {
        console.error('SecretAdminFlow component error:', error);
        reportError(error);
    }
}
