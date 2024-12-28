'use client';
import * as React from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { SearchResult, useGetSearch } from '@/api/use-get-search';
import { Badge } from './ui/badge';
import { useDebounce } from 'use-debounce';
import { SearchIcon } from './ui/search-icon';
import { SparklesIcon } from './ui/sparkles';

export function CommandDialogSearch({
    className,
    ...props
}: {
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [showLoader, setShowLoader] = React.useState(false);
    const router = useRouter();
    const [debouncedQuery] = useDebounce(inputValue, 300);

    const { data: searchData, isLoading } = useGetSearch(debouncedQuery);
    const results = searchData?.data || [];

    //open command dialog on ctrl+k or cmd+k
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    //show loader only if loading is more than .5sec
    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isLoading) {
            timeout = setTimeout(() => {
                setShowLoader(true);
            }, 500);
        } else {
            setShowLoader(false);
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    return (
        <div className={cn(className)} {...props}>
            <Button
                variant='outline'
                className={cn(
                    'relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
                )}
                onClick={() => setOpen(true)}
            >
                <SearchIcon />
                <span className='hidden lg:inline-flex'>Search notes...</span>
                <span className='inline-flex lg:hidden'>Search...</span>
                <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={(open) => {
                    setOpen(open);
                    if (!open) setInputValue('');
                }}
            >
                <div className='relative'>
                    <CommandInput
                        placeholder='Search notes, links, tags...'
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    {showLoader && (
                        <div className='absolute right-3 top-4 pr-5'>
                            <Loader2 className='h-4 w-4 animate-spin' />
                        </div>
                    )}
                </div>
                <CommandList>
                    {!inputValue && (
                        <>
                            <CommandGroup heading='Quick Links'>
                                <CommandItem
                                //todo add favorite tab here
                                // onSelect={() =>
                                //     router.push('/dashboard?type=favorite')
                                // }
                                >
                                    <SparklesIcon className='mr-2 h-4 w-4' />
                                    <span>Favorite Notes</span>
                                </CommandItem>
                                <CommandItem
                                //todo add recent tab here
                                // onSelect={() =>
                                //     router.push('/dashboard?type=recent')
                                // }
                                >
                                    <Calendar className='mr-2 h-4 w-4' />
                                    <span>Recent Notes</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    {inputValue && results.length === 0 ? (
                        <CommandEmpty>
                            <div className='flex flex-col items-center py-4'>
                                <SearchIcon />
                                <p>
                                    No results found for &quot;{inputValue}
                                    &quot;
                                </p>
                            </div>
                        </CommandEmpty>
                    ) : null}
                    {inputValue && results.length > 0 && (
                        <CommandGroup
                            heading={`Search Results (${results?.length ?? 0})`}
                        >
                            {results?.map((item: SearchResult) => (
                                <CommandItem
                                    key={item._id}
                                    value={item.title}
                                    onSelect={() => {
                                        router.push(
                                            `/dashboard?type=${item.type}&note=${item._id}`
                                        );
                                        setOpen(false);
                                    }}
                                    className='py-3'
                                >
                                    <div className='flex flex-col space-y-2 w-full'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center font-bold'>
                                                <span className='font-medium'>
                                                    {item.title}
                                                </span>
                                            </div>
                                            <Badge
                                                variant='outline'
                                                className='ml-2'
                                            >
                                                {item.type}
                                            </Badge>
                                        </div>
                                        {item.content && (
                                            <p className='text-sm text-muted-foreground line-clamp-1 truncate'>
                                                {item.content}
                                            </p>
                                        )}
                                        {/* {item.tags && item.tags.length > 0 && (
                                            <div className='flex items-center gap-2 mt-1'>
                                                <Tag className='h-3 w-3 text-muted-foreground' />
                                                <div className='flex gap-1'>
                                                    {item.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant='secondary'
                                                            className='text-xs px-1'
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )} */}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </div>
    );
}
