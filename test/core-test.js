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

    // Deploy MockNFT contract
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
});

// Short method to simplify keccak256 hashing
function keccak256(strToHash) {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(strToHash));
}
