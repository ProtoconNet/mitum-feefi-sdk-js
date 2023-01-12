import bs58 from "bs58";

import { Operation } from "mitum-sdk";

import { AirdropCloseFact } from "./airdrop-close";
import { TEST_GENESIS, TEST_ACCOUNT } from "../mitum.config";

describe("test: airdrop-close", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
		const fact = new AirdropCloseFact(
			"2023-01-12T05:22:00.220751Z",
			TEST_GENESIS.m1.address,
			TEST_ACCOUNT.address,
			"PEN",
			"MCC",
			"PEN"
		);
		const operation = new Operation(fact, "");
		operation.sign(TEST_GENESIS.m1.private);

		expect(bs58.encode(fact.hash)).toBe(
			"4gG5ebipQeisYfAn7NuioWumoxcPedWG4DBDG4LjR688"
		);
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
