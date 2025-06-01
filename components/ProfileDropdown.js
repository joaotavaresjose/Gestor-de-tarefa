function ProfileDropdown({ user, onLogout, onShowProfile, show, onToggle }) {
    try {
        const dropdownRef = React.useRef(null);

        React.useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    onToggle();
                }
            };

            if (show) {
                document.addEventListener('mousedown', handleClickOutside);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [show, onToggle]);

        return (
            <div className="relative" ref={dropdownRef} data-name="profile-dropdown" data-file="components/ProfileDropdown.js">
                <button
                    onClick={onToggle}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <i className="fas fa-user text-sm"></i>
                        )}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                    <i className={`fas fa-chevron-${show ? 'up' : 'down'} text-xs`}></i>
                </button>

                {show && (
                    <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg py-2 scale-in">
                        <div className="px-4 py-2 border-b border-white/20">
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-white/60 text-sm">{user.email}</p>
                        </div>
                        <button
                            onClick={onShowProfile}
                            className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <i className="fas fa-user-edit mr-2"></i>
                            Editar Perfil
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Sair
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ProfileDropdown component error:', error);
        reportError(error);
    }
}
