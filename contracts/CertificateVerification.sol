// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateVerification {

    address public admin;

    struct Certificate {
        string studentName;
        string course;
        string institution;
        uint256 issueDate;
        bool isValid;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateIssued(bytes32 indexed certHash, string studentName);
    event CertificateRevoked(bytes32 indexed certHash);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(
        string memory _studentName,
        string memory _course,
        string memory _institution,
        uint256 _issueDate
    ) public onlyAdmin returns (bytes32) {

        bytes32 certHash = keccak256(
            abi.encodePacked(_studentName, _course, _institution, _issueDate)
        );

        certificates[certHash] = Certificate(
            _studentName,
            _course,
            _institution,
            _issueDate,
            true
        );

        emit CertificateIssued(certHash, _studentName);
        return certHash;
    }

    function verifyCertificate(bytes32 _certHash)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        Certificate memory cert = certificates[_certHash];
        require(cert.issueDate != 0, "Certificate does not exist");
        return (
            cert.studentName,
            cert.course,
            cert.institution,
            cert.issueDate,
            cert.isValid
        );
    }

    function revokeCertificate(bytes32 _certHash) public onlyAdmin {
        require(certificates[_certHash].issueDate != 0, "Certificate not found");
        certificates[_certHash].isValid = false;
        emit CertificateRevoked(_certHash);
    }
}
