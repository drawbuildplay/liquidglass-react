import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Shim jest for compatibility with existing tests
(globalThis as any).jest = {
    ...vi,
    fn: vi.fn,
    mock: vi.mock,
    spyOn: vi.spyOn,
    useFakeTimers: vi.useFakeTimers,
    useRealTimers: vi.useRealTimers,
    // add others as needed
};
