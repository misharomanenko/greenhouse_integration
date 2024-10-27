import * as stytch from 'stytch';

let client: stytch.Client | null = null;

const loadStytch = (): stytch.Client => {
  if (client) return client;

  const projectId = process.env.NEXT_PUBLIC_STYTCH_PROJECT_ID;
  const secret = process.env.NEXT_PUBLIC_STYTCH_SECRET;
  const env = process.env.NEXT_PUBLIC_STYTCH_PROJECT_ENV;

  if (!projectId || !secret) {
    throw new Error('Stytch credentials are not properly configured');
  }

  client = new stytch.Client({
    project_id: projectId,
    secret: secret,
    env: env === 'live' ? stytch.envs.live : stytch.envs.test,
  });

  return client;
};

export default loadStytch;
