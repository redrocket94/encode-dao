1. `npx hardhat compile`
2. `cp -R ./artifacts frontend/src/artifacts`
3. `npx hardhat node`
4. `npx hardhat run scripts/deploy.js --network localhost`
5. copy-paste deployed contract address into `frontend/src/config.json`
6. `cd frontend`
7. `yarn start`
