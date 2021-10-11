import IssueItem from "./IssueItem";
import { usePendingIssues } from "../hooks";

export default function IssueList(props) {
    function getPendingIssues() {
        return [
            { name: "Fixing the roof", status: "Pending", fundingMinimum: 1 },
            {
                name: "Building a new playground",
                status: "Pending",
                fundingMinimum: 2.3,
            },
            {
                name: "Limiting noise after 23:00",
                status: "Pending",
                fundingMinimum: 0,
            },
        ];
    }
    function getResolvedIssues() {
        return [
            {
                name: "Fixing the main gate",
                status: "Accepted",
                fundingMinimum: 0.23,
            },
            {
                name: "Cleaning every day",
                status: "Rejected",
                fundingMinimum: 0,
            },
        ];
    }
    const resolvedIssues = [];
    const pendingIssues = usePendingIssues();
    window.pendingIssues = pendingIssues;
    const issues = props.status === "Pending" ? pendingIssues : resolvedIssues;

    return (
        <ul id="issue-list" className="item-list">
            <h1 className="list-header">
                {props.status === "Pending"
                    ? "Pending issues"
                    : "Resolved issues"}
            </h1>
            {issues &&
                issues.map(([issue], idx) => (
                    <IssueItem
                        name={issue.name}
                        status={issue.status}
                        fundingMinimum={issue.fundingMinimum}
                        description={issue.description}
                        key={idx}
                    />
                ))}
        </ul>
    );
}
