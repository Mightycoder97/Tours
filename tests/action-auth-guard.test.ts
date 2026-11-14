import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const require = createRequire(import.meta.url);
const nextHeaders = require('next/headers');

// Create a mock cookies store returning no session token
const mockCookieStore = {
  get: () => undefined,
  getAll: () => [],
  set: () => {},
  delete: () => {},
  has: () => false,
};

nextHeaders.cookies = async () => mockCookieStore;

describe('Unauthenticated Server Action Auth Guard Direct Invocation', () => {
  it('updateAdminPassword throws Unauthorized when no user is logged in', async () => {
    const { updateAdminPassword } = await import('../src/app/admin/actions');
    await assert.rejects(
      async () => {
        await updateAdminPassword({ newPassword: 'NewPassword123!' });
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error message to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('switchAdminBrand throws Unauthorized when no user is logged in', async () => {
    const { switchAdminBrand } = await import('../src/app/admin/actions');
    await assert.rejects(
      async () => {
        await switchAdminBrand('sonqo');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error message to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('createDestination throws Unauthorized when unauthenticated', async () => {
    const { createDestination } = await import('../src/app/admin/destinations/actions');
    const formData = new FormData();
    formData.append('name', 'Test');
    formData.append('slug', 'test');
    await assert.rejects(
      async () => {
        await createDestination(formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('deleteDestination throws Unauthorized when unauthenticated', async () => {
    const { deleteDestination } = await import('../src/app/admin/destinations/actions');
    await assert.rejects(
      async () => {
        await deleteDestination('test-id');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('createCategory throws Unauthorized when unauthenticated', async () => {
    const { createCategory } = await import('../src/app/admin/categories/actions');
    const formData = new FormData();
    formData.append('name', 'Test');
    formData.append('slug', 'test');
    await assert.rejects(
      async () => {
        await createCategory(formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('deleteCategory throws Unauthorized when unauthenticated', async () => {
    const { deleteCategory } = await import('../src/app/admin/categories/actions');
    await assert.rejects(
      async () => {
        await deleteCategory('test-id');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('createAvailabilitySlots throws Unauthorized when unauthenticated', async () => {
    const { createAvailabilitySlots } = await import('../src/app/admin/availability/actions');
    const formData = new FormData();
    formData.append('tour_id', 'some-id');
    formData.append('start_date', '2026-01-01');
    formData.append('end_date', '2026-01-02');
    await assert.rejects(
      async () => {
        await createAvailabilitySlots(formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('updateAvailabilitySlot throws Unauthorized when unauthenticated', async () => {
    const { updateAvailabilitySlot } = await import('../src/app/admin/availability/actions');
    const formData = new FormData();
    formData.append('max_capacity', '25');
    await assert.rejects(
      async () => {
        await updateAvailabilitySlot('some-id', formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('deleteAvailabilitySlot throws Unauthorized when unauthenticated', async () => {
    const { deleteAvailabilitySlot } = await import('../src/app/admin/availability/actions');
    await assert.rejects(
      async () => {
        await deleteAvailabilitySlot('some-id');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('bulkDeleteAvailability throws Unauthorized when unauthenticated', async () => {
    const { bulkDeleteAvailability } = await import('../src/app/admin/availability/actions');
    await assert.rejects(
      async () => {
        await bulkDeleteAvailability('some-tour-id');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('updateSettings throws Unauthorized when unauthenticated', async () => {
    const { updateSettings } = await import('../src/app/admin/settings/actions');
    const formData = new FormData();
    formData.append('setting_home_hero_title', 'New Title');
    await assert.rejects(
      async () => {
        await updateSettings(formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('createTour throws Unauthorized when unauthenticated', async () => {
    const { createTour } = await import('../src/app/admin/tours/actions');
    const formData = new FormData();
    formData.append('title', 'New Tour');
    await assert.rejects(
      async () => {
        await createTour(formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('updateTour throws Unauthorized when unauthenticated', async () => {
    const { updateTour } = await import('../src/app/admin/tours/actions');
    const formData = new FormData();
    formData.append('title', 'Updated Tour');
    await assert.rejects(
      async () => {
        await updateTour('some-id', formData);
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('deleteTour throws Unauthorized when unauthenticated', async () => {
    const { deleteTour } = await import('../src/app/admin/tours/actions');
    await assert.rejects(
      async () => {
        await deleteTour('some-id');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });
});
