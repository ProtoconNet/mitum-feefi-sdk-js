import bs58 from "bs58";

import { Operation } from "mitum-sdk";

import { PoolPolicyUpdaterFact } from "./pool-policy-updater";
import { TEST_ACCOUNT, TEST_GENESIS } from "../mitum.config";

describe("test: pool-policy-updater", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
		const fact = new PoolPolicyUpdaterFact(
			"2023-01-12T05:45:40.738084Z",
			TEST_GENESIS.m1.address,
			TEST_ACCOUNT.address,
			"10000",
			"PEN",
			"MCC",
			"MCC"
		);
		const operation = new Operation(fact, "");
		operation.sign(TEST_GENESIS.m1.private);

		expect(bs58.encode(fact.hash)).toBe(
			"HezKnXVWe8gfMix2RrmPpbw4YRNLNGtCzME4wuiFfRPT"
		);
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
