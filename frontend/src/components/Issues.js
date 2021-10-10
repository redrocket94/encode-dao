import IssueList from "./IssueList";

export default function Issues() {
    return (
        <div id="issues-page" className="app-page">
            <IssueList status="Pending" />
            <button>Propose issue</button>
            <IssueList status="Resolved" />
        </div>
    );
}
