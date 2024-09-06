import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { loginUser } from '@/store/actions/auth/login';
import { RootState, AppDispatch } from '@/store';
import FormField from '@/lib/components/form-field';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const userData = await dispatch(loginUser({ email, password }));
            if (userData) {
                navigate('/');
            }
        } catch (err) {
            console.error('Login failed', err);
            setError('Login gagal. Pastikan email dan password benar.');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F0F0F0] font-sans">
            <div className="hidden lg:flex h-full items-center justify-center bg-gradient-to-b from-[#0353A4] to-[#006DAA]">
                <img
                    src="/vite.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="animate-bounce"
                />
            </div>

            <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:px-16">
                <div className="text-center space-y-4">
                    <h1 className="font-extrabold text-4xl text-[#061A40]">
                        Selamat Datang Kembali!
                    </h1>
                    <p className="text-lg text-[#006DAA]">
                        Masuk untuk mengelola pengeluaran bersama
                    </p>
                </div>

                <form className="w-full max-w-md mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <FormField
                                id="email"
                                label="Alamat Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <FormField
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            size="lg"
                            color="secondary"
                            scale={false}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Masuk'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
