import { ethers } from "ethers";
import { contractAdd } from './../constant/constant';
import { abi } from "./../constant/constant";
    const rpcUrl = "https://rpc-amoy.polygon.technology";
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const pvtKey = "0xdc82536e331e0c640cdc6a5093a1dc4f65aefc77f3f3607717b72e94e05cc759";
    const wallet = new ethers.Wallet(pvtKey,provider);
    // const abi = [
    //     {
	// 	"inputs": [
	// 		{
	// 			"internalType": "string",
	// 			"name": "_certificateHash",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "_certificateURI",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "_issuedTo",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "_issuedBy",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "_certificateType",
	// 			"type": "string"
	// 		}
	// 	],
	// 	"name": "postCertificate",
	// 	"outputs": [],
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// }
    // ]

    const contract = new ethers.Contract(contractAdd,abi,wallet);

    export const regCertificates = async({fileHash,uri,name,certificateType}:{fileHash:string,uri:string,name:string,certificateType:string}) =>{
        try {
			console.log(fileHash,uri,name,certificateType);
			if(!fileHash || !uri || !name || !certificateType){	
				throw new Error("All fields are required");
			}
            const tx = await contract.postCertificate(fileHash,uri,name,"Edubuk",certificateType);
            console.log("Transaction Hash:", tx.hash);
            await tx.wait();
            console.log("Transaction Confirmed");
			return tx.hash;
        } catch (error) {
            console.log("error while certificate posting",error);
        }
    }

    export const verifyCertificate = async({fileHash}:{fileHash:string}) =>{
        try {
			console.log(fileHash);
			if(!fileHash){	
				throw new Error("File hash is required");
			}
            const result = await contract.getIssuedBy(fileHash);
			const response = {...result};
            console.log("response", response);
            //await response.wait();
            //console.log("Transaction Confirmed");
			return response;
        } catch (error) {
            console.log("error while certificate posting",error);
        }
    }


