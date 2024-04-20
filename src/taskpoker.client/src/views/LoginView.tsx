import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Components
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Store
import { useAuth } from "@/stores/user/auth.store"

// Services
import UserService from "@/services/userService";
import { CreateRoom } from "@/types"

const LoginView = () => {
    const [{ name, group }, setForm] = useState<CreateRoom>({
        name: '',
        group: ''
    })

    const set = useAuth(state => state.set);
    const auth = useAuth(state => state.auth);
    const session = useAuth(state => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (!session) return;

            const user = await UserService.Me(session);

            set(user);
            navigate('/planning');
        }

        getUser();
    }, [session, set, navigate])

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setForm(state => ({ ...state, [event.target.name]: event.target.value }));

    const Login = (name: string, group?: string) => {
        if (!name) return;
        
        UserService
            .SignIn(name, group)
            .then(session => auth(session))
            .catch((err) => console.error(err));
    }

    const handlerCreateClick = async () => await Login(name);

    const handlerJoinClick = async () => {
        if (!group) return;

        await Login(name, group);
    }

    return (
        <div className="h-full flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    placeholder="Enter name your name"
                                    value={name}
                                    onChange={handlerInputChange}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Group</Label>
                                <Input
                                    name="group"
                                    placeholder="Enter group id"
                                    value={group}
                                    onChange={handlerInputChange}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex">
                    {
                        !group &&
                        <Button
                            className="w-full"
                            disabled={!name}
                            onClick={handlerCreateClick}
                        >
                            Create
                        </Button>
                    }
                    {
                        group &&
                        <Button
                            className="w-full"
                            disabled={!name || !group}
                            onClick={handlerJoinClick}
                        >
                            Join
                        </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginView;