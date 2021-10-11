import IssueList from "./IssueList";
import ProposeIssue from "./ProposeIssue";

import { useState } from "react";

export default function Issues(props) {
    const [modal, setModal] = useState(false);
    function openModal() {
        setModal(true);
    }
    function closeModal() {
        setModal(false);
    }

    return (
        <div id="issues-page" className="app-page">
            <IssueList status="Pending" />
            <button onClick={openModal}>Propose issue</button>
            <IssueList status="Resolved" />
            {modal && <ProposeIssue close={closeModal} />}
        </div>
    );
}
