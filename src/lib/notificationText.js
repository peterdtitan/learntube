import { presetText } from './comments';
import { describeMilestone } from './milestoneRules';

// One notification per actor and thing, so repeats (kudos off and on again) don't stack up.
export function notificationKey(kind, {
  actorId, makeId, milestoneId, preset,
}) {
  switch (kind) {
    case 'KUDOS': return `kudos:${makeId}:${actorId}`;
    case 'COMMENT': return `comment:${makeId}:${actorId}:${preset}`;
    case 'FOLLOW': return `follow:${actorId}`;
    case 'CHEER': return `cheer:${milestoneId}:${actorId}`;
    default: throw new Error(`Unknown notification kind ${kind}`);
  }
}

// What the notification says after the actor's name, and where it leads.
export function describeNotification(n, recipientId) {
  const makeTitle = n.make?.title ? `“${n.make.title}”` : 'your make';
  switch (n.kind) {
    case 'KUDOS':
      return { text: `gave kudos to ${makeTitle}`, href: `/makes/${n.makeId}` };
    case 'COMMENT':
      return {
        text: `said “${presetText(n.preset) || 'something nice'}” on ${makeTitle}`,
        href: `/makes/${n.makeId}`,
      };
    case 'FOLLOW':
      return { text: 'started following you', href: `/learners/${n.actorId}` };
    case 'CHEER':
      return {
        text: n.milestone
          ? `cheered you for: ${describeMilestone(n.milestone, n.milestone.pathway?.title, 'your')}`
          : 'cheered one of your milestones',
        href: `/learners/${recipientId}`,
      };
    default:
      return { text: 'did something', href: '/notifications' };
  }
}

export function timeAgo(date, now = new Date()) {
  const seconds = Math.max(0, Math.round((now - new Date(date)) / 1000));
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 7 * 86400) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
