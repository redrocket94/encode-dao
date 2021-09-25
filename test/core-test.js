const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EncodeDAOCore", function () {
  // Define shared contract variables for testing
  let owner;
  let addr1;
  let addr2;
  let EncodeDAOCore;
  let encodeDAOCore;

  // Define the zero/burn address for future use
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  // Deploy contract before each test case
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy MockNFT contract
    EncodeDAOCore = await ethers.getContractFactory("EncodeDAOCore");
    encodeDAOCore = await EncodeDAOCore.deploy();

    await encodeDAOCore.deployed();
  });

});
