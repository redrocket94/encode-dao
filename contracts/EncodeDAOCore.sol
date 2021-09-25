//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EncodeDAOCore is AccessControl {
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Propose issue by name and funding
    function proposeIssue(string memory name, uint256 fundingMinimum) public {}

    // Vote on issue by passing issueId
    function voteIssue(uint256 issueId) public {}

    // Withdraw (everything) from failed issue
    function withdrawFromFailedIssue() public {}

    // Deposit funds to contract for continuous voting rights
    function deposit() public payable {}

    // Get a list of apartment ids owned by yourself
    function getApartmentList() public view {}

    // Get the details of an apartment you own
    function getApartmentDetails(uint256 apartmentId) public view {}

    // Get a list of passed issues
    function getPassedIssues() public view {}
}
