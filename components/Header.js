function Header() {
    try {
        return (
            <header 
                data-name="header" 
                data-file="components/Header.js"
                className="glass-effect rounded-xl p-6 glow fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur-lg"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-3 rounded-lg bounce-in">
                            <i className="fas fa-tasks text-2xl text-white floating-icon"></i>
                        </div>
                        <div className="fade-in">
                            <h1 className="text-2xl font-bold text-white">Gestor de Tarefas</h1>
                            <p className="text-white/80">Organize suas atividades</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4 text-white/80 fade-in">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-calendar-day floating-icon"></i>
                            <span>{new Date().toLocaleDateString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error("Erro no componente Header:", error);
    }
}