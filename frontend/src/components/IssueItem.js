import { ethers } from "ethers";

export default function IssueItem(props) {
    const isPending = props.status === 0;

    return (
        <li
            className={`list-element ${
                !isPending && (props.status === "Accepted" ? "green" : "red")
            }`}
        >
            <span className="list-element-title">
                {ethers.utils.parseBytes32String(props.name)}
            </span>
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
