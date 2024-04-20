import Vote from "@/components/Vote";

// Hooks
import { useAuth } from '@/stores/user/auth.store';
import { usePlanningContext } from "@/hooks/planning";

export const Players = () => {
    const user = useAuth(state => state.user);
    const votes = usePlanningContext(state => state.votes);
    const players = usePlanningContext(state => state.players);
    const revealed = usePlanningContext(state => state.revealed);

    return (
        <div className="flex gap-3 items-center justify-center">
            {
                user && players
                    .map(player => {
                        const vote = votes.find(v => v.playerId === player.id);

                        return (
                            <Vote
                                key={player.id}
                                label={player.name}
                                voteValue={vote?.value}
                                revealed={revealed}
                            />
                        )
                    })
            }
        </div>
    );
}