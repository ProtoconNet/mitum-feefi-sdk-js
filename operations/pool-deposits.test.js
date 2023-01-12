import bs58 from "bs58";

import { Operation } from "mitum-sdk";

import { PoolDepositsFact } from "./pool-deposits";
import { TEST_ACCOUNT, TEST_GENESIS } from "../mitum.config";

describe("test: pool-deposits", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
		const fact = new PoolDepositsFact(
			"2023-01-12T05:58:00.469299Z",
			TEST_GENESIS.m1.address,
			TEST_ACCOUNT.address,
			"PEN",
			"MCC",
			"10000"
		);
		const operation = new Operation(fact, "");
		operation.sign(TEST_GENESIS.m1.private);

		expect(bs58.encode(fact.hash)).toBe("8wEjdGuVoLJdmoQtuXRyPSVJyU22GHaaV5Ngk5SLJgAj");
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
