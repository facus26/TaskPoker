import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import * as signalR from '@microsoft/signalr'

// Types
import { type Vote, type Player, type Game } from '@/types';

const PlanningEvents = {
    JoinGroup: 'JoinGroup',
    JoinPlayer: 'JoinPlayer',
    LeavePlayer: 'LeavePlayer',
    Vote: 'Vote',
    StartVote: 'StartVote',
    RevealVotes: 'RevealVotes'
}

const PlanningActions = {
    Vote: 'Vote',
    StartVote: 'StartVote',
    RevealVotes: 'RevealVotes',
    LeaveGroup: 'LeaveGroup'
}

export type PlanningProps = {
    votes: Vote[],
    players: Player[],
    revealed: boolean,
    valid: boolean
}

export type PlanningState = PlanningProps & {
    Vote: (card: Vote) => Promise<void>,
    StartVote: () => Promise<void>,
    RevealVotes: () => Promise<void>,
    LeaveGroup: () => Promise<void>
};

export type PlanningStore = ReturnType<typeof createPlanningStore>

export const createPlanningStore = (token: string) => {
    const DEFAULT_PROPS: PlanningProps = {
        votes: [],
        players: [],
        revealed: false,
        valid: false
    }

    const options: signalR.IHttpConnectionOptions = {
        accessTokenFactory: () => token
    };

    const connection = new signalR.HubConnectionBuilder()
        .withUrl('/planningHub', options)
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(() => console.log("Start connection"))
        .catch(err => document.write(err))

    return createStore<PlanningState>()(devtools((set) => {

        const AddVote = (vote: Vote) => set(state => {
            const votes = [...state.votes.filter(c => c.playerId !== vote.playerId), vote];
            const valid = votes.length === state.players.length;
            return { votes, valid };
        })

        const RemoveVote = (vote: Vote) => set(state => {
            const votes = state.votes.filter(c => c.playerId !== vote.playerId)
            const valid = votes.length === state.players.length;
            return { votes, valid };
        })

        connection.on(PlanningEvents.Vote, AddVote)

        connection.on(PlanningEvents.StartVote, () => set(() => ({ 
            revealed: false, 
            valid: false, 
            votes: [] 
        })))

        connection.on(PlanningEvents.JoinGroup, (game: Game) => set(() => {
            const valid = game.votes.length === game.players.length;

            return {
                valid,
                players: game.players,
                votes: game.votes
            }
        }))

        connection.on(PlanningEvents.RevealVotes, () => set(() => ({ revealed: true })))

        connection.on(PlanningEvents.JoinPlayer, (player: Player) => set(state => ({
            players: [...state.players.filter(p => p.id !== player.id), player],
            valid: false
        })))

        connection.on(PlanningEvents.LeavePlayer, (playerId: string) => set(state => {
            const players = state.players.filter(p => p.id !== playerId);
            const votes = state.votes.filter(c => c.playerId !== playerId)
            const valid = votes.length === state.players.length;
            return { players, votes, valid };
        }))

        return {
            ...DEFAULT_PROPS,
            Vote: (vote: Vote) => {
                AddVote(vote);
                return connection
                    .send(PlanningActions.Vote, vote)
                    .catch(err => {
                        document.write(err);
                        RemoveVote(vote);
                    })
            },
            StartVote: () => connection
                .send(PlanningActions.StartVote)
                .catch(err => document.write(err)),
            RevealVotes: () => connection
                .send(PlanningActions.RevealVotes)
                .catch(err => document.write(err)),
            LeaveGroup: () => connection
                .send(PlanningActions.LeaveGroup)
                .catch(err => document.write(err))
        }
    }));
}