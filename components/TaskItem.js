function TaskItem({ task, onToggle, onDelete, onEdit }) {
    try {
        const getPriorityColor = (priority) => {
            switch (priority) {
                case 'high': return 'text-red-400';
                case 'medium': return 'text-yellow-400';
                case 'low': return 'text-green-400';
                default: return 'text-gray-400';
            }
        };

        const getPriorityText = (priority) => {
            switch (priority) {
                case 'high': return 'Alta';
                case 'medium': return 'Média';
                case 'low': return 'Baixa';
                default: return 'Média';
            }
        };

        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        };

        const isOverdue = (dateString) => {
            if (!dateString) return false;
            const today = new Date();
            const dueDate = new Date(dateString);
            return dueDate < today && !task.completed;
        };

        return (
            <div className={`task-card bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30 priority-${task.priority} fade-in ${task.completed ? 'task-completed' : ''}`} data-name="task-item" data-file="components/TaskItem.js">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                        <button
                            onClick={() => onToggle(task.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                task.completed 
                                    ? 'bg-green-500 border-green-500 text-white' 
                                    : 'border-white/40 hover:border-white/60'
                            }`}
                        >
                            {task.completed && <i className="fas fa-check text-xs"></i>}
                        </button>
                        <div className="flex-1">
                            <h3 className={`font-medium text-white ${task.completed ? 'line-through opacity-70' : ''}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className={`text-sm text-white/70 mt-1 ${task.completed ? 'line-through opacity-70' : ''}`}>
                                    {task.description}
                                </p>
                            )}
                            <div className="flex items-center space-x-4 mt-2 text-xs">
                                <span className={`${getPriorityColor(task.priority)} font-medium`}>
                                    <i className="fas fa-flag mr-1"></i>
                                    {getPriorityText(task.priority)}
                                </span>
                                {task.dueDate && (
                                    <span className={`${isOverdue(task.dueDate) ? 'text-red-400' : 'text-white/60'}`}>
                                        <i className="fas fa-calendar mr-1"></i>
                                        {formatDate(task.dueDate)}
                                        {isOverdue(task.dueDate) && ' (Atrasada)'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        >
                            <i className="fas fa-edit text-sm"></i>
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all"
                        >
                            <i className="fas fa-trash text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TaskItem component error:', error);
        reportError(error);
    }
}
