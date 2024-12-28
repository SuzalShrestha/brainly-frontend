'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DeleteIcon } from './ui/delete';

interface DeleteAlertProps {
    onDelete: () => void;
    isLoading?: boolean;
}

export function DeleteAlert({ onDelete, isLoading }: DeleteAlertProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        onDelete();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant='ghost'
                    className='w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10'
                    disabled={isLoading}
                >
                    <DeleteIcon className='mr-2 h-4 w-4' />
                    {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your note and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className='bg-destructive hover:bg-destructive/90'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
