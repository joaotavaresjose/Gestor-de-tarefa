function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
  const [taskData, setTaskData] = React.useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  // Atualiza campos ao editar uma tarefa
  React.useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate || "",
      });
    } else {
      resetForm();
    }
  }, [editingTask]);

  function resetForm() {
    setTaskData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
  }

  const handleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
      resetForm();
    }
  };

  return (
    <div
      className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/30 fade-in"
      data-name="task-form"
    >
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <i className={`fas ${editingTask ? "fa-pen" : "fa-plus"}`}></i>
        {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Título da tarefa..."
            value={taskData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-transform focus:scale-105"
            required
            autoFocus
          />
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Descrição (opcional)..."
            value={taskData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-transform focus:scale-105 resize-none"
            rows="2"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-transform focus:scale-105"
          >
            <option value="low">Baixa Prioridade</option>
            <option value="medium">Média Prioridade</option>
            <option value="high">Alta Prioridade</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-transform focus:scale-105"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 btn-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!taskData.title.trim()}
          >
            <i className={`fas ${editingTask ? "fa-save" : "fa-plus"} mr-2`}></i>
            {editingTask ? "Salvar" : "Adicionar"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-transform hover:scale-105"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}