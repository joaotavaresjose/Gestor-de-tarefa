function App() {
    try {
        const [tasks, setTasks] = React.useState([]);
        const [filter, setFilter] = React.useState('all');
        const [editingTask, setEditingTask] = React.useState(null);
        const [user, setUser] = React.useState(null);
        const [showLogin, setShowLogin] = React.useState(false);
        const [showRegister, setShowRegister] = React.useState(false);

        React.useEffect(() => {
            const currentUser = AuthStorage.getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                const savedTasks = TaskStorage.getTasks();
                setTasks(savedTasks);
            }
        }, []);

        const handleLogin = (userData) => {
            setUser(userData);
            setShowLogin(false);
            const savedTasks = TaskStorage.getTasks();
            setTasks(savedTasks);
        };

        const handleRegister = (userData) => {
            setUser(userData);
            setShowRegister(false);
            setTasks([]);
        };

        const handleLogout = () => {
            AuthStorage.logout();
            setUser(null);
            setTasks([]);
            setEditingTask(null);
        };

        const addTask = (taskData) => {
            if (!user) return;
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
                <Header 
                    user={user}
                    onLogout={handleLogout}
                    onShowLogin={() => setShowLogin(true)}
                />
                
                <main className="container mx-auto px-4 py-8 max-w-4xl">
                    {user ? (
                        <div className="space-y-6">
                            <StatsSection taskStats={taskStats} />
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
                        </div>
                    ) : (
                        <div className="text-center py-20 fade-in">
                            <div className="bg-white/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 bounce-in">
                                <i className="fas fa-tasks text-white text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Bem-vindo ao Gestor de Tarefas
                            </h2>
                            <p className="text-white/80 mb-8 max-w-md mx-auto">
                                Organize suas tarefas de forma simples e eficiente. 
                                Faça login ou cadastre-se para começar.
                            </p>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="btn-primary px-8 py-3 rounded-lg text-white font-medium mr-4"
                            >
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                Entrar
                            </button>
                        </div>
                    )}
                </main>

                {showLogin && (
                    <LoginForm
                        onLogin={handleLogin}
                        onShowRegister={() => {
                            setShowLogin(false);
                            setShowRegister(true);
                        }}
                        onClose={() => setShowLogin(false)}
                    />
                )}

                {showRegister && (
                    <RegisterForm
                        onRegister={handleRegister}
                        onShowLogin={() => {
                            setShowRegister(false);
                            setShowLogin(true);
                        }}
                        onClose={() => setShowRegister(false)}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
