function ProfileModal({ user, onUpdateProfile, onClose }) {
    try {
        const [name, setName] = React.useState(user.name);
        const [email, setEmail] = React.useState(user.email);
        const [avatar, setAvatar] = React.useState(user.avatar || '');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            if (!name || !email) {
                setError('Preencha todos os campos');
                setLoading(false);
                return;
            }

            try {
                const updatedUser = { ...user, name, email, avatar };
                const success = await AuthStorage.updateProfile(updatedUser);
                
                if (success) {
                    onUpdateProfile(updatedUser);
                } else {
                    setError('Erro ao atualizar perfil');
                }
            } catch (err) {
                setError('Erro ao salvar alterações');
            }

            setLoading(false);
        };

        const handleAvatarChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setAvatar(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-name="profile-modal" data-file="components/ProfileModal.js">
                <div className="glass-card rounded-xl p-6 w-full max-w-md bounce-in">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Editar Perfil</h2>
                        <button onClick={onClose} className="text-white/60 hover:text-white">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-center mb-4">
                            <div className="relative inline-block">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden">
                                    {avatar ? (
                                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <i className="fas fa-user text-white text-2xl"></i>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                                    <i className="fas fa-camera text-white text-xs"></i>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm fade-in">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 rounded-lg text-white font-medium disabled:opacity-50"
                        >
                            {loading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                'Salvar Alterações'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProfileModal component error:', error);
        reportError(error);
    }
}
