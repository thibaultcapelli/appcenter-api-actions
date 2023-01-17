import * as dotenv from 'dotenv'
import { run } from '../src/run'
import { fetchApi } from "@appcenter-api-actions/common/lib/services/api";

dotenv.config();

console.log('API_TOKEN=', process.env.API_TOKEN);

console.log('CONFIG=', process.env.CONFIG, typeof process.env.CONFIG);

const apiToken = process.env.API_TOKEN as string;
const ownerName = process.env.OWNER_NAME as string;
const appName = process.env.APP_NAME as string;
const branch = process.env.BRANCH as string;
const config = JSON.parse(process.env.CONFIG as string) as object;

beforeEach(async () => {
    const path = `${ownerName}/${appName}/branches/${branch}/config`;
    const options = {method: 'DELETE'};

    await fetchApi(path, options, apiToken);
});

test('run successfully', async () => {
    await expect(run({apiToken, branch, appName, ownerName, config})).resolves.toHaveProperty('ok', true)
})
