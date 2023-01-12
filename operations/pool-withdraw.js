import bs58 from "bs58";

import { Fact, Address, CurrencyID, Amount, util, err } from "mitum-sdk";

import { MAX_AMOUNTS_IN_ITEM } from "../mitum.config.js";
import {
	HINT_POOL_WITHDRAW_OPERATION,
	HINT_POOL_WITHDRAW_OPERATION_FACT,
} from "../alias/operations.js";

import {
	EC_INVALID_AMOUNT,
	EC_INVALID_AMOUNTS,
	EC_INVALID_ITEM,
} from "../base/error.js";

const { assert } = err;

export class PoolWithdrawFact extends Fact {
	constructor(token, sender, pool, incomeCid, outlayCid, amounts) {
		super(HINT_POOL_WITHDRAW_OPERATION_FACT, token);
		this.sender = new Address(sender);
		this.pool = new Address(pool);
		this.incomeCid = new CurrencyID(incomeCid);
		this.outlayCid = new CurrencyID(outlayCid);

		assert(Array.isArray(amounts), err.type(EC_INVALID_ITEM, "not Array"));
		assert(
			amounts.length > 0 && amounts.length <= MAX_AMOUNTS_IN_ITEM,
			err.range(EC_INVALID_AMOUNTS, "array size out of range")
		);

		const carr = amounts.map((amount) => {
			assert(
				amount instanceof Amount,
				err.instance(EC_INVALID_AMOUNT, "not Amount instance")
			);

			return amount.currency.toString();
		});
		const cset = new Set(carr);

		assert(
			carr.length === cset.size,
			err.duplicate(EC_INVALID_ITEM, "duplicate amounts in currency item")
		);

		this.amounts = amounts;
		this.hash = this.hashing();
	}

	bytes() {
		return Buffer.concat([
			this.token.bytes(),
			this.sender.bytes(),
			this.pool.bytes(),
			this.incomeCid.bytes(),
			this.outlayCid.bytes(),
			Buffer.concat(
				this.amounts.sort(util.sortBuf).map((amt) => amt.bytes())
			),
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
			amounts: this.amounts
				.sort(util.sortBuf)
				.map((amount) => amount.dict()),
		};
	}

	get opHint() {
		return HINT_POOL_WITHDRAW_OPERATION;
	}
}
