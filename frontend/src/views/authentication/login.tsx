import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/store/actions/auth/login';
import { RootState, AppDispatch } from '@/store';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await dispatch(loginUser({ email, password }));
            if (userData) {
                navigate('/');
            }
        } catch (err) {
            console.error('Login failed', err);
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
                            <Label htmlFor="email" className="block text-sm font-medium text-[#061A40]">
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                size="medium"
                                variant="default"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium text-[#061A40]">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                size="medium"
                                variant="default"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

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
                    {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
                </form>
            </div>
        </div>
    );
}
