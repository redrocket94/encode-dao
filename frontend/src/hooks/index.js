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

export function useIssues() {
    const Issues =
        useContractCall({
            ...callConfigs,
            method: "getIssues",
        }) ?? [];
    return Issues;
}

export function useGetIssues() {
    const issues =
        useContractCall({ ...callConfigs, method: "getIssues" }) ?? [];
    return issues;
}

export function useContractMethod(methodName) {
    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
}

export function useCompleteIssue() {
    const { state, send } = useContractFunction(contract, "completeIssue", {});
    return { state, send };
}

export function useVote() {
    const { state, send } = useContractFunction(contract, "voteIssue", {});
    return { state, send };
}
