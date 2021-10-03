//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract EncodeDAOCore is ERC721URIStorage, AccessControl {
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    constructor() ERC721("ApartmentNFT", "ANFT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// Propose issue by name and funding
    function proposeIssue(string memory name, uint256 fundingMinimum) public {}

    /// Vote on issue by passing issueId
    /// @notice Vote on issue with issue id: `issueId`
    function voteIssue(uint256 issueId) public {}

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
