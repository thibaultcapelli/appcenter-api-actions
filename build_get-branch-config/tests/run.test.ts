import * as dotenv from 'dotenv'

import { run } from '../src/run'

dotenv.config();

const apiToken = process.env.API_TOKEN as string;
const ownerName = process.env.OWNER_NAME as string;
const appName = process.env.APP_NAME as string;
const branch = process.env.BRANCH as string;

jest.setTimeout(10000);

test('run successfully', async () => {
    await expect(run({apiToken, branch, appName, ownerName})).resolves.toHaveProperty('status', 200);
})
