function App() {
    try {
        const [tasks, setTasks] = React.useState([]);
        const [filter, setFilter] = React.useState('all');
        const [editingTask, setEditingTask] = React.useState(null);

        React.useEffect(() => {
            const savedTasks = TaskStorage.getTasks();
            setTasks(savedTasks);
        }, []);

        const addTask = (taskData) => {
            const newTask = TaskStorage.createTask(taskData);
            const updatedTasks = [newTask, ...tasks];
            setTasks(updatedTasks);
            TaskStorage.saveTasks(updatedTasks);
        };

        const updateTask = (taskId, taskData) => {
            const updatedTasks = tasks.map(task =>
                task.id === taskId
                    ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
                    : task
            );
            setTasks(updatedTasks);
            TaskStorage.saveTasks(updatedTasks);
            setEditingTask(null);
        };

        const toggleTask = (taskId) => {
            const updatedTasks = tasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
                    : task
            );
            setTasks(updatedTasks);
            TaskStorage.saveTasks(updatedTasks);
        };

        const deleteTask = (taskId) => {
            if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
                const updatedTasks = tasks.filter(task => task.id !== taskId);
                setTasks(updatedTasks);
                TaskStorage.saveTasks(updatedTasks);
            }
        };

        const editTask = (task) => {
            setEditingTask(task);
        };

        const cancelEdit = () => {
            setEditingTask(null);
        };

        const taskStats = TaskStorage.getTaskStats(tasks);

        return (
            <div className="min-h-screen" data-name="app" data-file="app.js">
                <Header />
                <main className="container mx-auto px-4 py-8 max-w-4xl">
                    <TaskForm
                        onAddTask={addTask}
                        editingTask={editingTask}
                        onUpdateTask={updateTask}
                        onCancelEdit={cancelEdit}
                    />
                    <FilterBar
                        currentFilter={filter}
                        onFilterChange={setFilter}
                        taskStats={taskStats}
                    />
                    <TaskList
                        tasks={tasks}
                        filter={filter}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={editTask}
                    />
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
