const AuthStorage = {
    login: async (email, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro no login:', error);
            return false;
        }
    },

    register: async (name, email, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.find(u => u.email === email)) {
                return false;
            }

            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                avatar: '',
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            return true;
        } catch (error) {
            console.error('Erro no cadastro:', error);
            return false;
        }
    },

    updateProfile: async (updatedUser) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.id === updatedUser.id);
            
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return false;
        }
    },

    getCurrentUser: () => {
        try {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Erro ao obter usuário atual:', error);
            return null;
        }
    },

    logout: () => {
        try {
            localStorage.removeItem('currentUser');
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    },

    isLoggedIn: () => {
        return !!AuthStorage.getCurrentUser();
    }
};
