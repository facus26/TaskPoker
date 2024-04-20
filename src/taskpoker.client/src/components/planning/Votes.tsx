import { Button } from '@/components/ui/button';

// Hooks
import { useAuth } from '@/stores/user/auth.store';
import { usePlanningContext } from "@/hooks/planning";

// Hooks
const sequence = [
    0,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34
]

export const Votes = () => {
    const user = useAuth(state => state.user);
    const Vote = usePlanningContext(state => state.Vote);
    const votes = usePlanningContext(state => state.votes);

    const handleSelected = (value: number) => {
        if (!user) return;

        Vote({ playerId: user.id, value: value });
    }

    return (
        <div>
            <p className='mb-4 text-center'>Choose your card 👇</p>
            <div className='flex gap-3 justify-center'>
                {
                    sequence.map(item => {
                        const currentVote = votes.find(v => v.playerId == user?.id);

                        const className = item === currentVote?.value
                            ? 'text-primary-foreground text-lg font-bold border-primary bg-primary hover:text-primary-foreground hover:bg-primary transition duration-100 -translate-y-2 dark:border-secondary dark:bg-slate-800 dark:text-secondary-foreground'
                            : 'text-primary text-lg font-bold border-primary hover:text-primary hover:bg-rose-200 transition duration-100 hover:-translate-y-0.5 dark:border-secondary dark:bg-slate-700 dark:hover:bg-slate-800';

                        return (
                            <Button
                                key={item}
                                variant="outline"
                                className={className}
                                onClick={() => handleSelected(item)}
                                style={{
                                    width: 44,
                                    height: 73
                                }}
                            >
                                {item}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    );
}