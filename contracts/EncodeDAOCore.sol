//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EncodeDAOCore is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    /// Events
    event ProposeIssue(
        uint256 id,
        address indexed _from,
        bytes name,
        uint16 fundingMinimum,
        string description,
        IssueStatus status
    );

    event IssueVotedOn(address voter, uint256 issueId, bool decision);

    /// Constants
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    /// State vars
    Issue[] private issues;
    Counters.Counter private _issueIds;

    mapping(uint256 => mapping(address => Vote)) private votesOnIssues;
    mapping(uint256 => Apartment) private apartments;

    /// Modifiers
    modifier ApartmentOwnerOnly() {
        /// TODO: Add Apartment owner check
        require(true, "Not a current apartment owner");
        _;
    }

    enum IssueStatus {
        Pending,
        Rejected,
        Accepted
    }

    struct Issue {
        uint256 id;
        bytes name;
        address proposer;
        uint16 fundingMinimum;
        string description;
        IssueStatus status;
        int32 decisionAggregate; // starts at 0, can be negative
    }

    struct Vote {
        bool decision;
        bool voted; // User has voted
    }

    struct Apartment {
        uint256 id;
        uint256 floor;
        uint256 squareMeters;
        bool heating;
    }

    constructor() ERC721("ApartmentNFT", "ANFT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// Propose issue by name and minimum funding required
    function proposeIssue(
        bytes memory name,
        uint16 fundingMinimum,
        string memory description
    ) public {
        uint256 currentId = _issueIds.current();
        _issueIds.increment();
        IssueStatus status = IssueStatus.Pending;
        issues.push(
            Issue({
                id: currentId,
                name: name,
                proposer: msg.sender,
                fundingMinimum: fundingMinimum,
                description: description,
                status: status,
                decisionAggregate: 0
            })
        );

        emit ProposeIssue(
            currentId,
            msg.sender,
            name,
            fundingMinimum,
            description,
            status
        );
    }

    /// Vote on issue by passing issueId
    /// @notice Vote on issue with issue id: `issueId` and bool `decision`
    function voteIssue(uint256 issueId, bool decision)
        public
        ApartmentOwnerOnly
    {
        require(issueId <= _issueIds.current(), "IssueID is not valid");
        require(
            issues[issueId].status == IssueStatus.Pending,
            "Issue is not pending"
        );
        require(
            !votesOnIssues[issueId][msg.sender].voted,
            "User has already voted"
        );

        Vote memory vote = Vote({decision: decision, voted: true});
        votesOnIssues[issueId][msg.sender] = vote;

        // Change decision aggregate on issue, increment if true or deduct if false.
        if (decision) {
            issues[issueId].decisionAggregate++;
        } else {
            issues[issueId].decisionAggregate--;
        }

        emit IssueVotedOn(msg.sender, issueId, decision);
    }

    /// Withdraw (everything) from failed issue
    function withdrawFromFailedIssue() public {}

    /// Deposit funds to contract for continuous voting rights
    function deposit() public payable {}

    /// --- GETTERS ---

    /// Get a list of apartment ids owned by yourself
    function getApartmentList() public view {}

    /// Get the details of an apartment you own.
    function getApartmentDetails(uint256 apartmentId)
        public
        view
        returns (Apartment memory apartment)
    {
        return apartments[apartmentId];
    }

    /// Get a list of issues
    function getIssues() public view returns (Issue[] memory) {
        return issues;
    }

    /// Get the length of issues
    function getIssuesLength() public view returns (uint256) {
        return issues.length;
    }

    /// @dev IGNORE - Required to override in impl as both ERC721 and AccessControl define this
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
