import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  await run({
    apiToken: core.getInput('API_TOKEN', { required: true }),
    ownerName: core.getInput('OWNER_NAME', { required: true }),
    appName: core.getInput('APP_NAME', { required: true }),
    branch: core.getInput('BRANCH', { required: true }),
    config: JSON.parse(core.getInput('CONFIG', { required: true })) as object,
  })
}

main().catch((e) => core.setFailed(e instanceof Error ? e : String(e)))
