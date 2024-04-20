import { useEffect } from 'react';

// Components
import { Table, Votes, Results } from '@/components/planning';

// Hooks
import { useAuth } from "@/stores/user/auth.store"
import { PlanningProvider, usePlanningContext } from '@/hooks/planning';


const App = () => {
    const user = useAuth(state => state.user);
    const revealed = usePlanningContext(state => state.revealed);
    const LeaveGroup = usePlanningContext(state => state.LeaveGroup);

    useEffect(() => {
        return () => {
            LeaveGroup();
        }
    }, [LeaveGroup])

    return (
        <div className='h-full grid grid-rows-[auto,auto,200px]' >
            <h1 className='font-bold text-center'>Group Id: {user?.groupId}</h1>
            <Table />
            <div className='self-end p-3'>
                {
                    !revealed
                        ? <Votes />
                        : <Results />
                }
            </div>
        </div>
    );
}

export default function PlanningView() {
    return (
        <PlanningProvider>
            <App />
        </PlanningProvider>
    )
}