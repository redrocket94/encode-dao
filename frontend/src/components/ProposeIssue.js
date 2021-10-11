import { useState } from "react";
import { useContractMethod } from "../hooks";
import { ethers } from "ethers";

export default function ProposeIssue({ close }) {
    const [name, setName] = useState("");
    const [funding, setFunding] = useState(0);
    const [description, setDescription] = useState("");

    const { state, send: sendProposeIssue } = useContractMethod("proposeIssue");

    function handleClick() {
        if (name) {
            sendProposeIssue(
                ethers.utils.formatBytes32String(name),
                funding,
                description
            );
        }
    }

    return (
        <div className="modal" onClick={close}>
            <div id="propose-issue-window" onClick={(e) => e.stopPropagation()}>
                <form>
                    <label htmlFor="issue-name">Issue name: </label>
                    <input
                        type="text"
                        id="issue-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label htmlFor="issue-funding">Funding minimum: </label>
                    <input
                        type="number"
                        id="issue-funding"
                        value={funding}
                        onChange={(e) => setFunding(parseFloat(e.target.value))}
                    ></input>
                    <label htmlFor="issue-description">Description: </label>
                    <input
                        type="text"
                        id="issue-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </form>
                <button id="propose-issue-button" onClick={handleClick}>
                    Propose issue
                </button>
            </div>
        </div>
    );
}
