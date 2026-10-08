import {
  getReadTime,
  getRemainingHours,
  isReadyToRead,
  normaliseTime,
} from "./timeHelpers";

const NOW = Date.UTC(2026, 0, 1);
const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const TWO_DAYS_IN_MS = 2 * 24 * ONE_HOUR_IN_MS;

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(NOW);
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

describe("getReadTime", () => {
  it("returns the current time when the random offset is zero", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);

    expect(getReadTime()).toBe(NOW);
  });

  it("returns a timestamp less than two days in the future", () => {
    jest.spyOn(Math, "random").mockReturnValue(1 - Number.EPSILON);

    const readTime = getReadTime();

    expect(readTime).toBeGreaterThanOrEqual(NOW);
    expect(readTime).toBeLessThan(NOW + TWO_DAYS_IN_MS);
  });

  it("returns the current time plus the offset selected by Math.random", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    // 86400000 is the ms in 24 hours
    expect(getReadTime()).toBe(NOW + 86400000);
  });
});

describe("normaliseTime", () => {
  it("rounds a partial remaining hour up to the next whole hour", () => {
    expect(normaliseTime(String(NOW + 2 * ONE_HOUR_IN_MS + 1))).toBe("3");
  });

  it("returns zero when the stored timestamp is now", () => {
    expect(normaliseTime(String(NOW))).toBe("0");
  });

  it("returns the exact remaining whole hours", () => {
    expect(normaliseTime(String(NOW + 2 * ONE_HOUR_IN_MS))).toBe("2");
  });

  it("returns negative hours when the stored timestamp has passed", () => {
    expect(normaliseTime(String(NOW - ONE_HOUR_IN_MS))).toBe("-1");
  });
});

describe("isReadyToRead", () => {
  it("returns true when the stored timestamp is in the future", () => {
    expect(isReadyToRead(String(NOW + 1))).toBe(true);
  });

  it("returns true when the stored timestamp equals now", () => {
    expect(isReadyToRead(String(NOW))).toBe(true);
  });

  it("returns false when the stored timestamp has passed", () => {
    expect(isReadyToRead(String(NOW - 1))).toBe(false);
  });
});

describe("getRemainingHours", () => {
  it("returns the remaining time rounded down to whole hours", () => {
    expect(
      getRemainingHours(String(NOW + 3 * ONE_HOUR_IN_MS + 45 * 60 * 1000)),
    ).toBe(3);
  });

  it("returns zero when the stored timestamp has elapsed", () => {
    expect(getRemainingHours(String(NOW - 1))).toBe(0);
  });

  it("caps the returned value at ten hours", () => {
    expect(getRemainingHours(String(NOW + 11 * ONE_HOUR_IN_MS))).toBe(10);
  });

  it("caps the returned value at ten hours exactly", () => {
    expect(getRemainingHours(String(NOW + 10 * ONE_HOUR_IN_MS))).toBe(10);
  });

  it("returns zero when less than one hour remains", () => {
    expect(getRemainingHours(String(NOW + ONE_HOUR_IN_MS - 1))).toBe(0);
  });
});
