function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
    try {
        const [title, setTitle] = React.useState('');
        const [description, setDescription] = React.useState('');
        const [priority, setPriority] = React.useState('medium');
        const [dueDate, setDueDate] = React.useState('');

        React.useEffect(() => {
            if (editingTask) {
                setTitle(editingTask.title);
                setDescription(editingTask.description);
                setPriority(editingTask.priority);
                setDueDate(editingTask.dueDate);
            }
        }, [editingTask]);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!title.trim()) return;

            const taskData = {
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate
            };

            if (editingTask) {
                onUpdateTask(editingTask.id, taskData);
            } else {
                onAddTask(taskData);
            }

            setTitle('');
            setDescription('');
            setPriority('medium');
            setDueDate('');
        };

        return (
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/30" data-name="task-form" data-file="components/TaskForm.js">
                <h2 className="text-xl font-semibold text-white mb-4">
                    {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Título da tarefa..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Descrição (opcional)..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                            rows="2"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            <option value="low">Baixa Prioridade</option>
                            <option value="medium">Média Prioridade</option>
                            <option value="high">Alta Prioridade</option>
                        </select>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 btn-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            <i className={`fas ${editingTask ? 'fa-save' : 'fa-plus'} mr-2`}></i>
                            {editingTask ? 'Salvar' : 'Adicionar'}
                        </button>
                        {editingTask && (
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        );
    } catch (error) {
        console.error('TaskForm component error:', error);
        reportError(error);
    }
}
