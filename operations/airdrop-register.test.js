import bs58 from "bs58";

import { Amount, Operation } from "mitum-sdk";

import { AirdropRegisterFact } from "./airdrop-register";
import { TEST_ACCOUNT, TEST_GENESIS } from "../mitum.config";

describe("test: airdrop-register", () => {
	// test with mitum m1 keys
	it("case: m1", () => {
		const amount = new Amount("MCC", "10000")
        
        const fact = new AirdropRegisterFact(
			"2023-01-12T05:35:47.619884Z",
			TEST_GENESIS.m1.address,
            TEST_ACCOUNT.address,
            "PEN",
            "MCC",
            "2023-01-12T02:03:40Z",
            "2023-01-12T02:05:40Z",
            amount,
		);
		const operation = new Operation(fact, "");
		operation.sign(TEST_GENESIS.m1.private);

		expect(bs58.encode(fact.hash)).toBe("C8ZHZssfhEwcrETr56V5jx8iQCr1oABYfKaEV617Bebi");
	});

	// test with mitum m2 keys
	it("case: m2", () => {});
});
