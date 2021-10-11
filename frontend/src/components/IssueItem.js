export default function IssueItem(props) {
    const isPending = props.status === "Pending";

    return (
        <li
            className={`list-element ${
                !isPending && (props.status === "Accepted" ? "green" : "red")
            }`}
        >
            <span className="list-element-title">{props.name}</span>
            <span>{props.fundingMinimum} ETH</span>
            {isPending && (
                <div className="voting-buttons">
                    <button>Yes</button>
                    <button>No</button>
                </div>
            )}
        </li>
    );
}
