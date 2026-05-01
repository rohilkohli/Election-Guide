import { checkRateLimit, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "../lib/rateLimiter";

// The rate-limiter uses a module-level Map, so we need to isolate tests.
// jest automatically re-requires modules per test file, so the store starts
// fresh.  We do, however, need to control Date.now for window-rollover tests.

describe("checkRateLimit", () => {
  const REAL_NOW = Date.now;

  afterEach(() => {
    // Restore real time after any test that mocked it
    Date.now = REAL_NOW;
    // Reset module state between tests by re-importing — but since Jest caches
    // modules, the simplest approach is to rely on the fact that each IP used in
    // tests is unique.
  });

  it("allows the first request for a new IP", () => {
    expect(checkRateLimit("1.1.1.1")).toBe(true);
  });

  it(`allows up to ${RATE_LIMIT_MAX} requests within the window`, () => {
    const ip = "2.2.2.2";
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(checkRateLimit(ip)).toBe(true);
    }
  });

  it(`blocks the ${RATE_LIMIT_MAX + 1}th request within the window`, () => {
    const ip = "3.3.3.3";
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit(ip);
    }
    expect(checkRateLimit(ip)).toBe(false);
  });

  it("resets the counter after the window expires", () => {
    const ip = "4.4.4.4";
    const fakeNow = 1_000_000;

    // Fill up the quota at t=fakeNow
    Date.now = jest.fn(() => fakeNow);
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit(ip);
    }
    expect(checkRateLimit(ip)).toBe(false);

    // Advance time past the window
    Date.now = jest.fn(() => fakeNow + RATE_LIMIT_WINDOW_MS + 1);
    expect(checkRateLimit(ip)).toBe(true);
  });

  it("treats different IPs independently", () => {
    const ipA = "5.5.5.5";
    const ipB = "6.6.6.6";
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit(ipA);
    }
    // ipA is blocked but ipB should still be allowed
    expect(checkRateLimit(ipA)).toBe(false);
    expect(checkRateLimit(ipB)).toBe(true);
  });
});
