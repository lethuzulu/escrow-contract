// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


contract Escrow {

    event Approved(uint balance);

    address public depositor;

    address public arbiter;
    address public beneficiary;

    bool public isApproved; 

    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor  = msg.sender;
    }

    //should move the contract's balance to the beneficiary and indicate the that the contract ahs been approved.
    function approve() external {
        require(msg.sender == arbiter, "Caller Not Arbiter");
        uint balance = address(this).balance;
        (bool success, ) = beneficiary.call{value:balance}("");  //TODO: Review: Favor pull over push when transfering Ether.
        require(success, "Failed to Send Ether");
        isApproved = true;
        emit Approved(balance);
    }

}
