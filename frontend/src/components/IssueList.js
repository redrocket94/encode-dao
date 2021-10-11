import IssueItem from "./IssueItem";
import { usePendingIssues } from "../hooks";

export default function IssueList(props) {
    const [issues] = usePendingIssues();

    return (
        <ul id="issue-list" className="item-list">
            <h1 className="list-header">
                {props.status === "Pending"
                    ? "Pending issues"
                    : "Resolved issues"}
            </h1>
            {issues &&
                issues
                    .filter((issue) =>
                        props.status === "Pending"
                            ? issue.status === 0
                            : issue.status !== 0
                    )
                    .map((issue, idx) => <IssueItem {...issue} key={idx} />)}
        </ul>
    );
}
