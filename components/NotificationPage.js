function NotificationPage({ notifications, onMarkAsRead, onMarkAllAsRead, onClose }) {
    try {
        const unreadNotifications = notifications.filter(n => !n.read);
        const readNotifications = notifications.filter(n => n.read);

        const formatNotificationTime = (timestamp) => {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Agora';
            if (diffMins < 60) return `${diffMins}min atrás`;
            if (diffHours < 24) return `${diffHours}h atrás`;
            return `${diffDays}d atrás`;
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-name="notification-page" data-file="components/NotificationPage.js">
                <div className="glass-card rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden bounce-in">
                    <div className="flex justify-between items-center p-6 border-b border-white/20">
                        <h2 className="text-2xl font-bold text-white">
                            <i className="fas fa-bell mr-2"></i>
                            Notificações
                        </h2>
                        <div className="flex items-center space-x-2">
                            {unreadNotifications.length > 0 && (
                                <button
                                    onClick={onMarkAllAsRead}
                                    className="text-sm text-white/80 hover:text-white px-3 py-1 rounded-lg hover:bg-white/10"
                                >
                                    Marcar todas como lidas
                                </button>
                            )}
                            <button onClick={onClose} className="text-white/60 hover:text-white p-2">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-96 p-6">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-bell-slash text-white/60 text-2xl"></i>
                                </div>
                                <h3 className="text-white/80 text-lg font-medium mb-2">
                                    Nenhuma notificação
                                </h3>
                                <p className="text-white/60">
                                    Você não tem notificações no momento.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {unreadNotifications.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-medium mb-3">Não lidas</h3>
                                        {unreadNotifications.map(notification => (
                                            <div
                                                key={notification.id}
                                                className={`rounded-lg p-4 cursor-pointer hover:bg-white/15 transition-colors ${
                                                    notification.isTaskDue 
                                                        ? 'bg-red-500/20 border-l-4 border-red-500 animate-pulse' 
                                                        : 'bg-white/10 border-l-4 border-blue-500'
                                                }`}
                                                onClick={() => onMarkAsRead(notification.id)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className={`font-medium ${notification.isTaskDue ? 'text-red-300' : 'text-white'}`}>
                                                            {notification.isTaskDue && <i className="fas fa-exclamation-triangle mr-2"></i>}
                                                            {notification.title}
                                                        </h4>
                                                        <p className={`text-sm mt-1 ${notification.isTaskDue ? 'text-red-200' : 'text-white/70'}`}>
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                    <span className="text-white/60 text-xs ml-4">
                                                        {formatNotificationTime(notification.timestamp)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {readNotifications.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-medium mb-3 mt-6">Lidas</h3>
                                        {readNotifications.map(notification => (
                                            <div
                                                key={notification.id}
                                                className="bg-white/5 rounded-lg p-4 border-l-4 border-white/20"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="text-white/70 font-medium">{notification.title}</h4>
                                                        <p className="text-white/50 text-sm mt-1">{notification.message}</p>
                                                    </div>
                                                    <span className="text-white/40 text-xs ml-4">
                                                        {formatNotificationTime(notification.timestamp)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('NotificationPage component error:', error);
        reportError(error);
    }
}


