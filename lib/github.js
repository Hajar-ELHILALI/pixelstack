// Fetches the numbers shown by the stats HUD from the GitHub GraphQL API.
// Requires a token (env GITHUB_TOKEN) with default/public scope.

const QUERY = `query($login: String!) {
  user(login: $login) {
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) { totalCount }
    pullRequests { totalCount }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

export async function fetchStats(login, token) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'pixelstack',
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const json = await res.json();
  if (json.errors && json.errors.length) throw new Error(json.errors[0].message);

  const u = json.data && json.data.user;
  if (!u) throw new Error(`utilisateur "${login}" introuvable`);

  const cc = u.contributionsCollection;
  const commits =
    (cc.totalCommitContributions || 0) + (cc.restrictedContributionsCount || 0);

  const days = cc.contributionCalendar.weeks.flatMap((w) => w.contributionDays);
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) streak++;
    else if (i === days.length - 1) continue; // today with 0 doesn't break the streak
    else break;
  }

  return {
    commits,
    repos: u.repositories.totalCount || 0,
    prs: u.pullRequests.totalCount || 0,
    streak,
  };
}
