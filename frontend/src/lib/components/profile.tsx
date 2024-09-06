import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormField from '@/lib/components/form-field';
import AvatarUpload from './avatar-upload';
import API from "@/store/actions/api";
import { API_ROUTES } from "@/lib/endpoint";
import { updateUserProfile } from '@/store/actions/user/profil';
import { AppDispatch } from '@/store';

export const Profil = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get(API_ROUTES.USER.PROFILE);
                const { name, username, email, phone, avatar } = response.data;
                setFormData({ name, username, email, phone });
                if (avatar && avatar.previewUrl) {
                    setAvatarPreview(avatar.previewUrl);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key as keyof typeof formData]);
        });
        if (avatarFile) {
            formDataToSend.append("avatar", avatarFile);
        }

        try {
            await dispatch(updateUserProfile(formDataToSend));
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex items-center justify-between gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <AvatarUpload
                            avatar={avatarPreview}
                            onAvatarChange={setAvatarFile}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            id="name"
                            label="Name"
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
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="phone"
                            label="Phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button onClick={handleUpdateProfile} disabled={loading}>
                            {loading ? 'Loading...' : 'Perbarui'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
