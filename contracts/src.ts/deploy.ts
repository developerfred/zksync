import {deployContract} from 'ethereum-waffle';
import {ethers} from 'ethers';

export const ERC20MintableContract = function () {
    let contract = require('openzeppelin-solidity/build/contracts/ERC20Mintable');
    contract.evm = {bytecode: contract.bytecode};
    return contract
}();
export const franklinContractCode = require('../build/Franklin');

export async function deployFranklin(wallet, franklinCode = franklinContractCode) {
    try {
        let contract = await deployContract(wallet, franklinCode, [ethers.constants.HashZero, wallet.address, wallet.address], {
            gasLimit: 8000000,
        });
        console.log("Franklin address:" + contract.address);

        return contract
    } catch (err) {
        console.log("Error:" + err);
    }
}

export async function addTestERC20Token(wallet, franklin) {
    try {
        let erc20 = await deployContract(wallet, ERC20MintableContract, []);
        console.log("Test ERC20 address:" + erc20.address);
        await franklin.addToken(erc20.address);
        return erc20
    } catch (err) {
        console.log("Error:" + err);
    }
}