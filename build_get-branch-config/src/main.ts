import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  return await run({
    apiToken: core.getInput('API_TOKEN', { required: true }),
    ownerName: core.getInput('OWNER_NAME', { required: true }),
    appName: core.getInput('APP_NAME', { required: true }),
    branch: core.getInput('BRANCH', { required: true }),
  })
}

main()
