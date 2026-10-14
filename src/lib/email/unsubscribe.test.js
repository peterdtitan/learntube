import {
  beforeAll, describe, expect, it,
} from 'vitest';
import { readUnsubscribeToken, unsubscribeData, unsubscribeToken } from './unsubscribe';

beforeAll(() => { process.env.NEXTAUTH_SECRET = 'test-secret'; });

describe('unsubscribe links', () => {
  it('round-trip, and refuse anything tampered with', () => {
    const token = unsubscribeToken('user_1', 'weekly');
    expect(readUnsubscribeToken(token)).toEqual({ userId: 'user_1', scope: 'weekly' });
    const [payload, sig] = token.split('.');
    const other = Buffer.from('user_2.weekly').toString('base64url');
    expect(readUnsubscribeToken(`${other}.${sig}`)).toBeNull();
    expect(readUnsubscribeToken(`${payload}.${sig.slice(0, -2)}xx`)).toBeNull();
    expect(readUnsubscribeToken('nonsense')).toBeNull();
    expect(readUnsubscribeToken(undefined)).toBeNull();
  });

  it('only switch off what they name', () => {
    expect(unsubscribeData('reminders')).toEqual({ emailReminders: false });
    expect(unsubscribeData('weekly')).toEqual({ emailWeekly: false });
    expect(unsubscribeData('all')).toEqual({ emailReminders: false, emailWeekly: false });
  });
});
