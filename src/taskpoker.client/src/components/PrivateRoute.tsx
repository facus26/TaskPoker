import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/stores/user/auth.store';

const PrivateRoute = () => {
    const user = useAuth(state => state.user);

    return user?.id
        ? <Outlet />
        : <Navigate to='/' replace={true} />
}

export default PrivateRoute;