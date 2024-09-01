import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-6xl sm:text-9xl font-extrabold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-center">Halaman Tidak Ditemukan</h2>
            <p className="text-lg sm:text-xl text-center mb-8 max-w-md">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin telah dipindahkan atau tidak ada.
            </p>
            <Link to="/">
                <Button
                    variant="primary"
                    size="lg"
                >
                    Kembali ke Beranda
                </Button>
            </Link>
        </div>
    );
}
