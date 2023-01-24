import { describe, expect, it } from 'vitest';

/**
 * TODO:
 * Test should be removed in the future, used only to validate
 * issue #3-install-vitest
 */

const sum = (a: number, b: number) => a + b;

describe('Dummy Assertion', () => {
	it('Sum function returns the sum of two numbers', () => {
		expect(sum(1, 2)).toBe(3);
	});
});
