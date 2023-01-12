import bs58 from "bs58";

import { Operation } from "mitum-sdk";

import { PoolRegisterFact } from "./pool-register";
import { TEST_ACCOUNT, TEST_GENESIS } from "../mitum.config";

describe("test: pool-register", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
		const fact = new PoolRegisterFact(
			"2023-01-12T05:44:14.027432Z",
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
			"6iCaLw4i6sLVnp57qQoHFChwj1S8DL9yXiSbbqA4mPQ3"
		);
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
