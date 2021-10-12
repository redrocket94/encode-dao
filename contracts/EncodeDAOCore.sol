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

    event MintApartment(
        address minter,
        address receiver,
        uint256 id,
        uint256 floor,
        uint256 squareMeters,
        bool heating
    );

    event IssueVotedOn(address voter, uint256 issueId, bool decision);

    /// Constants
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    /// State vars
    Issue[] private _issues;
    Counters.Counter private _issueIds;
    Counters.Counter private _apartmentIds;

    mapping(uint256 => mapping(address => VoteStatus)) private _votesOnIssues;
    mapping(uint256 => Apartment) private _apartmentIdToApartment;

    /// Modifiers
    modifier ApartmentOwnerOnly() {
        require(balanceOf(msg.sender) > 0, "Not a current apartment owner");
        _;
    }

    enum IssueStatus {
        PENDING,
        REJECTED,
        ACCEPTED
    }
    enum VoteStatus {
        NO_VOTE,
        ACCEPT,
        REJECT
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

    struct Apartment {
        uint256 floor;
        uint256 squareMeters;
        bool heating;
    }

    constructor() ERC721("ApartmentNFT", "ANFT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mintApartment(
        address receiver,
        uint256 floor,
        uint256 squareMeters,
        bool heating,
        string memory uri
    ) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not admin");

        _apartmentIds.increment();
        uint256 currentId = _apartmentIds.current();

        _apartmentIdToApartment[currentId] = Apartment({
            floor: floor,
            squareMeters: squareMeters,
            heating: heating
        });

        _mint(receiver, currentId);
        _setTokenURI(currentId, uri);

        emit MintApartment(
            msg.sender,
            receiver,
            currentId,
            floor,
            squareMeters,
            heating
        );
    }

    /// Propose issue by name and minimum funding required
    function proposeIssue(
        bytes memory name,
        uint16 fundingMinimum,
        string memory description
    ) public {
        uint256 currentId = _issueIds.current();
        _issueIds.increment();
        IssueStatus status = IssueStatus.PENDING;
        _issues.push(
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
            _issues[issueId].status == IssueStatus.PENDING,
            "Issue is not pending"
        );
        require(
            _votesOnIssues[issueId][msg.sender] == VoteStatus.NO_VOTE,
            "User has already voted"
        );

        if (decision) {
            _votesOnIssues[issueId][msg.sender] = VoteStatus.ACCEPT;
        } else {
            _votesOnIssues[issueId][msg.sender] = VoteStatus.REJECT;
        }

        // Change decision aggregate on issue, increment if true or deduct if false.
        if (decision) {
            _issues[issueId].decisionAggregate++;
        } else {
            _issues[issueId].decisionAggregate--;
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
        return _apartmentIdToApartment[apartmentId];
    }

    /// Get a list of _issues
    function getIssues() public view returns (Issue[] memory) {
        return _issues;
    }

    /// Get the length of _issues
    function getIssuesLength() public view returns (uint256) {
        return _issues.length;
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
