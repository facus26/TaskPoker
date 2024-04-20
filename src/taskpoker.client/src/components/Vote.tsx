type VoteProps = {
    label: string,
    voteValue?: number,
    revealed?: boolean
}

const Vote = ({ label, voteValue, revealed = true }: VoteProps) => (
    <div className="flex flex-col items-center">
        {
            voteValue !== undefined && !revealed &&
            <div className="vote-card selected">
            </div>
        }
        {
            voteValue === undefined &&
            <div className="vote-card no-selected" >
                ...
            </div>
        }
        {
            voteValue !== undefined && revealed &&
            <div className="vote-card" >
                {voteValue}
            </div>
        }
        <p className="font-bold">{label}</p>
    </div>
)

export default Vote;