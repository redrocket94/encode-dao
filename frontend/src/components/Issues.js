import IssueList from "./IssueList";

export default function Issues() {
    return (
        <div className="issues-page">
            <IssueList type="open" />
            <button>propose issue</button>
            <IssueList type="closed" />
        </div>
    );
}
