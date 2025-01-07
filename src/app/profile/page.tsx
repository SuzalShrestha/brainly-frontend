'use client';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { AvatarLogin } from '@/components/avatar';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(session?.user?.name || '');

    const handleSave = async () => {
        // Implement save functionality
        setIsEditing(false);
    };

    return (
        <div className='max-w-2xl mx-auto p-4 space-y-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-center space-x-4'>
                        {session?.user?.image && (
                            <AvatarLogin src={session.user.image} name='' />
                        )}
                        <div className='space-y-1'>
                            {isEditing ? (
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='max-w-[300px]'
                                />
                            ) : (
                                <h2 className='text-2xl font-bold'>
                                    {session?.user?.name}
                                </h2>
                            )}
                            <p className='text-sm text-muted-foreground'>
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        {isEditing ? (
                            <div className='space-x-2'>
                                <Button
                                    variant='outline'
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleSave}>
                                    Save Changes
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
