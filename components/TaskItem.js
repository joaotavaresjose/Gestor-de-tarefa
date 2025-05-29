function TaskItem({ task, onToggle, onDelete, onEdit }) {
  try {
    if (!task || typeof task !== "object") {
      throw new Error("Dados inválidos para TaskItem");
    }

    const priorityMap = {
      high: { color: "text-red-400", label: "Alta" },
      medium: { color: "text-yellow-400", label: "Média" },
      low: { color: "text-green-400", label: "Baixa" },
      default: { color: "text-gray-400", label: "Média" },
    };

    const { color: priorityColor, label: priorityText } =
      priorityMap[task.priority] || priorityMap.default;

    const formatDate = (dateString) =>
      dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "";

    const isOverdue = (dateString) => {
      if (!dateString || task.completed) return false;
      return new Date(dateString).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    };

    return (
      <article
        className={`task-card bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30 fade-in transition-all ${
          task.completed ? "task-completed opacity-70" : ""
        }`}
        aria-label={`Tarefa: ${task.title}${task.completed ? " (Concluída)" : ""}`}
      >
        <div className="flex justify-between items-start gap-3">
          {/* Parte esquerda: checkbox + conteúdo */}
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={() => onToggle(task.id)}
              aria-label={task.completed ? "Desmarcar concluída" : "Marcar como concluída"}
              className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-transform focus:ring-2 ${
                task.completed ? "bg-green-500 border-green-500 text-white scale-105" : "border-white/40 hover:scale-110"
              }`}
            >
              {task.completed && <i className="fas fa-check text-xs" />}
            </button>

            {/* Conteúdo da tarefa */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-white font-medium ${task.completed ? "line-through opacity-70" : ""}`}>
                {task.title}
              </h3>

              {task.description && (
                <p className={`text-sm text-white/70 mt-1 ${task.completed ? "line-through opacity-70" : ""}`}>
                  {task.description}
                </p>
              )}

              {/* Detalhes: prioridade + data */}
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className={`${priorityColor} font-medium flex items-center`}>
                  <i className="fas fa-flag mr-1"></i> {priorityText}
                </span>

                {task.dueDate && (
                  <span className={`flex items-center ${isOverdue(task.dueDate) ? "text-red-400" : "text-white/60"}`}>
                    <i className="fas fa-calendar mr-1"></i> {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate) && <span> (Atrasada)</span>}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <button
              onClick={() => onEdit(task)}
              aria-label={`Editar: ${task.title}`}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-transform hover:scale-110"
            >
              <i className="fas fa-edit text-sm"></i>
            </button>

            <button
              onClick={() => onDelete(task.id)}
              aria-label={`Excluir: ${task.title}`}
              className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-transform hover:scale-110"
            >
              <i className="fas fa-trash text-sm"></i>
            </button>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Erro no componente TaskItem:", error);
  }
}