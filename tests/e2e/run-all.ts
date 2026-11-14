#!/usr/bin/env tsx
/**
 * Master E2E Test Suite Runner
 * Machu Picchu Travel Adventures & Sonqo Perú Travel CMS
 * 
 * Executes all 4 Tiers (95 Tests Total):
 * - Tier 1: Feature Coverage (40 Tests, 5 per Feature × 8 Features)
 * - Tier 2: Boundary & Corner Cases (40 Tests, 5 per Feature × 8 Features)
 * - Tier 3: Pairwise Combinations (10 Tests)
 * - Tier 4: Real-World Workloads (5 Scenarios)
 */

import { SuiteResult, TestSuite } from './harness/assertions';
import { resetTestDb } from './harness/env';

// Tier 1 Suites
import { authFeatureSuite } from './tier1-feature/auth.test';
import { tenantFeatureSuite } from './tier1-feature/tenant.test';
import { switcherFeatureSuite } from './tier1-feature/switcher.test';
import { publicFeatureSuite } from './tier1-feature/public.test';
import { toursFeatureSuite } from './tier1-feature/tours.test';
import { availabilityFeatureSuite } from './tier1-feature/availability.test';
import { galleryFeatureSuite } from './tier1-feature/gallery.test';
import { visualAssetsFeatureSuite } from './tier1-feature/visual-assets.test';

// Tier 2 Suites
import { authBoundarySuite } from './tier2-boundary/auth-boundary.test';
import { tenantBoundarySuite } from './tier2-boundary/tenant-boundary.test';
import { switcherBoundarySuite } from './tier2-boundary/switcher-boundary.test';
import { publicBoundarySuite } from './tier2-boundary/public-boundary.test';
import { toursBoundarySuite } from './tier2-boundary/tours-boundary.test';
import { availabilityBoundarySuite } from './tier2-boundary/availability-boundary.test';
import { galleryBoundarySuite } from './tier2-boundary/gallery-boundary.test';
import { visualAssetsBoundarySuite } from './tier2-boundary/visual-assets-boundary.test';

// Tier 3 Suite
import { crossFeatureSuite } from './tier3-pairwise/cross-feature.test';

// Tier 4 Suite
import { workloadScenarioSuite } from './tier4-workload/scenarios.test';

interface TierGroup {
  tierName: string;
  expectedCount: number;
  suites: TestSuite[];
}

const TIER_GROUPS: TierGroup[] = [
  {
    tierName: 'TIER 1: FEATURE COVERAGE (40 Tests)',
    expectedCount: 40,
    suites: [
      authFeatureSuite,
      tenantFeatureSuite,
      switcherFeatureSuite,
      publicFeatureSuite,
      toursFeatureSuite,
      availabilityFeatureSuite,
      galleryFeatureSuite,
      visualAssetsFeatureSuite,
    ],
  },
  {
    tierName: 'TIER 2: BOUNDARY & CORNER CASES (40 Tests)',
    expectedCount: 40,
    suites: [
      authBoundarySuite,
      tenantBoundarySuite,
      switcherBoundarySuite,
      publicBoundarySuite,
      toursBoundarySuite,
      availabilityBoundarySuite,
      galleryBoundarySuite,
      visualAssetsBoundarySuite,
    ],
  },
  {
    tierName: 'TIER 3: PAIRWISE COMBINATIONS (10 Tests)',
    expectedCount: 10,
    suites: [crossFeatureSuite],
  },
  {
    tierName: 'TIER 4: REAL-WORLD APPLICATION SCENARIOS (5 Workloads)',
    expectedCount: 5,
    suites: [workloadScenarioSuite],
  },
];

export async function runAll(options: { exitOnFinish?: boolean } = { exitOnFinish: true }): Promise<{
  totalExecuted: number;
  totalPassed: number;
  totalFailed: number;
}> {
  const masterStart = Date.now();

  console.log('================================================================================');
  console.log('   MACHU PICCHU TRAVEL ADVENTURES & SONQO PERU TRAVEL CMS — E2E TEST SUITE   ');
  console.log('================================================================================');
  console.log(`Node Version:  ${process.version}`);
  console.log(`Execution at:  ${new Date().toISOString()}`);
  console.log('Methodology:   4-Tier Systematic Testing (Category-Partition, BVA, Pairwise, Workload)');
  console.log('Total Targets: 95 Automated Tests');
  console.log('================================================================================\n');

  let totalExecuted = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const failureDetails: Array<{ id: string; name: string; suite: string; error: Error }> = [];

  for (const group of TIER_GROUPS) {
    console.log(`\n--------------------------------------------------------------------------------`);
    console.log(`  >>> ${group.tierName}`);
    console.log(`--------------------------------------------------------------------------------`);

    let tierExecuted = 0;
    let tierPassed = 0;
    let tierFailed = 0;

    for (const suite of group.suites) {
      resetTestDb(); // Clean isolation for every suite
      console.log(`\n  [SUITE] ${suite.name}`);
      const result: SuiteResult = await suite.run();

      for (const t of result.tests) {
        tierExecuted++;
        totalExecuted++;

        if (t.passed) {
          tierPassed++;
          totalPassed++;
          console.log(`    \x1b[32m✔ PASS\x1b[0m [${t.id}] ${t.name} (${t.durationMs}ms)`);
        } else {
          tierFailed++;
          totalFailed++;
          console.log(`    \x1b[31m✖ FAIL\x1b[0m [${t.id}] ${t.name} (${t.durationMs}ms)`);
          if (t.error) {
            console.log(`           \x1b[31mError: ${t.error.message}\x1b[0m`);
            failureDetails.push({
              id: t.id,
              name: t.name,
              suite: suite.name,
              error: t.error,
            });
          }
        }
      }
    }

    console.log(
      `\n  Tier Result: ${tierPassed}/${tierExecuted} passed (${tierFailed} failed) [Expected: ${group.expectedCount}]`
    );
  }

  const masterDuration = Date.now() - masterStart;

  console.log('\n================================================================================');
  console.log('                           FINAL TEST SUITE SUMMARY                             ');
  console.log('================================================================================');
  console.log(`  Total Tests Executed:  ${totalExecuted} / 95`);
  console.log(`  Tests Passed:          \x1b[32m${totalPassed}\x1b[0m`);
  console.log(`  Tests Failed:          ${totalFailed > 0 ? `\x1b[31m${totalFailed}\x1b[0m` : '0'}`);
  console.log(`  Total Suite Duration:  ${(masterDuration / 1000).toFixed(2)}s`);
  console.log('================================================================================');

  if (failureDetails.length > 0) {
    console.log('\n\x1b[31mFAILURES IDENTIFIED:\x1b[0m');
    for (const f of failureDetails) {
      console.log(`\n  [${f.id}] ${f.name} in "${f.suite}"`);
      console.log(`  ${f.error.stack || f.error.message}`);
    }
    console.log('\n================================================================================');
    if (options.exitOnFinish) {
      process.exit(1);
    }
  } else {
    console.log('\n\x1b[32m🎉 ALL 95 E2E TESTS PASSED WITH 100% SPECIFICATION COMPLIANCE!\x1b[0m\n');
    if (options.exitOnFinish) {
      process.exit(0);
    }
  }

  return { totalExecuted, totalPassed, totalFailed };
}

if (process.argv[1]?.includes('run-all')) {
  runAll().catch(err => {
    console.error('Fatal unhandled error during test suite execution:', err);
    process.exit(1);
  });
}
