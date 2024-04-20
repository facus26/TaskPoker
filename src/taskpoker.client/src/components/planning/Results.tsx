// Hooks
import { usePlanningContext } from '@/hooks/planning';

export const Results = () => {
    const votes = usePlanningContext(state => state.votes);

    const average = votes.reduce((value, vote) => value = value + vote.value, 0) / votes.length;

    const groupedVotes = votes
        .reduce((group, vote) => {
            const key = vote.value.toString();
            group[key] = (group[key] || 0) + 1;
            return group;
        }, Object.create(null));

    const group = Object
        .keys(groupedVotes)
        .map(key => ({
            value: Number(key),
            count: Number(groupedVotes[key]),
            percentage: groupedVotes[key] * 100 / votes.length
        }));

    const orderByPercentage = group.sort((a, b) => {
        if (a.percentage < b.percentage) return 1;
        if (a.percentage > b.percentage) return -1;
        return 0;
    });

    const max = orderByPercentage.length > 0
        ? orderByPercentage[0]
        : null;

    return (
        <div className='flex gap-8 items-center justify-center'>
            {
                group.map(vote => (
                    <div key={vote.value} className="flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center w-8 h-14 text-black text-lg font-bold border rounded border-black dark:border-slate-800 dark:bg-slate-700 dark:text-secondary-foreground" >
                            <p>{vote.value}</p>
                        </div>
                        <p>{`${vote.count} ${vote.count === 1 ? 'Vote' : 'Votes'}`}</p>
                        <p className='text-xs'>{vote.percentage.toFixed(0)}%</p>
                    </div>
                ))
            }
            <div className='flex flex-col items-center'>
                <h4 className='text-lg text-gray-500'>Avarage:</h4>
                <p className='text-center text-xl font-bold'>
                    {average}
                </p>
                {
                    max &&
                    <>
                        <h4 className='text-lg text-gray-500'>Agreement:</h4>
                        <p className='text-center text-xl font-bold'>
                            {max.percentage.toFixed(0)}%
                        </p>
                    </>
                }
            </div>
        </div>
    );
}