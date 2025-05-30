function StatsSection({ taskStats }) {
    try {
        const progressPercentage = taskStats.total > 0 ? 
            Math.round((taskStats.completed / taskStats.total) * 100) : 0;

        const stats = [
            {
                title: 'Total de Tarefas',
                value: taskStats.total,
                icon: 'fa-list-check',
                color: 'text-blue-400',
                bgColor: 'bg-blue-500/20'
            },
            {
                title: 'Concluídas',
                value: taskStats.completed,
                icon: 'fa-check-circle',
                color: 'text-green-400',
                bgColor: 'bg-green-500/20'
            },
            {
                title: 'Pendentes',
                value: taskStats.pending,
                icon: 'fa-clock',
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-500/20'
            },
            {
                title: 'Alta Prioridade',
                value: taskStats.highPriority,
                icon: 'fa-exclamation-triangle',
                color: 'text-red-400',
                bgColor: 'bg-red-500/20'
            }
        ];

        return (
            <div className="mb-8 space-y-6" data-name="stats-section" data-file="components/StatsSection.js">
                <div className="glass-card rounded-xl p-6 fade-in">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        <i className="fas fa-chart-bar mr-2"></i>
                        Estatísticas
                    </h2>
                    
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/80">Progresso Geral</span>
                            <span className="text-white font-bold">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                            <div 
                                className="progress-bar bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div 
                                key={stat.title}
                                className={`stat-card glass-card rounded-lg p-4 text-center bounce-in`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                                    <i className={`fas ${stat.icon} text-lg`}></i>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-white/70 text-sm">
                                    {stat.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StatsSection component error:', error);
        reportError(error);
    }
}
