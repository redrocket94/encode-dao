//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EncodeDAOCore is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    /// Events
    event ProposeIssue(
        address indexed _from,
        bytes name,
        uint16 fundingMinimum,
        string description,
        IssueStatus status
    );

    event IssueVotedOn(
        address voter,
        uint256 issueId,
        bool decision
    );

    /// Constants
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    /// State vars
    Issue[] private currentIssues;
    Counters.Counter private _issueIds;
    mapping(uint256 => mapping(address => Vote)) private votesOnIssues;

    /// Modifiers
    modifier ApartmentOwnerOnly {
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
    }

    struct Vote {
        address voter;
        bool decision;
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
        _issueIds.increment();
        uint256 currentId = _issueIds.current();
        IssueStatus status = IssueStatus.Pending;
        currentIssues.push(
            Issue({
                id: currentId,
                name: name,
                proposer: msg.sender,
                fundingMinimum: fundingMinimum,
                description: description,
                status: status
            })
        );

        emit ProposeIssue(msg.sender, name, fundingMinimum, description, status);
    }

    /// Vote on issue by passing issueId
    /// @notice Vote on issue with issue id: `issueId` and bool `decision`
    function voteIssue(uint256 issueId, bool decision) public ApartmentOwnerOnly {
        // TODO: Add check to confirm issue is in list of current Issues
        require(true, "Issue is not current or does not exist");
        Vote memory vote = Vote({voter: msg.sender, decision: decision});
        votesOnIssues[issueId][msg.sender] = vote;
        emit IssueVotedOn(msg.sender, issueId, decision);
    }

    /// Withdraw (everything) from failed issue
    function withdrawFromFailedIssue() public {}

    /// Deposit funds to contract for continuous voting rights
    function deposit() public payable {}

    /// Get a list of apartment ids owned by yourself
    function getApartmentList() public view {}

    /// Get the details of an apartment you own.
    function getApartmentDetails(uint256 apartmentId) public view {}

    /// Get a list of passed issues
    function getPassedIssues() public view {}

    /// Get a list of current issues
    function getCurrentIssues() public view returns (Issue[] memory) {
        return currentIssues;
    }

    /// Get the length of the currentIssues list
    function getCurrentIssuesLength() public view returns (uint256) {
        return currentIssues.length;
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
