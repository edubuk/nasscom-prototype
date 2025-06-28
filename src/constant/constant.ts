export const contractAdd = "0x1f54F89d4aa1C1d0a4CC9A19bEBB0f74CCd63804";//POLYGON AMOY TESTNET
export const abi = [
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
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "certificatehash",
				"type": "string"
			}
		],
		"name": "getIssuedBy",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "issuedTo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuedBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "certificateType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "certificateUri",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "issuedDate",
						"type": "uint256"
					}
				],
				"internalType": "struct RegisterCert.UserData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]