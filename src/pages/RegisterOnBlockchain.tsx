import { ethers } from "ethers";
import { contractAdd } from './../constant/constant';
const RegisterOnBlockchain = () => {
    const rpcUrl = "https://rpc-amoy.polygon.technology";
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const pvtKey = "0xdc82536e331e0c640cdc6a5093a1dc4f65aefc77f3f3607717b72e94e05cc759";
    const wallet = new ethers.Wallet(pvtKey,provider);
    const abi = [
        {
		"inputs": [
			{
				"internalType": "string",
				"name": "_certificateHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_certificateURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_certificateType",
				"type": "string"
			}
		],
		"name": "postCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
    ]

    const contract = new ethers.Contract(contractAdd,abi,wallet);

    const regCertificates = async() =>{
        try {
            const tx = await contract.postCertificate("0d632c162012e48f177071abcd37f8151771f55d4a357d3ce14e41268814cdee","0d632c162012e48f177071abcd37f8151771f55d4a357d3ce14e41268814cdee_1750752487.pdf","Ajeet","Edubuk","Job Profile");
            console.log("Transaction Hash:", tx.hash);
            await tx.wait();
            console.log("Transaction Confirmed");
        } catch (error) {
            console.log("error while certificate posting");
        }
    }
  return (
    <div>
      <button className="text-black rounded-lg p-3" onClick={regCertificates}>Register</button>
    </div>
  )
}

export default RegisterOnBlockchain
