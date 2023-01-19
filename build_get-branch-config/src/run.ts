import * as core from '@actions/core'

import logger from '@appcenter-api-actions/common/lib/utils/logger'
import AppCenter from '@appcenter-api-actions/api'
import {
    ResponseWithBody,
    Response_branchConfigurations_get_200,
    Response_branchConfigurations_get_default
} from '@appcenter-api-actions/api/lib/generated/app-center';

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

type Response =
    ResponseWithBody<200, Response_branchConfigurations_get_200>
    | ResponseWithBody<number, Response_branchConfigurations_get_default>;

export const run = async ({apiToken, branch, ownerName, appName}: Inputs): Promise<Response> => {
    try {
        const appCenter = new AppCenter(apiToken);
        const response = await appCenter.branchConfigurations_get({
            ownerName,
            appName,
            branch,
        });

        logger.info(`API response status: ${response.status}`);

        core.setOutput('status', response.status);
        core.setOutput('body', response.body);

        return response;
    } catch (error) {
        const response = error as ResponseWithBody<number, Response_branchConfigurations_get_default>

        logger.info(`API response status: ${response.status}`);

        core.setOutput('status', response.status);
        core.setOutput('body', response.body);

        return response;
    }
}
