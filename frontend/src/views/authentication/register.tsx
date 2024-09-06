import { useState } from 'react';
import { registerUser } from '@/store/actions/auth/register';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    RootState,
    AppDispatch
} from '@/store';
// import AvatarUpload from '@/lib/components/avatar-upload';
import FormField from '@/lib/components/form-field';

export default function Register() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const registerState = useSelector((state: RootState) => state.register);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [avatarFile] = useState<File | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const resultAction = await dispatch(registerUser({
            ...formData,
            avatar: avatarFile,
            roleName: "user",
        }));

        unwrapResult(resultAction);
        navigate('/login');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F0F0F0] font-sans">
            <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:px-16">
                <div className="text-center space-y-4">
                    <h1 className="font-extrabold text-4xl text-[#061A40]">
                        Bergabung Sekarang!
                    </h1>
                    <p className="text-lg text-[#006DAA]">
                        Registrasi sekarang untuk berbagi biaya dengan mudah
                    </p>
                </div>

                <form className="w-full max-w-md mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* <AvatarUpload onAvatarChange={setAvatarFile} /> */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            id="name"
                            label="Nama Lengkap"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="username"
                            label="Username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="email"
                            label="Alamat Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="phone"
                            label="Nomor Ponsel"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="confirmPassword"
                            label="Konfirmasi Kata Sandi"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            size="lg"
                            color="secondary"
                            scale={false}
                            disabled={registerState.loading}
                        >
                            {registerState.loading ? 'Proses...' : 'Daftar'}
                        </Button>
                    </div>

                </form>
            </div>
            <div
                className="hidden lg:flex h-full items-center justify-center
                bg-gradient-to-b from-[#0353A4] to-[#006DAA]"
            >
                <img
                    src="/vite.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="animate-bounce"
                />
            </div>
        </div>
    );
}
