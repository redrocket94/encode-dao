import { ethers } from "ethers";
import { useVote } from "../hooks";

export default function IssueItem(props) {
    const { state: voteState, send: sendVote } = useVote();

    function onVote(result) {
        sendVote(props.id, result);
    }

    return (
        <li
            className={`list-element ${
                props.status !== 0 && (props.status === 2 ? "green" : "red")
            }`}
        >
            <span className="list-element-title">
                {ethers.utils.parseBytes32String(props.name)}
            </span>
            <span>{props.fundingMinimum} ETH</span>
            {props.status === 0 && (
                <div className="voting-buttons">
                    <button onClick={() => onVote(true)}>Yes</button>
                    <button onClick={() => onVote(false)}>No</button>
                </div>
            )}
        </li>
    );
}
