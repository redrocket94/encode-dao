import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import EncodeDaoContract from "../artifacts/contracts/EncodeDAOCore.sol/EncodeDAOCore.json";
import { encodeDaoCoreAddress } from "../config.json";

const contractInterface = new ethers.utils.Interface(EncodeDaoContract.abi);
const callConfigs = {
    abi: contractInterface,
    address: encodeDaoCoreAddress,
    args: [],
};

const contract = new Contract(encodeDaoCoreAddress, contractInterface);

export function usePendingIssues() {
    const pendingIssues =
        useContractCall({
            ...callConfigs,
            method: "getPendingIssues",
        }) ?? [];
    return pendingIssues;
}

export function useContractMethod(methodName) {
    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
}
