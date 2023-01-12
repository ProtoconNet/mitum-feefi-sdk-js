import bs58 from "bs58";

import { Amount, Operation } from "mitum-sdk";

import { PoolWithdrawFact } from "./pool-withdraw";
import { TEST_ACCOUNT, TEST_GENESIS } from "../mitum.config";

describe("test: pool-withdraw", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
		const amount = new Amount("MCC", "10000");

		const fact = new PoolWithdrawFact(
			"2023-01-12T05:41:08.833232Z",
			TEST_GENESIS.m1.address,
			TEST_ACCOUNT.address,
			"PEN",
			"MCC",
			[amount]
		);
		const operation = new Operation(fact, "");
		operation.sign(TEST_GENESIS.m1.private);

		expect(bs58.encode(fact.hash)).toBe(
			"BhNm8dvb6YNj9utco8h1yZ4nt8QPPM882wV9usRLHVRh"
		);
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
