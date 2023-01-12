import bs58 from "bs58";

import { Fact, Address, Big, CurrencyID } from "mitum-sdk";

import {
	HINT_POOL_REGISTER_OPERATION,
	HINT_POOL_REGISTER_OPERATION_FACT,
} from "../alias/operations.js";

export class PoolRegisterFact extends Fact {
	constructor(
		token,
		sender,
		target,
		initFee,
		incomeCid,
		outlayCid,
		currency
	) {
		super(HINT_POOL_REGISTER_OPERATION_FACT, token);
		this.sender = new Address(sender);
		this.target = new Address(target);
		this.initFee = new Big(initFee);
		this.incomeCid = new CurrencyID(incomeCid);
		this.outlayCid = new CurrencyID(outlayCid);
		this.currency = new CurrencyID(currency);
		this.hash = this.hashing();
	}

	bytes() {
		return Buffer.concat([
			this.token.bytes(),
			this.sender.bytes(),
			this.target.bytes(),
			this.initFee.bytes(),
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
			target: this.target.toString(),
			initialfee: this.initFee.toString(),
			incomecid: this.incomeCid.toString(),
			outlaycid: this.outlayCid.toString(),
			currency: this.currency.toString(),
		};
	}

	get opHint() {
		return HINT_POOL_REGISTER_OPERATION;
	}
}
