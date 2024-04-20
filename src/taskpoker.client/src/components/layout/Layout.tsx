import { PropsWithChildren } from 'react';

// Icons
import { LogOut } from 'lucide-react';

// Components
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

// Hooks
import { useAuth } from "@/stores/user/auth.store"

export const Layout = ({ children }: PropsWithChildren) => {
    const user = useAuth(state => state.user);
    const clear = useAuth(state => state.clear);

    return (
        <div className='h-svh grid grid-rows-[64px,auto]'>
            <div className='shadow h-16 bg-primary dark:bg-inherit dark:border-b dark:border-secondary'>
                <nav className='h-full p-2 flex gap-1 items-center'>
                    <span className='flex-1 text-slate-50 font-bold'>
                        Task Poker
                    </span>
                    <ThemeToggle />
                    {
                        user &&
                        <Button
                            size='icon'
                            variant='outline'
                            onClick={() => clear()}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    }
                </nav>
            </div>
            <div className='container h-full'>
                {children}
            </div>
        </div>
    )
}