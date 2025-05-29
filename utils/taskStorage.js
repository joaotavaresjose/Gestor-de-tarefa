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
    }
};
