import { Button } from '@/components/ui/button';
import Vote from "@/components/Vote";

// Hooks
import { useAuth } from '@/stores/user/auth.store';
import { usePlanningContext } from '@/hooks/planning';

export const Table = () => {
    const user = useAuth(state => state.user);
    const valid = usePlanningContext(state => state.valid);
    const StartVote = usePlanningContext(state => state.StartVote);
    const RevealVotes = usePlanningContext(state => state.RevealVotes);
    const revealed = usePlanningContext(state => state.revealed);


    const votes = usePlanningContext(state => state.votes);
    const players = usePlanningContext(state => state.players);

    return (
        <div className='planning-table'>
            <div className='table-top'>
                {
                    players
                        .filter(p => p.id !== user?.id)
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
            <div className='table-left'></div>
            <div className='table'>
                {
                    revealed &&
                    <Button onClick={() => StartVote()} >
                        Start new voting
                    </Button>

                }
                {
                    !revealed &&
                    <Button onClick={() => RevealVotes()} disabled={!valid} >
                        Reveal Cards
                    </Button>
                }
            </div>
            <div className='table-right'></div>
            <div className='table-bottom'>
                {
                    players
                        .filter(p => p.id === user?.id)
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
        </div>
    );
}