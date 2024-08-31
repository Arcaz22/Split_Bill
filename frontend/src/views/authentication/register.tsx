import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { registerUser } from '@/store/actions/auth/register';
import { RootState, AppDispatch } from '@/store';

export default function Register() {
    const dispatch: AppDispatch = useDispatch();
    const registerState = useSelector((state: RootState) => state.register);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null); // Menyimpan file asli
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // Menyimpan URL untuk preview

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file); // Simpan file asli
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarUrl(e.target?.result as string); // Simpan URL untuk preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (avatarFile === null) {
            alert("Please upload an avatar");
            return;
        }

        dispatch(registerUser({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            avatar: avatarFile,
            roleName: "user",
        }));
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
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <Avatar size="md" ring="blue" rotate={true}>
                                {avatarUrl ? (
                                    <AvatarImage src={avatarUrl} alt="Avatar" />
                                ) : (
                                    <AvatarFallback>AV</AvatarFallback>
                                )}
                            </Avatar>
                            <label htmlFor="avatar" className="absolute -bottom-2 right-0 bg-[#FB8500] hover:bg-[#FB8500] text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 21h6a2 2 0 002-2v-4.586a1 1 0 00-.293-.707l-9-9a1 1 0 00-.707-.293H5a2 2 0 00-2 2v6a1 1 0 00.293.707l9 9a1 1 0 00.707.293H9z" />
                                </svg>
                            </label>
                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>
                        <Label htmlFor="avatar" className="mt-2 block text-sm font-medium text-[#061A40]">
                            Unggah Avatar
                        </Label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="block text-sm font-medium text-[#061A40]">
                                Nama Lengkap
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                size="medium"
                                variant="default"
                                onChange={handleInputChange}
                                value={formData.name}
                            />
                        </div>

                        <div>
                            <Label htmlFor="username" className="block text-sm font-medium text-[#061A40]">
                                Username
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                size="medium"
                                variant="default"
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </div>

                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-[#061A40]">
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                size="medium"
                                variant="default"
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone" className="block text-sm font-medium text-[#061A40]">
                                Nomor Ponsel
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                size="medium"
                                variant="default"
                                onChange={handleInputChange}
                                value={formData.phone}
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
                                onChange={handleInputChange}
                                value={formData.password}
                            />
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-[#061A40]">
                                Konfirmasi Kata Sandi
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                size="medium"
                                variant="default"
                                onChange={handleInputChange}
                                value={formData.confirmPassword}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            size="lg"
                            color="secondary"
                            scale={false}
                            disabled={registerState.loading}
                        >
                            {registerState.loading ? 'Processing...' : 'Sign Up'}
                        </Button>
                    </div>

                    {registerState.error && (
                        <div className="text-red-500 mt-4">
                            {registerState.error}
                        </div>
                    )}
                </form>
            </div>
            <div className="hidden lg:flex h-full bg-[#061A40] items-center justify-center bg-no-repeat bg-center" style={{ backgroundImage: 'url(/path-to-pattern.png)' }}>
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
