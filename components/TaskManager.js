
function TaskManager({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
    try {
        const [filter, setFilter] = React.useState("all");
        const [sortBy, setSortBy] = React.useState("created");

        const filterTasks = (task) => {
            return (
                filter === "all" ||
                (filter === "completed" && task.completed) ||
                (filter === "pending" && !task.completed) ||
                (filter === "high" && task.priority === "high") ||
                (filter === "medium" && task.priority === "medium") ||
                (filter === "low" && task.priority === "low")
            );
        };

        const sortTasks = (a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return sortBy === "priority"
                ? priorityOrder[b.priority] - priorityOrder[a.priority]
                : sortBy === "dueDate"
                ? (!a.dueDate ? 1 : !b.dueDate ? -1 : new Date(a.dueDate) - new Date(b.dueDate))
                : new Date(b.createdAt) - new Date(a.createdAt);
        };

        const filteredSortedTasks = tasks.filter(filterTasks).sort(sortTasks);

        return (
            <div data-name="task-manager" data-file="components/TaskManager.js" className="glass-effect rounded-xl p-6 fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">
                        <i className="fas fa-list-ul mr-2 floating-icon"></i> Suas Tarefas ({filteredSortedTasks.length})
                    </h2>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-white/30 focus:scale-105 transition-all button-hover"
                            aria-label="Filtrar tarefas"
                        >
                            {["all", "pending", "completed", "high", "medium", "low"].map((option) => (
                                <option key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-white/30 focus:scale-105 transition-all button-hover"
                            aria-label="Ordenar tarefas"
                        >
                            {["created", "priority", "dueDate"].map((option) => (
                                <option key={option} value={option}>
                                    {option === "created" ? "Data de Criação" : option === "priority" ? "Prioridade" : "Data de Vencimento"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {filteredSortedTasks.length === 0 ? (
                    <div className="text-center py-12 fade-in">
                        <i className="fas fa-clipboard-list text-4xl text-white/30 mb-4 bounce-in"></i>
                        <p className="text-white/60 text-lg">{filter === "all" ? "Nenhuma tarefa encontrada" : "Nenhuma tarefa corresponde ao filtro"}</p>
                        <p className="text-white/40 text-sm mt-2">{filter === "all" ? "Adicione sua primeira tarefa acima!" : "Tente alterar os filtros"}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredSortedTasks.map((task, index) => (
                            <div key={task.objectId} style={{ animationDelay: `${index * 0.1}s` }} className="fade-in">
                                <TaskItem task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Erro no componente TaskManager:", error);
    }
}