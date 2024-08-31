import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F0F0F0] font-sans">
            <div className="hidden lg:flex h-full bg-[#061A40] items-center justify-center bg-no-repeat bg-center" style={{ backgroundImage: 'url(/path-to-pattern.png)' }}>
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

                <form className="w-full max-w-md mt-8 space-y-6">
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
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            size="lg"
                            color="secondary"
                            scale={false}
                        >
                            Masuk
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
