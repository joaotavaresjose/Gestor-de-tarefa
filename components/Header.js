function Header({ user, onLogout, onShowLogin }) {
    try {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

        return (
            <header className="glass-card sticky top-0 z-50 slide-in" data-name="header" data-file="components/Header.js">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-lg bounce-in">
                                <i className="fas fa-tasks text-white text-xl"></i>
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold text-white fade-in">
                                Gestor de Tarefas
                            </h1>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <ProfileDropdown 
                                    user={user} 
                                    onLogout={onLogout}
                                    show={showProfileDropdown}
                                    onToggle={() => setShowProfileDropdown(!showProfileDropdown)}
                                />
                            ) : (
                                <button
                                    onClick={onShowLogin}
                                    className="btn-primary px-4 py-2 rounded-lg text-white font-medium"
                                >
                                    <i className="fas fa-sign-in-alt mr-2"></i>
                                    Entrar
                                </button>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white p-2"
                            >
                                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pt-4 border-t border-white/20 fade-in">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="text-white/80 text-sm">
                                        <i className="fas fa-user-circle mr-2"></i>
                                        {user.name}
                                    </div>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left text-white/80 py-2 hover:text-white"
                                    >
                                        <i className="fas fa-sign-out-alt mr-2"></i>
                                        Sair
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={onShowLogin}
                                    className="w-full btn-primary py-2 rounded-lg text-white font-medium"
                                >
                                    <i className="fas fa-sign-in-alt mr-2"></i>
                                    Entrar
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
