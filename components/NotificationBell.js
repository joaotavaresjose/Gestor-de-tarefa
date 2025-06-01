function NotificationBell({ notifications, onShowNotifications }) {
    try {
        const unreadCount = notifications.filter(n => !n.read).length;

        return (
            <div className="relative" data-name="notification-bell" data-file="components/NotificationBell.js">
                <button
                    onClick={onShowNotifications}
                    className="relative p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                    <i className="fas fa-bell text-lg"></i>
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
            </div>
        );
    } catch (error) {
        console.error('NotificationBell component error:', error);
        reportError(error);
    }
}
