function LoginForm({ onLogin, onShowRegister, onClose }) {
    try {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            if (!email || !password) {
                setError('Preencha todos os campos');
                setLoading(false);
                return;
            }

            try {
                const success = await AuthStorage.login(email, password);
                if (success) {
                    const user = AuthStorage.getCurrentUser();
                    onLogin(user);
                } else {
                    setError('Email ou senha incorretos');
                }
            } catch (err) {
                setError('Erro ao fazer login');
            }

            setLoading(false);
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-name="login-form" data-file="components/LoginForm.js">
                <div className="glass-card rounded-xl p-6 w-full max-w-md bounce-in">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Entrar</h2>
                        <button onClick={onClose} className="text-white/60 hover:text-white">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                'Entrar'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={onShowRegister}
                            className="text-white/80 hover:text-white text-sm"
                        >
                            Não tem conta? <span className="underline">Cadastre-se</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
    }
}
