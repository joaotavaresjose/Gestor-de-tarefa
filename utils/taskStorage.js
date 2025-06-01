const TaskStorage = {
    getTasks: () => {
        try {
            const tasks = localStorage.getItem('tasks');
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            return [];
        }
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            TaskStorage.scheduleNotifications(tasks);
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    createTask: (taskData) => {
        return {
            id: TaskStorage.generateId(),
            title: taskData.title,
            description: taskData.description || '',
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || '',
            dueTime: taskData.dueTime || '',
            completed: false,
            createdAt: new Date().toISOString()
        };
    },

    getTaskStats: (tasks) => {
        return {
            total: tasks.length,
            completed: tasks.filter(task => task.completed).length,
            pending: tasks.filter(task => !task.completed).length,
            highPriority: tasks.filter(task => task.priority === 'high' && !task.completed).length
        };
    },

    scheduleNotifications: (tasks) => {
        try {
            TaskStorage.clearScheduledNotifications();
            
            tasks.forEach(task => {
                if (task.completed || !task.dueDate) return;

                const now = new Date();
                const dueDateTime = new Date(task.dueDate);
                
                if (task.dueTime) {
                    const [hours, minutes] = task.dueTime.split(':');
                    dueDateTime.setHours(parseInt(hours), parseInt(minutes));
                } else {
                    dueDateTime.setHours(9, 0);
                }

                const timeUntilDue = dueDateTime.getTime() - now.getTime();
                
                if (timeUntilDue > 0 && timeUntilDue <= 7 * 24 * 60 * 60 * 1000) {
                    const timeoutId = setTimeout(() => {
                        TaskStorage.sendTaskDueNotification(task);
                    }, timeUntilDue);
                    
                    TaskStorage.addScheduledNotification(task.id, timeoutId);
                }
            });
        } catch (error) {
            console.error('Erro ao agendar notificações:', error);
        }
    },

    sendTaskDueNotification: (task) => {
        try {
            const title = '⚠️ TAREFA VENCENDO AGORA!';
            const message = `A tarefa "${task.title}" precisa ser concluída agora. Não perca o prazo!`;
            
            NotificationStorage.addNotification(title, message, task.id, true);
            
            TaskStorage.showUrgentAlert(task);
        } catch (error) {
            console.error('Erro ao enviar notificação de tarefa vencida:', error);
        }
    },

    showUrgentAlert: (task) => {
        try {
            if (document.hasFocus()) {
                const alertDiv = document.createElement('div');
                alertDiv.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-pulse';
                alertDiv.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-exclamation-triangle text-yellow-300"></i>
                        <div>
                            <div class="font-bold">TAREFA VENCENDO!</div>
                            <div class="text-sm">${task.title}</div>
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                
                document.body.appendChild(alertDiv);
                
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 10000);
            }
        } catch (error) {
            console.error('Erro ao mostrar alerta urgente:', error);
        }
    },

    addScheduledNotification: (taskId, timeoutId) => {
        try {
            const scheduled = JSON.parse(localStorage.getItem('scheduledNotifications') || '{}');
            scheduled[taskId] = timeoutId;
            localStorage.setItem('scheduledNotifications', JSON.stringify(scheduled));
        } catch (error) {
            console.error('Erro ao salvar notificação agendada:', error);
        }
    },

    clearScheduledNotifications: () => {
        try {
            const scheduled = JSON.parse(localStorage.getItem('scheduledNotifications') || '{}');
            Object.values(scheduled).forEach(timeoutId => {
                if (timeoutId) clearTimeout(timeoutId);
            });
            localStorage.removeItem('scheduledNotifications');
        } catch (error) {
            console.error('Erro ao limpar notificações agendadas:', error);
        }
    }
};
