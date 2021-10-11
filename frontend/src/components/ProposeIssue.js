import { useState } from "react";
import { useContractMethod } from "../hooks";
import { ethers } from "ethers";

export default function ProposeIssue({ close }) {
    const [name, setName] = useState("");
    const [funding, setFunding] = useState(0);
    const [description, setDescription] = useState("");

    const { state: proposeState, send: sendProposeIssue } =
        useContractMethod("proposeIssue");

    function handleClick() {
        if (name) {
            sendProposeIssue(
                ethers.utils.formatBytes32String(name),
                ethers.utils.parseEther(funding),
                description
            );
        }
    }

    return (
        <div className="modal" onClick={close}>
            <div id="propose-issue-window" onClick={(e) => e.stopPropagation()}>
                {proposeState.status === "None" && (
                    <>
                        <form>
                            <label htmlFor="issue-name">Issue name: </label>
                            <input
                                type="text"
                                id="issue-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ gridColumn: "2 / 4" }}
                            ></input>
                            <label htmlFor="issue-funding">
                                Funding minimum:{" "}
                            </label>
                            <input
                                type="number"
                                id="issue-funding"
                                value={funding}
                                step="any"
                                onChange={(e) => setFunding(e.target.value)}
                            ></input>
                            <span
                                style={{
                                    textAlign: "left",
                                    marginLeft: "1rem",
                                }}
                            >
                                ETH
                            </span>
                            <label htmlFor="issue-description">
                                Description:{" "}
                            </label>
                            <input
                                type="text"
                                id="issue-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ gridColumn: "2 / 4" }}
                            ></input>
                        </form>
                        <button id="propose-issue-button" onClick={handleClick}>
                            Propose issue
                        </button>
                    </>
                )}
                {proposeState.status === "Mining" && (
                    <span>Transation pending...</span>
                )}
                {proposeState.status === "Success" && (
                    <>
                        <p>Issue proposed!</p>
                        <button onClick={close}>Close</button>
                    </>
                )}
                {proposeState.status === "Exception" && (
                    <>
                        <span>Transaction failed!</span>
                        <p>Error message: {proposeState.errorMessage}</p>
                        <button onClick={close}>Close</button>
                    </>
                )}
            </div>
        </div>
    );
}
