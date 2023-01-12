import * as mitumSdk from "mitum-sdk";

import { PoolRegisterFact } from "./operations/pool-register.js";
import { PoolPolicyUpdaterFact } from "./operations/pool-policy-updater.js";
import { PoolDepositsFact } from "./operations/pool-deposits.js";
import { PoolWithdrawFact } from "./operations/pool-withdraw.js";
import { AirdropRegisterFact } from "./operations/airdrop-register.js";
import { AirdropWithdrawFact } from "./operations/airdrop-withdraw.js";
import { AirdropCloseFact } from "./operations/airdrop-close.js";

mitumSdk.Feefi = {
	PoolRegisterFact,
	PoolPolicyUpdaterFact,
	PoolDepositsFact,
	PoolWithdrawFact,
	AirdropRegisterFact,
	AirdropWithdrawFact,
	AirdropCloseFact,
};

export default mitumSdk;
