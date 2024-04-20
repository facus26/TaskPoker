import * as signalR from '@microsoft/signalr'

class Connector {
    static instance: Connector | undefined;

    private connection: signalR.HubConnection;

    public get state(): signalR.HubConnectionState {
        return this.connection.state;
    }

    constructor(auth: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('/planningHub', {
                accessTokenFactory: () => auth
            })
            .withAutomaticReconnect()
            .build();

        this.connection.start()
            .then(() => console.log("Start connection"))
            .catch(err => document.write(err));
    }

    public static GetInstance = (auth: string): Connector =>
        new Connector(auth);

    public JoinGroup = (): Promise<void> | undefined => {
        if (this.connection.state !== signalR.HubConnectionState.Connected)
            return;

        return this.connection.send('JoinGroup');
    }

    public LeaveGroup = (): Promise<void> | undefined => {
        if (this.connection.state !== signalR.HubConnectionState.Connected)
            return;
        
        return this.connection.send("LeaveGroup");
    }

    public OnJoinGroup = (handle: (message: string) => void): Connector => {
        this.connection.on("JoinUser", handle);
        return this;
    }

    public OnLeaveGroup = (handle: (message: string) => void): Connector => {
        this.connection.on("LeaveUser", handle);
        return this;
    }
}


export default Connector.GetInstance;