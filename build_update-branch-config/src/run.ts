import * as core from '@actions/core'

import logger from '@appcenter-api-actions/common/lib/utils/logger'
import AppCenter from '@appcenter-api-actions/api'

interface Params {
    ownerName: string;
    appName: string;
    branch: string;
    configPath: any;
}

interface Inputs {
    apiToken: string,
    ownerName: string,
    appName: string,
    branch: string,
    configPath: string,
}

export const run = async ({apiToken, branch, ownerName, appName, configPath}: Inputs) => {
    try {
        console.log(configPath, typeof configPath);
        const config = require(configPath);
        console.log(config, typeof config);
        const appCenter = new AppCenter(apiToken);
        const response = await appCenter.branchConfigurations_update({
            ownerName,
            appName,
            branch,
            params: config
        });

        logger.info(`API response status: ${response.status}`);

        core.setOutput('response', response);
        return response;
    } catch (error) {
        core.setFailed((error as Error).message);
        return error;
    }
}
