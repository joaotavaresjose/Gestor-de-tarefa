function RegisterForm({ onRegister, onShowLogin, onClose }) {
    try {
        const [name, setName] = React.useState('');
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [confirmPassword, setConfirmPassword] = React.useState('');
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            if (!name || !email || !password || !confirmPassword) {
                setError('Preencha todos os campos');
                setLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setError('As senhas não coincidem');
                setLoading(false);
                return;
            }

            if (password.length < 6) {
                setError('A senha deve ter pelo menos 6 caracteres');
                setLoading(false);
                return;
            }

            try {
                const success = await AuthStorage.register(name, email, password);
                if (success) {
                    const user = AuthStorage.getCurrentUser();
                    onRegister(user);
                } else {
                    setError('Email já cadastrado');
                }
            } catch (err) {
                setError('Erro ao criar conta');
            }

            setLoading(false);
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-name="register-form" data-file="components/RegisterForm.js">
                <div className="glass-card rounded-xl p-6 w-full max-w-md bounce-in">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Cadastrar</h2>
                        <button onClick={onClose} className="text-white/60 hover:text-white">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div>
                            <input
                                type="password"
                                placeholder="Senha (mín. 6 caracteres)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirmar senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                'Cadastrar'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={onShowLogin}
                            className="text-white/80 hover:text-white text-sm"
                        >
                            Já tem conta? <span className="underline">Faça login</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RegisterForm component error:', error);
        reportError(error);
    }
}
