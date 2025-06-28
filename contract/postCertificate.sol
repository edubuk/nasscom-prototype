// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RegisterCert {
    address owner;

    struct UserData {
        string issuedTo; //student name
        string issuedBy; // organisation name
        string certificateType;
        string certificateUri; //certificate uri
        uint256 issuedDate;
    }

    mapping(bytes32 => UserData) userData;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized");
        _;
    }

    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function postCertificate(
        string memory _certificateHash,
        string memory _certificateURI,
        string memory _issuedTo,
        string memory _issuedBy,
        string memory _certificateType
    ) external onlyOwner {
        bytes32 byte_hash = stringToBytes32(_certificateHash);
        require(
            userData[byte_hash].issuedDate == 0,
            "Certificate is already registered"
        );
        userData[byte_hash] = UserData({
            issuedTo: _issuedTo,
            issuedBy: _issuedBy,
            certificateUri: _certificateURI,
            issuedDate: block.timestamp,
            certificateType: _certificateType
        });
    }

    function getIssuedBy(string memory certificatehash)
        external
        view
        returns (UserData memory)
    {
        bytes32 byte_hash = stringToBytes32(certificatehash);
        return userData[byte_hash];
    }
}
