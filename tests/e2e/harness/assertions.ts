/**
 * E2E Test Suite Assertion Library & Test Runner Core
 * Machupicchu Travel Adventures & Sonqo Perú Travel CMS
 */

export interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  durationMs: number;
  error?: Error;
}

export interface SuiteResult {
  suiteName: string;
  category: string;
  tests: TestResult[];
  passedCount: number;
  failedCount: number;
  durationMs: number;
}

export class AssertionError extends Error {
  constructor(message: string, public actual?: unknown, public expected?: unknown) {
    let detailedMessage = message;
    if (actual instanceof Error && !message.includes(actual.message)) {
      detailedMessage += ` (Underlying cause: ${actual.name}: ${actual.message})`;
    }
    super(detailedMessage);
    this.name = 'AssertionError';
  }
}

class Expectation<T> {
  constructor(private actual: T, private isNot = false) {}

  get not(): Expectation<T> {
    return new Expectation(this.actual, !this.isNot);
  }

  private formatValue(val: unknown): string {
    if (val instanceof Error) {
      return `${val.name}: ${val.message}${val.stack ? `\n${val.stack}` : ''}`;
    }
    if (typeof val === 'object' && val !== null && 'name' in (val as any) && 'message' in (val as any)) {
      return `${(val as any).name}: ${(val as any).message}`;
    }
    if (typeof val === 'function') {
      return `[Function: ${val.name || 'anonymous'}]`;
    }
    if (val === undefined) {
      return 'undefined';
    }
    if (typeof val === 'symbol') {
      return val.toString();
    }
    if (typeof val === 'bigint') {
      return `${val}n`;
    }
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }

