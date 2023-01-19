import * as core from '@actions/core'

import logger from '@appcenter-api-actions/common/lib/utils/logger'
import AppCenter from '@appcenter-api-actions/api'

interface Params {
    ownerName: string;
    appName: string;
    branch: string;
}

interface Inputs {
    apiToken: string,
    ownerName: string,
    appName: string,
    branch: string,
}

export const run = async ({apiToken, branch, ownerName, appName}: Inputs) => {
    try {
        const appCenter = new AppCenter(apiToken);
        const response = await appCenter.branchConfigurations_get({
            ownerName,
            appName,
            branch,
        });

        logger.info(`API response status: ${response.status}`);

        core.setOutput('response', response);
        return response;
    } catch (error) {
        core.setFailed((error as Error).message);
        return error;
    }
}
