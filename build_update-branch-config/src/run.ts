import * as core from '@actions/core'
import {FetchError} from 'node-fetch'

import {fetchApi} from '../../common/src/services/api'
import logger from '@appcenter-api-actions/common/lib/utils/logger'

interface Params {
    ownerName: string;
    appName: string;
    branch: string;
    config: any;
}

const updateBranchConfig = ({ownerName, appName, branch, config}: Params, apiToken: string) => {
    const path = `${ownerName}/${appName}/branches/${branch}/config`;
    const options = {method: 'PUT', body: JSON.stringify(config)};

    return fetchApi(path, options, apiToken);
}

interface Inputs {
    apiToken: string,
    ownerName: string,
    appName: string,
    branch: string,
    config: any,
}

export const run = async ({apiToken, ...params}: Inputs): Promise<object> => {
    try {
        const response = await updateBranchConfig(params, apiToken);
        const json = await response.json();

        logger.info('API response', json);

        core.setOutput('json', json);
        return response;
    } catch (error) {
        core.setFailed(error as FetchError);
        return error as FetchError;
    }
}
