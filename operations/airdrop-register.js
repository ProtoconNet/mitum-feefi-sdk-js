import bs58 from "bs58";

import {
	Fact,
	Address,
	err,
	Amount,
	CurrencyID,
	FullTimeStamp,
} from "mitum-sdk";

import {
	HINT_AIRDROP_REGISTER_OPERATION,
	HINT_AIRDROP_REGISTER_OPERATION_FACT,
} from "../alias/operations.js";
import { EC_IMPOSSIBLE_TIMELINE, EC_INVALID_AMOUNT } from "../base/error.js";

const { assert } = err;

export class AirdropRegisterFact extends Fact {
	constructor(
		token,
		sender,
		target,
		incomeCid,
		outlayCid,
		start,
		end,
		amount
	) {
		super(HINT_AIRDROP_REGISTER_OPERATION_FACT, token);
		this.sender = new Address(sender);
		this.target = new Address(target);

		this.start = new FullTimeStamp(start);
		this.end = new FullTimeStamp(end);

		assert(
			this.start.t.getTime() < this.end.t.getTime(),
			err.runtime(EC_IMPOSSIBLE_TIMELINE, `end(${end}) < start(${start})`)
		);

		assert(
			amount instanceof Amount,
			err.instance(EC_INVALID_AMOUNT, "not Amount instance")
		);

		this.amount = amount;
		this.incomeCid = new CurrencyID(incomeCid);
		this.outlayCid = new CurrencyID(outlayCid);
		this.hash = this.hashing();
	}

	bytes() {
		return Buffer.concat([
			this.token.bytes(),
			this.sender.bytes(),
			this.target.bytes(),
			this.start.hashBytes(),
			this.end.hashBytes(),
			this.amount.bytes(),
			this.incomeCid.bytes(),
			this.outlayCid.bytes(),
		]);
	}

	dict() {
		return {
			_hint: this.hint.toString(),
			hash: bs58.encode(this.hash),
			token: this.token.toString(),
			sender: this.sender.toString(),
			start: this.start.toString(),
			end: this.end.toString(),
			amount: this.amount.dict(),
			incomecid: this.incomeCid.toString(),
			outlaycid: this.outlayCid.toString(),
		};
	}

	get opHint() {
		return HINT_AIRDROP_REGISTER_OPERATION;
	}
}
