export type CreateRoom = {
    name: string,
    group: string | undefined
}

export type User = {
    id: string,
    name: string,
    groupId: string
}

export type Room = {
    id: string,
    name: string
}

export type Player = {
    id: string,
    name: string
}

export type Vote = {
    playerId: string,
    value: number
}

export type Game = {
    id: string,
    revealed: boolean,
    votes: Vote[],
    players: Player[]
}