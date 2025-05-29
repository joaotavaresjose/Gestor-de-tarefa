

export default App;

function FilterBar({ currentFilter, onFilterChange, taskStats }) {
    try {
        const filters = [
            { key: 'all', label: 'Todas', icon: 'fa-list', count: taskStats.total },
            { key: 'pending', label: 'Pendentes', icon: 'fa-clock', count: taskStats.pending },
            { key: 'completed', label: 'Concluídas', icon: 'fa-check-circle', count: taskStats.completed },
            { key: 'high', label: 'Alta Prioridade', icon: 'fa-exclamation-circle', count: taskStats.highPriority }
        ];

        return (
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/30" data-name="filter-bar" data-file="components/FilterBar.js">
                <div className="flex flex-wrap gap-2">
                    {filters.map(filter => (
                        <button
                            key={filter.key}
                            onClick={() => onFilterChange(filter.key)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                currentFilter === filter.key
                                    ? 'bg-white/30 text-white shadow-lg'
                                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                        >
                            <i className={`fas ${filter.icon} text-sm`}></i>
                            <span>{filter.label}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                currentFilter === filter.key
                                    ? 'bg-white/20'
                                    : 'bg-white/10'
                            }`}>
                                {filter.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('FilterBar component error:', error);
        reportError(error);
    }
}