  toBe(expected: unknown): void {
    const pass = Object.is(this.actual, expected);
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be' : 'to be'} ${this.formatValue(expected)}`,
        this.actual,
        expected
      );
    }
  }

  toEqual(expected: unknown): void {
    const deepEqual = (a: any, b: any): boolean => {
      if (Object.is(a, b)) return true;
      if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
      }
      return true;
    };

    const pass = deepEqual(this.actual, expected);
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to equal' : 'to equal'} ${this.formatValue(expected)}`,
        this.actual,
        expected
      );
    }
  }

  toBeTruthy(): void {
    const pass = Boolean(this.actual);
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be truthy' : 'to be truthy'}`,
        this.actual
      );
    }
  }

  toBeFalsy(): void {
    const pass = !Boolean(this.actual);
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be falsy' : 'to be falsy'}`,
        this.actual
      );
    }
  }

  toBeNull(): void {
    const pass = this.actual === null;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be null' : 'to be null'}`,
        this.actual,
        null
      );
    }
  }

  toBeDefined(): void {
    const pass = this.actual !== undefined;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected value ${this.isNot ? 'to be undefined' : 'to be defined'}`,
        this.actual
      );
    }
  }

  toBeUndefined(): void {
    const pass = this.actual === undefined;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected value ${this.isNot ? 'not to be undefined' : 'to be undefined'}`,
        this.actual
      );
    }
  }

  toContain(item: unknown): void {
    let pass = false;
    if (Array.isArray(this.actual)) {
      pass = this.actual.some(el => {
        try {
          new Expectation(el).toEqual(item);
          return true;
        } catch {
          return false;
        }
      });
    } else if (typeof this.actual === 'string' && typeof item === 'string') {
      pass = this.actual.includes(item);
    } else if (this.actual instanceof Set) {
      pass = this.actual.has(item);
    }
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to contain' : 'to contain'} ${this.formatValue(item)}`,
        this.actual,
        item
      );
    }
  }

  toHaveLength(length: number): void {
    const actualLen = (this.actual as any)?.length;
    const pass = actualLen === length;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected length ${actualLen} ${this.isNot ? 'not to equal' : 'to equal'} ${length}`,
        actualLen,
        length
      );
    }
  }

  toBeGreaterThan(expected: number): void {
    const pass = (this.actual as any) > expected;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be greater than' : 'to be greater than'} ${expected}`,
        this.actual,
        expected
      );
    }
  }

  toBeGreaterThanOrEqual(expected: number): void {
    const pass = (this.actual as any) >= expected;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be greater than or equal to' : 'to be greater than or equal to'} ${expected}`,
        this.actual,
        expected
      );
    }
  }

  toBeLessThan(expected: number): void {
    const pass = (this.actual as any) < expected;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be less than' : 'to be less than'} ${expected}`,
        this.actual,
        expected
      );
    }
  }

  toBeLessThanOrEqual(expected: number): void {
    const pass = (this.actual as any) <= expected;
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${this.formatValue(this.actual)} ${this.isNot ? 'not to be less than or equal to' : 'to be less than or equal to'} ${expected}`,
        this.actual,
        expected
      );
    }
  }

  toMatch(regex: RegExp): void {
    const pass = regex.test(String(this.actual));
    if (this.isNot ? pass : !pass) {
      throw new AssertionError(
        `Expected ${String(this.actual)} ${this.isNot ? 'not to match' : 'to match'} ${regex.toString()}`,
        this.actual,
        regex.toString()
      );
    }
  }

  toThrow(expectedErrorPattern?: string | RegExp): void {
    if (typeof this.actual !== 'function') {
      throw new AssertionError('Expected target to be a function in toThrow() assertion');
    }
    let threw = false;
    let thrownError: any = null;
    try {
      (this.actual as any)();
    } catch (err) {
      threw = true;
      thrownError = err;
    }

    if (!threw && !this.isNot) {
      throw new AssertionError('Expected function to throw an error, but it did not throw.');
    }
    if (threw && this.isNot) {
      throw new AssertionError(`Expected function not to throw, but it threw: ${thrownError?.message}`);
    }

    if (threw && expectedErrorPattern) {
      const msg = thrownError?.message || String(thrownError);
      const matches = typeof expectedErrorPattern === 'string'
        ? msg.includes(expectedErrorPattern)
        : expectedErrorPattern.test(msg);
      if (!matches) {
        throw new AssertionError(
          `Expected error message "${msg}" to match ${expectedErrorPattern}`,
          msg,
          expectedErrorPattern
        );
      }
    }
  }

  async rejects(expectedErrorPattern?: string | RegExp): Promise<void> {
    let threw = false;
    let thrownError: any = null;
    try {
      await (this.actual as any);
    } catch (err) {
      threw = true;
      thrownError = err;
    }

    if (!threw && !this.isNot) {
      throw new AssertionError('Expected promise to reject, but it resolved successfully.');
    }
    if (threw && this.isNot) {
      throw new AssertionError(`Expected promise not to reject, but it rejected with: ${thrownError?.message}`);
    }

    if (threw && expectedErrorPattern) {
      const msg = thrownError?.message || String(thrownError);
      const matches = typeof expectedErrorPattern === 'string'
        ? msg.includes(expectedErrorPattern)
        : expectedErrorPattern.test(msg);
      if (!matches) {
        throw new AssertionError(
          `Expected rejection message "${msg}" to match ${expectedErrorPattern}`,
          msg,
          expectedErrorPattern
        );
      }
    }
  }
}

export function expect<T>(actual: T): Expectation<T> {
  return new Expectation(actual);
}

// Domain-Specific Assertions
export function assertTenantIsolation(
  records: Array<{ tenant?: string | null }>,
  expectedTenant: 'mta' | 'sonqo'
): void {
  if (!records || records.length === 0) {
    throw new AssertionError(
      `Multi-Brand Tenant Isolation Violation: Expected non-empty records for tenant isolation check on tenant "${expectedTenant}"`
    );
  }
  for (const record of records) {
    if (!record.tenant || record.tenant.toLowerCase() !== expectedTenant) {
      throw new AssertionError(
        `Multi-Brand Tenant Isolation Violation: Record tenant "${record.tenant}" does not match expected isolated tenant "${expectedTenant}"`,
        record.tenant,
        expectedTenant
      );
    }
  }
}

export function assertValidItinerary(itinerary: unknown): void {
  if (!Array.isArray(itinerary)) {
    throw new AssertionError('Itinerary must be a JSON array', typeof itinerary, 'Array');
  }
  for (let i = 0; i < itinerary.length; i++) {
    const item = itinerary[i];
    if (typeof item !== 'object' || item === null) {
      throw new AssertionError(`Itinerary item at index ${i} must be an object`, item);
    }
    if (typeof item.day !== 'number' || item.day < 1) {
      throw new AssertionError(`Itinerary item at index ${i} must have positive integer 'day'`, item.day);
    }
    if (typeof item.title !== 'string' || item.title.trim() === '') {
      throw new AssertionError(`Itinerary item at index ${i} must have non-empty 'title'`, item.title);
    }
    if (typeof item.description !== 'string') {
      throw new AssertionError(`Itinerary item at index ${i} must have string 'description'`, item.description);
    }
  }
}

// Canonical domain functions re-exported from production @/lib/...
export { assertValidImageUrl, validateImageUrl } from '@/lib/validation';
export { reorderGalleryImages, assertValidGallery } from '@/lib/gallery';
export { sanitizeExclusionsList, sanitizeInclusionsList, assertValidPricing, type TourPricingInput } from '@/lib/tours';
export {
  assertValidHeroSlide,
  assertValidHeroSlidesJson,
  validateHeroSlide,
  parseHeroSlidesJson,
  type HeroSlide,
  type HeroSlide as HeroSlideData,
} from '@/lib/visual-assets';

export function calculateBookingTotal(
  adults: number,
  priceAdult: number,
  children: number = 0,
  priceChild: number = 0,
  infants: number = 0,
  priceInfant: number = 0
): number {
  return adults * priceAdult + children * priceChild + infants * priceInfant;
}

export function assertEncryptedPassword(hash: string): void {
  if (!hash || typeof hash !== 'string') {
    throw new AssertionError('Password hash must be a non-empty string');
  }
  // Check that password is not plaintext and matches standard hash formats (bcrypt $2[aby]... or hex salt:hash)
  const isBcrypt = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash);
  const isSaltedHash = /^[a-f0-9]{32,}:[a-f0-9]{64,}$/i.test(hash);
  const isHexPbkdf2 = /^[a-f0-9]{64,}$/i.test(hash);
  if (!isBcrypt && !isSaltedHash && !isHexPbkdf2) {
    throw new AssertionError(
      `Password appears to be unencrypted or malformed: "${hash}". Expected bcrypt or salted PBKDF2/scrypt digest.`
    );
  }
}

// Test Runner Registry
interface TestRegistration {
  id: string;
  name: string;
  fn: () => void | Promise<void>;
}

export class TestSuite {
  private tests: TestRegistration[] = [];
  private beforeEachHooks: Array<() => void | Promise<void>> = [];
  private afterEachHooks: Array<() => void | Promise<void>> = [];
  private beforeAllHooks: Array<() => void | Promise<void>> = [];
  private afterAllHooks: Array<() => void | Promise<void>> = [];

  constructor(public name: string, public category: string) {}

  beforeEach(fn: () => void | Promise<void>): this {
    this.beforeEachHooks.push(fn);
    return this;
  }

  afterEach(fn: () => void | Promise<void>): this {
    this.afterEachHooks.push(fn);
    return this;
  }

  beforeAll(fn: () => void | Promise<void>): this {
    this.beforeAllHooks.push(fn);
    return this;
  }

  afterAll(fn: () => void | Promise<void>): this {
    this.afterAllHooks.push(fn);
    return this;
  }

  test(
    idOrName: string,
    nameOrFn: string | (() => void | Promise<void>),
    maybeFn?: () => void | Promise<void>
  ): void {
    if (typeof nameOrFn === 'function') {
      this.tests.push({ id: idOrName, name: idOrName, fn: nameOrFn });
    } else {
      this.tests.push({ id: idOrName, name: nameOrFn, fn: maybeFn! });
    }
  }

  async run(): Promise<SuiteResult> {
    const results: TestResult[] = [];
    const suiteStartTime = Date.now();
    let passedCount = 0;
    let failedCount = 0;

    for (const hook of this.beforeAllHooks) {
      await hook();
    }

    for (const t of this.tests) {
      for (const hook of this.beforeEachHooks) {
        await hook();
      }

      const testStart = Date.now();
      try {
        await t.fn();
        const durationMs = Date.now() - testStart;
        results.push({
          id: t.id,
          name: t.name,
          passed: true,
          durationMs,
        });
        passedCount++;
      } catch (err: any) {
        const durationMs = Date.now() - testStart;
        results.push({
          id: t.id,
          name: t.name,
          passed: false,
          durationMs,
          error: err instanceof Error ? err : new Error(String(err)),
        });
        failedCount++;
      } finally {
        for (const hook of this.afterEachHooks) {
          await hook();
        }
      }
    }

    for (const hook of this.afterAllHooks) {
      await hook();
    }

    return {
      suiteName: this.name,
      category: this.category,
      tests: results,
      passedCount,
      failedCount,
      durationMs: Date.now() - suiteStartTime,
    };
  }
}
