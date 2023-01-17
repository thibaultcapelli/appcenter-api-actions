import * as dotenv from 'dotenv'
import { fetchApi } from '@appcenter-api-actions/common/lib/services/api';

import { run } from '../src/run'

dotenv.config();

const apiToken = process.env.API_TOKEN as string;
const ownerName = process.env.OWNER_NAME as string;
const appName = process.env.APP_NAME as string;
const branch = process.env.BRANCH as string;

beforeEach(async () => {
    // TODO: Create a configuration for the given branch to update it.
});

test('run successfully', async () => {
    await expect(run({apiToken, branch, appName, ownerName})).resolves.toHaveProperty('ok', true);
})
