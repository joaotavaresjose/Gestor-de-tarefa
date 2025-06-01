function Header({ user, onLogout, onShowLogin }) {
    try {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
        const [showProfileModal, setShowProfileModal] = React.useState(false);
        const [showNotifications, setShowNotifications] = React.useState(false);
        const [notifications, setNotifications] = React.useState([]);
        const [currentUser, setCurrentUser] = React.useState(user);

        React.useEffect(() => {
            setCurrentUser(user);
        }, [user]);

        React.useEffect(() => {
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
            
            const savedNotifications = NotificationStorage.getNotifications();
            setNotifications(savedNotifications);
            
            const interval = setInterval(() => {
                const updatedNotifications = NotificationStorage.getNotifications();
                setNotifications(updatedNotifications);
            }, 30000);
            
            return () => clearInterval(interval);
        }, []);

        const handleUpdateProfile = (updatedUser) => {
            setCurrentUser(updatedUser);
            setShowProfileModal(false);
            setShowProfileDropdown(false);
        };

        const handleMarkAsRead = (notificationId) => {
            const updatedNotifications = NotificationStorage.markAsRead(notificationId);
            setNotifications(updatedNotifications);
        };

        const handleMarkAllAsRead = () => {
            const updatedNotifications = NotificationStorage.markAllAsRead();
            setNotifications(updatedNotifications);
        };

        return (
            <div data-name="header" data-file="components/Header.js">
                <header className="glass-card sticky top-0 z-50 slide-in">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/20 p-2 rounded-lg bounce-in">
                                    <i className="fas fa-tasks text-white text-xl"></i>
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-white fade-in">
                                    Gestor de Tarefas
                                </h1>
                            </div>

                            <div className="hidden md:flex items-center space-x-4">
                                {currentUser && (
                                    <NotificationBell
                                        notifications={notifications}
                                        onShowNotifications={() => setShowNotifications(true)}
                                    />
                                )}
                                {currentUser ? (
                                    <ProfileDropdown 
                                        user={currentUser} 
                                        onLogout={onLogout}
                                        onShowProfile={() => setShowProfileModal(true)}
                                        show={showProfileDropdown}
                                        onToggle={() => setShowProfileDropdown(!showProfileDropdown)}
                                    />
                                ) : (
                                    <button
                                        onClick={onShowLogin}
                                        className="btn-primary px-4 py-2 rounded-lg text-white font-medium"
                                    >
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Entrar
                                    </button>
                                )}
                            </div>

                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-white p-2"
                                >
                                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                </button>
                            </div>
                        </div>

                        {isMenuOpen && (
                            <div className="md:hidden mt-4 pt-4 border-t border-white/20 fade-in">
                                {currentUser ? (
                                    <div className="space-y-2">
                                        <div className="text-white/80 text-sm">
                                            <i className="fas fa-user-circle mr-2"></i>
                                            {currentUser.name}
                                        </div>
                                        <button
                                            onClick={() => setShowNotifications(true)}
                                            className="w-full text-left text-white/80 py-2 hover:text-white flex items-center justify-between"
                                        >
                                            <span>
                                                <i className="fas fa-bell mr-2"></i>
                                                Notificações
                                            </span>
                                            {notifications.filter(n => !n.read).length > 0 && (
                                                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {notifications.filter(n => !n.read).length}
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => setShowProfileModal(true)}
                                            className="w-full text-left text-white/80 py-2 hover:text-white"
                                        >
                                            <i className="fas fa-user-edit mr-2"></i>
                                            Editar Perfil
                                        </button>
                                        <button
                                            onClick={onLogout}
                                            className="w-full text-left text-white/80 py-2 hover:text-white"
                                        >
                                            <i className="fas fa-sign-out-alt mr-2"></i>
                                            Sair
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={onShowLogin}
                                        className="w-full btn-primary py-2 rounded-lg text-white font-medium"
                                    >
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Entrar
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {showProfileModal && (
                    <ProfileModal
                        user={currentUser}
                        onUpdateProfile={handleUpdateProfile}
                        onClose={() => setShowProfileModal(false)}
                    />
                )}

                {showNotifications && (
                    <NotificationPage
                        notifications={notifications}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAllAsRead={handleMarkAllAsRead}
                        onClose={() => setShowNotifications(false)}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
