import { useCompleteIssue } from "../hooks";

export default function CompleteIssue(props) {
    const { state: completeState, send: sendCompleteIssue } = useCompleteIssue();


    function handleClick() {
            sendCompleteIssue(
               props.issueId
            );
    }

    return (
        <div>
            <div id="complete-issue-window" onClick={(e) => e.stopPropagation()}>
                {completeState.status === "None" && (
                    <>
                        <button id="complete-issue-button" onClick={handleClick}>
                            Complete issue
                        </button>
                    </>
                )}
                {completeState.status === "Mining" && (
                    <span>Transation pending...</span>
                )}
                {completeState.status === "Success" && (
                    <>
                        <p>Issue completed!</p>
                    </>
                )}
                {completeState.status === "Exception" && (
                    <>
                        <span>Transaction failed!</span>
                        <p>Error message: {completeState.errorMessage}</p>
                    </>
                )}
            </div>
        </div>
    );
}
