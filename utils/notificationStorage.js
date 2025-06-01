const NotificationStorage = {
    getNotifications: () => {
        try {
            const notifications = localStorage.getItem('notifications');
            return notifications ? JSON.parse(notifications) : [];
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
            return [];
        }
    },

    saveNotifications: (notifications) => {
        try {
            localStorage.setItem('notifications', JSON.stringify(notifications));
        } catch (error) {
            console.error('Erro ao salvar notificações:', error);
        }
    },

    addNotification: (title, message, taskId = null, isTaskDue = false) => {
        try {
            const notifications = NotificationStorage.getNotifications();
            const newNotification = {
                id: Date.now().toString(),
                title,
                message,
                taskId,
                timestamp: new Date().toISOString(),
                read: false,
                isTaskDue
            };
            
            notifications.unshift(newNotification);
            NotificationStorage.saveNotifications(notifications);
            
            if (isTaskDue) {
                NotificationStorage.playTaskDueAlert();
            } else {
                NotificationStorage.playNotificationSound();
            }
            
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(title, {
                    body: message,
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ef4444"><path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/></svg>',
                    requireInteraction: isTaskDue
                });
            }
            
            return newNotification;
        } catch (error) {
            console.error('Erro ao adicionar notificação:', error);
        }
    },

    markAsRead: (notificationId) => {
        try {
            const notifications = NotificationStorage.getNotifications();
            const updatedNotifications = notifications.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
            );
            NotificationStorage.saveNotifications(updatedNotifications);
            return updatedNotifications;
        } catch (error) {
            console.error('Erro ao marcar como lida:', error);
            return NotificationStorage.getNotifications();
        }
    },

    markAllAsRead: () => {
        try {
            const notifications = NotificationStorage.getNotifications();
            const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
            NotificationStorage.saveNotifications(updatedNotifications);
            return updatedNotifications;
        } catch (error) {
            console.error('Erro ao marcar todas como lidas:', error);
            return NotificationStorage.getNotifications();
        }
    },

    playTaskDueAlert: () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            const playBeep = (frequency, startTime, duration) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, startTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            };
            
            const now = audioContext.currentTime;
            playBeep(1000, now, 0.3);
            playBeep(800, now + 0.35, 0.3);
            playBeep(1000, now + 0.7, 0.3);
            playBeep(1200, now + 1.05, 0.4);
            
        } catch (error) {
            console.error('Erro ao reproduzir alerta de tarefa:', error);
        }
    },

    playNotificationSound: () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.error('Erro ao reproduzir som:', error);
        }
    }
};
