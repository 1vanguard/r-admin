import { Login } from 'react-admin';
/* import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin'; */

const LoginPage = () => (
    <Login
        // A random image that changes everyday
        backgroundImage="/assets/images/backgrounds/01.jpg"
    />
);

/* const LoginPage = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </form>
    );
}; */

export default LoginPage;