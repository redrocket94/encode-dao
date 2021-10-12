import { ethers } from "ethers";
import { useVote } from "../hooks";
import { useState } from "react";

export default function IssueItem(props) {
    const { state: voteState, send: sendVote } = useVote();
    const [isModal, setModal] = useState(false);

    function onVote(result) {
        sendVote(props.id, result);
        setModal(true);
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
            <span>{props.fundingMinimum} $</span>
            {props.status === 0 && (
                <div className="voting-buttons">
                    <button onClick={() => onVote(true)}>Yes</button>
                    <button onClick={() => onVote(false)}>No</button>
                </div>
            )}
            {isModal && (
                <div className="modal">
                    <div>
                        {voteState.status === "Exception" ? (
                            <p>{voteState.errorMessage}</p>
                        ) : (
                            <p>Success!</p>
                        )}
                        <button onClick={() => setModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </li>
    );
}
