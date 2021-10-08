export default function IssueItem(props) {
    const { name, status, result } = props.issue;
    return (
        <div
            className={`issue-item ${
                status === "closed" && (result ? "green" : "red")
            }`}
        >
            <p>{name}</p>
            {status === "open" && (
                <div className="voting-buttons">
                    <button>yes</button>
                    <button>no</button>
                </div>
            )}
        </div>
    );
}
