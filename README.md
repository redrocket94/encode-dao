# Encode Academy | DAO: Real Estate & Renting

![Encode Academy Banner](https://miro.medium.com/max/1200/1*2oKn50rnX3Ddy6QSGHQg-A.jpeg)

## What is this?

This is the culmination of [Encode Academy](https://www.encode.club/encode-academy), the 8-week long Solidity course by Encode Club in collaboration with Extropy, we worked together in a group of 5:

- Oliver H. D.
- Leo Bonato
- Vasileios Politeiadis
- Håkon Strøm Lie
- Martin Løseth Jensen

The purpose of this project was to make us comfortable working together with other Smart Contract developers and follow a project from start to finish, taking care of everything:

- Ideation
- Planning
- Frontend
- Solidity/Smart Contract
- Testing
- Continuous Integration
- Deployment

## DAO Summary & Purpose

### Use Case

The Government owns all apartments in a building/multiple buildings and wants to delegate management to the Tenants. Money is allocated by the Govt (optionally also by the Tenants) at regular intervals. The Tenants can propose issues and vote on them. If the vote passes, the required money is allocated to the task and made available to the Administrator to pay for required measures. Admin could be appointed by Govt or elected by Tenants.

- Apartments are NFTized. Transferring represents selling, staking represents renting
- Voting weight is proportional to renters' stake/value in the DAO

### User Stories

Renter wants to:

- Propose issues
- Vote on issues
- Contribute ETH to DAO
- Elect admins

Admin wants to:

- View issues
- Block/Revert proposed issues
- Withdraw ETH from DAO on passed issues
