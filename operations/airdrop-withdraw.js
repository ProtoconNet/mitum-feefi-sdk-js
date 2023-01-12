import bs58 from "bs58";

import { Fact, Address, err, CurrencyID, Amount } from "mitum-sdk";

import {
	HINT_AIRDROP_WITHDRAW_OPERATION,
	HINT_AIRDROP_WITHDRAW_OPERATION_FACT,
} from "../alias/operations.js";

import { EC_INVALID_AMOUNT } from "../base/error.js";

const { assert } = err;

export class AirdropWithdrawFact extends Fact {
	constructor(token, sender, pool, incomeCid, outlayCid, amount) {
		super(HINT_AIRDROP_WITHDRAW_OPERATION_FACT, token);
		this.sender = new Address(sender);
		this.pool = new Address(pool);
		this.incomeCid = new CurrencyID(incomeCid);
		this.outlayCid = new CurrencyID(outlayCid);

		assert(
			amount instanceof Amount,
			err.instance(EC_INVALID_AMOUNT, "not Amount instance")
		);

		this.amount = amount;
		this.hash = this.hashing();
	}

	bytes() {
		return Buffer.concat([
			this.token.bytes(),
			this.sender.bytes(),
			this.pool.bytes(),
			this.incomeCid.bytes(),
			this.outlayCid.bytes(),
			this.amount.bytes(),
		]);
	}

	dict() {
		return {
			_hint: this.hint.toString(),
			hash: bs58.encode(this.hash),
			token: this.token.toString(),
			sender: this.sender.toString(),
			pool: this.pool.toString(),
            incomecid: this.incomeCid.toString(),
            outlaycid: this.outlayCid.toString(),
            amount: this.amount.dict(),
		};
	}

	get opHint() {
		return HINT_AIRDROP_WITHDRAW_OPERATION;
	}
}
