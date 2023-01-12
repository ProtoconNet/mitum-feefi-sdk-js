import bs58 from "bs58";

import { Fact, Address, Big, CurrencyID } from "mitum-sdk";

import {
	HINT_POOL_DEPOSITS_OPERATION,
	HINT_POOL_DEPOSITS_OPERATION_FACT,
} from "../alias/operations.js";

export class PoolDepositsFact extends Fact {
	constructor(token, sender, target, incomeCid, outlayCid, amount) {
		super(HINT_POOL_DEPOSITS_OPERATION_FACT, token);
		this.sender = new Address(sender);
		this.target = new Address(target);
		this.incomeCid = new CurrencyID(incomeCid);
		this.outlayCid = new CurrencyID(outlayCid);
		this.amount = new Big(amount);

		this.hash = this.hashing();
	}

	bytes() {
		return Buffer.concat([
			this.token.bytes(),
			this.sender.bytes(),
			this.target.bytes(),
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
			target: this.target.toString(),
			incomecid: this.incomeCid.toString(),
			outlaycid: this.outlayCid.toString(),
			amount: this.amount.toString(),
		};
	}

	get opHint() {
		return HINT_POOL_DEPOSITS_OPERATION;
	}
}
