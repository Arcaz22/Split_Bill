import { useState, useEffect } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarUploadProps } from '../interface/avatar-upload.interface';
import { Button } from '@/components/ui/button';
import defaultAvatar from '@/assets/user.png';

export default function AvatarUpload({ avatar: initialAvatarUrl, onAvatarChange }: AvatarUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        if (initialAvatarUrl) {
            setAvatarUrl(initialAvatarUrl);
        }
    }, [initialAvatarUrl]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onAvatarChange(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        if (avatarUrl) {
            const downloadUrl = avatarUrl.replace("preview", "download");
            window.open(downloadUrl, '_blank');
        }
    };

    return (
        <div className="relative">
            <Avatar size="lg" ring="blue" rotate={true}>
                {avatarUrl ? (
                    <AvatarImage
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <AvatarImage
                        src={defaultAvatar}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                    />
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

            <Button
                onClick={handleDownload}
                className="absolute -bottom-2 left-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm10 14h-4m4-4h-4m2-2V8m4 4l-4-4-4 4" />
                </svg>
            </Button>
        </div>
    );
}
