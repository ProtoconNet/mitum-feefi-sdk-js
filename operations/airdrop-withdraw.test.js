import bs58 from "bs58";

import { Amount, Operation } from "mitum-sdk";

import { AirdropWithdrawFact } from "./airdrop-withdraw";
import { TEST_ACCOUNT, TEST_GENESIS } from "../mitum.config";

describe("test: airdrop-withdraw", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
        const amount = new Amount("MCC", "10000");

		const fact = new AirdropWithdrawFact(
			"2023-01-12T05:39:51.971668Z",
			TEST_GENESIS.m1.address,
			TEST_ACCOUNT.address,
			"PEN",
			"MCC",
			amount
		);
		const operation = new Operation(fact, "");
		operation.sign(TEST_GENESIS.m1.private);

		expect(bs58.encode(fact.hash)).toBe("4CAfd7yRTVT6yVw2T5YeLTVEZgKL2LtrSF6gCiDyGdKW");
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
