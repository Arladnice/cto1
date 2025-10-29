import '@testing-library/jest-dom';

jest.mock('@/lib/events.ts', () => ({
    eventBus: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    },
}));
