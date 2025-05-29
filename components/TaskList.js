function TaskList({ tasks, filter, onToggle, onDelete, onEdit }) {
    try {
        const filteredTasks = tasks.filter(task => {
            switch (filter) {
                case 'completed':
                    return task.completed;
                case 'pending':
                    return !task.completed;
                case 'high':
                    return task.priority === 'high' && !task.completed;
                default:
                    return true;
            }
        });

        if (filteredTasks.length === 0) {
            return (
                <div className="text-center py-12" data-name="empty-state" data-file="components/TaskList.js">
                    <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-clipboard-list text-white/60 text-2xl"></i>
                    </div>
                    <h3 className="text-white/80 text-lg font-medium mb-2">
                        {filter === 'completed' ? 'Nenhuma tarefa concluída' :
                         filter === 'pending' ? 'Nenhuma tarefa pendente' :
                         filter === 'high' ? 'Nenhuma tarefa de alta prioridade' :
                         'Nenhuma tarefa encontrada'}
                    </h3>
                    <p className="text-white/60">
                        {filter === 'all' && 'Comece adicionando sua primeira tarefa!'}
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-3" data-name="task-list" data-file="components/TaskList.js">
                {filteredTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('TaskList component error:', error);
        reportError(error);
    }
}
