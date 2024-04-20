import { Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import RoomView from './views/PlanningView';
import PrivateRoute from './components/PrivateRoute';


const Router = () => (
    <Routes>
        <Route path='/' Component={LoginView} />
        <Route Component={PrivateRoute}>
            <Route path='/planning' Component={RoomView} />
        </Route>
    </Routes>
)

export default Router;