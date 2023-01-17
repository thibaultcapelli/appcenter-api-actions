import * as core from '@actions/core'
import {FetchError, Response} from 'node-fetch'

import {fetchApi} from '@appcenter-api-actions/common/lib/services/api'

interface Params {
    ownerName: string;
    appName: string;
    branch: string;
    config: unknown;
}

const createBranchConfig = ({ownerName, appName, branch, config}: Params, apiToken: string): Promise<Response> => {
    const path = `${ownerName}/${appName}/branches/${branch}/config`;
    const options = {method: 'POST', body: JSON.stringify(config)};

    return fetchApi(path, options, apiToken);
}

interface Inputs {
    apiToken: string,
    ownerName: string,
    appName: string,
    branch: string,
    config: unknown,
}

export const run = async ({apiToken, ...params}: Inputs): Promise<object> => {
    try {
        const response = await createBranchConfig(params, apiToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const json = await response.json();

        console.group();
        console.info(`*******************`);
        console.info(`API response`);
        console.info(`*******************`);
        console.info(json);
        console.groupEnd();

        core.setOutput('json', json);
        return response;
    } catch (error) {
        core.setFailed(error as FetchError);
        return error as FetchError;
    }
}