import bs58 from "bs58";

import { Fact, Address, CurrencyID } from "mitum-sdk";

import {
	HINT_AIRDROP_CLOSE_OPERATION,
	HINT_AIRDROP_CLOSE_OPERATION_FACT,
} from "../alias/operations.js";

export class AirdropCloseFact extends Fact {
	constructor(token, sender, pool, incomeCid, outlayCid, currency) {
		super(HINT_AIRDROP_CLOSE_OPERATION_FACT, token);
		this.sender = new Address(sender);
		this.pool = new Address(pool);
		this.incomeCid = new CurrencyID(incomeCid);
		this.outlayCid = new CurrencyID(outlayCid);
		this.currency = new CurrencyID(currency);
		this.hash = this.hashing();
	}

	bytes() {
		return Buffer.concat([
			this.token.bytes(),
			this.sender.bytes(),
			this.pool.bytes(),
			this.incomeCid.bytes(),
			this.outlayCid.bytes(),
			this.currency.bytes(),
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
			currency: this.currency.toString(),
		};
	}

	get opHint() {
		return HINT_AIRDROP_CLOSE_OPERATION;
	}
}
