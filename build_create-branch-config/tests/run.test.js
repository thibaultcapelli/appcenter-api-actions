"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_1 = require("../src/run");
test('run successfully', async () => {
    const apiToken = process.env.API_TOKEN;
    const ownerName = process.env.OWNER_NAME;
    const appName = process.env.APP_NAME;
    const branch = process.env.BRANCH;
    const config = JSON.parse(process.env.CONFIG);
    console.info(apiToken, ownerName, appName, branch, config);
    await expect((0, run_1.run)({ apiToken, branch, appName, ownerName, config })).resolves.toMatchObject({ ok: true });
});
