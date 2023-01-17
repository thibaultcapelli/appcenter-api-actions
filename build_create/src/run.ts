import * as core from '@actions/core'
import {FetchError} from 'node-fetch'

import {fetchApi} from '@appcenter-api-actions/common/lib/services/api'
import logger from '@appcenter-api-actions/common/lib/utils/logger'

interface Params {
    ownerName: string;
    appName: string;
    branch: string;
}

const createBuild = ({ownerName, appName, branch}: Params, apiToken: string) => {
    const path = `${ownerName}/${appName}/branches/${branch}/builds`;

    return fetchApi(path, {method: 'POST'}, apiToken);
}

interface Inputs {
    apiToken: string,
    ownerName: string,
    appName: string,
    branch: string,
}

export const run = async ({apiToken, ...params}: Inputs): Promise<object> => {
    try {
        const response = await createBuild(params, apiToken);
        const json = await response.json();

        logger.info('API response', json);

        core.setOutput('config', json);
        return response;
    } catch (error) {
        core.setFailed(error as FetchError);
        return error as FetchError;
    }
}
