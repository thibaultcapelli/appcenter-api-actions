import * as dotenv from 'dotenv'
import AppCenter from '@appcenter-api-actions/api'

import { run } from '../src/run'

dotenv.config();

const apiToken = process.env.API_TOKEN as string;
const ownerName = process.env.OWNER_NAME as string;
const appName = process.env.APP_NAME as string;
const branch = process.env.BRANCH as string;
const config = JSON.parse(process.env.CONFIG as string) as object;

jest.setTimeout(10000);

const appCenter = new AppCenter(apiToken);

beforeEach(async () => {
    const response = await appCenter.branchConfigurations_get({ownerName, appName, branch});
    if (response.status === 200) {
        await appCenter.branchConfigurations_delete({ownerName, appName, branch});
    }
});

test('run successfully', async () => {
    await expect(run({apiToken, branch, appName, ownerName, config})).resolves.toHaveProperty('status', 200);
})
