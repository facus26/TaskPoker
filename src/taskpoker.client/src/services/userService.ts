import { type User } from "@/types"

class UserService {
    static Me = async (token: string) : Promise<User> => {
        const res = await fetch('api/user/me', {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })

        const user: User = await res.json();
        return user;
    }

    static SignIn = async (name: string, group?: string) : Promise<string> => {
        const content = {
            name: name,
            group: group
        }

        const res = await fetch('api/user/signIn', {
            body: JSON.stringify(content),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        });

        return res.ok 
            ? await res.text()
            : "";
    }
}

export default UserService;