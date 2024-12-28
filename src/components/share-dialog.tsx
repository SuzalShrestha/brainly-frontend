'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, ArrowUpRight, Waypoints } from 'lucide-react';
import { useShareContent } from '@/api/use-share-content';
import { toast } from 'sonner';
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
import { Input } from '@/components/ui/input';

export function ShareDialog() {
    const [showShareUrl, setShowShareUrl] = useState(false);
    const [copied, setCopied] = useState(false);
    const { mutate: share, data: shareData } = useShareContent();

    const handleShare = () => {
        toast.promise(
            new Promise((resolve) => {
                share(undefined, {
                    onSuccess: () => {
                        setShowShareUrl(true);
                        resolve(true);
                    },
                });
            }),
            {
                loading: 'Generating share link...',
                success: 'Share link generated!',
                error: 'Failed to generate share link',
            }
        );
    };

    const copyToClipboard = async () => {
        if (shareData?.shareUrl) {
            await navigator.clipboard.writeText(shareData.shareUrl);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant='outline'>
                        <Waypoints className='mr-2 h-4 w-4' />
                        Share
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Share Your Notes</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will create a public link to share your notes.
                            Anyone with the link will be able to view them.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setShowShareUrl(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleShare}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showShareUrl} onOpenChange={setShowShareUrl}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Share Link Generated
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Copy this link to share your notes:
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className='flex items-center space-x-2'>
                        <Input
                            readOnly
                            value={shareData?.shareUrl || ''}
                            className='font-mono text-sm'
                        />
                        <Button
                            size='icon'
                            variant='outline'
                            onClick={copyToClipboard}
                        >
                            {copied ? (
                                <Check className='h-4 w-4' />
                            ) : (
                                <Copy className='h-4 w-4' />
                            )}
                        </Button>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => {
                                window.open(shareData?.shareUrl, '_blank');
                            }}
                        >
                            <ArrowUpRight className='h-4 w-4' />
                        </Button>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => setShowShareUrl(false)}
                        >
                            Done
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
