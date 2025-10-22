// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITRC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function decimals() external view returns (uint8);
}

contract FeeRouter {
    event TransferWithFee(address indexed token, address indexed from, address indexed to,
        uint256 amount, address feeRecipient, uint256 feeAmount);

    function transferWithFee(address token, address to, uint256 amount, address feeRecipient,
        uint256 feeFixed, uint16 feeBps) external returns (bool) {

        require(to != address(0) && feeRecipient != address(0) && amount > 0, "invalid params");

        ITRC20 t = ITRC20(token);
        uint256 feeVariable = (amount * uint256(feeBps)) / 10_000;
        uint256 feeAmount = feeFixed + feeVariable;
        uint256 need = amount + feeAmount;

        require(t.allowance(msg.sender, address(this)) >= need, "allowance low");
        if (feeAmount > 0) require(t.transferFrom(msg.sender, feeRecipient, feeAmount));
        require(t.transferFrom(msg.sender, to, amount));

        emit TransferWithFee(token, msg.sender, to, amount, feeRecipient, feeAmount);
        return true;
    }
}
