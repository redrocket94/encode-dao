const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EncodeDAOCore", function () {
  // Define shared contract variables for testing
  let owner;
  let addr1;
  let addr2;
  let EncodeDAOCore;
  let encodeDAOCore;

  // Defines the zero/burn address for future use
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

  // Defines the default admin role assigned to owner on initialization
  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const HASHED_MODERATOR_ROLE = keccak256("MODERATOR_ROLE");


  // Deploy contract before each test case
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy EncodeDAOCore contract
    EncodeDAOCore = await ethers.getContractFactory("EncodeDAOCore");
    encodeDAOCore = await EncodeDAOCore.deploy();

    await encodeDAOCore.deployed();
  });

  it("should set owner role to DEFAULT_ADMIN_ROLE on deploy", async function () {
    expect(await encodeDAOCore.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(true);
  });

  it("should set addr1 role to MODERATOR_ROLE", async function () {
    // Connects to contract with owner address and grants role to address of addr1
    await encodeDAOCore.connect(owner).grantRole(HASHED_MODERATOR_ROLE, addr1.address);
    expect(await encodeDAOCore.hasRole(HASHED_MODERATOR_ROLE, addr1.address)).to.equal(true);
  });

  it("should propose an issue", async function () {
    // Check the length of current issues is 0
    expect((await encodeDAOCore.getIssuesLength()).toNumber()).to.equal(0);

    var strBytes = new Uint8Array("Fix roof");

    // Propose a new dummy issue
    // Expect it to emit a 'ProposeIssue' event with the params specified
    await expect(encodeDAOCore.connect(addr1)
      .proposeIssue(strBytes, 50, "We need to fix the roof - it's raining on my head!"))
      .to.emit(encodeDAOCore, "ProposeIssue")
      .withArgs(0, addr1.address, strBytes, 50, "We need to fix the roof - it's raining on my head!", 0);

    // Check the length of current issues has increased by 1
    expect((await encodeDAOCore.getIssuesLength()).toNumber()).to.equal(1);
  });

  it("should vote on an issue", async function () {
    // Add Issue
    var strBytes = new Uint8Array("Fix roof");
    await encodeDAOCore.connect(addr1).proposeIssue(strBytes, 50, "We need to fix the roof - it's raining on my head!")
    // Vote on Issue nr 0. Should change to read issueId from event
    var issueId = 0;
    await expect(encodeDAOCore.connect(addr1)
      .voteIssue(issueId, true))
      .to.emit(encodeDAOCore, "IssueVotedOn")
      .withArgs(addr1.address, issueId, true);
  })

  it("Should not vote twice on the same issue", async function () {
    var strBytes = new Uint8Array("fix roof");
    await encodeDAOCore.connect(addr1).proposeIssue(strBytes, 50, "We need to fix the roof - it's raining on my head!")
    // Vote on Issue nr 0
    var issueId = 0;
    await encodeDAOCore.connect(addr1)
      .voteIssue(issueId, true)

    // Vote again
    await expect(encodeDAOCore.connect(addr1)
      .voteIssue(issueId, false))
      .to.be.revertedWith('User has already voted');

  })

});

// Short method to simplify keccak256 hashing
function keccak256(strToHash) {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(strToHash));
}
