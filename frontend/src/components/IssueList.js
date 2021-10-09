import IssueItem from "./IssueItem";

export default function IssueList(props) {
    function getIssues() {
        return [
            { name: "Fixing the roof", status: "open", result: undefined },
            {
                name: "Building a new playground",
                status: "open",
                result: undefined,
            },
            {
                name: "Limiting noise after 23:00",
                status: "open",
                result: undefined,
            },
            {
                name: "Fixing the main gate",
                status: "closed",
                result: true,
            },
            { name: "Cleaning every day", status: "closed", result: false },
        ];
    }
    const issues = getIssues().filter((issue) => issue.status === props.type);

    return (
        <div className="issue-list">
            <h1 className="issue-list-header">
                {props.type === "open" ? "Open issues" : "Closed issues"}
            </h1>
            {issues.map((issue, idx) => (
                <IssueItem issue={issue} key={idx} type={props.type} />
            ))}
        </div>
    );
}
