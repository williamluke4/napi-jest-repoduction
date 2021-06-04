# NAPI-RS with Jest ENV Vars Reproduction

This issue seems to arise from [this part of the jest code](https://github.com/facebook/jest/blob/master/packages/jest-util/src/installCommonGlobals.ts#L19).

Jest is mocking the process, which means that any changes to the env in a jest test environment (using something like `process.env.TEST="fff"`) will not get propagated to the actual process environment variables. Thus the rust side never receives them.

## Relevant Files

- [env-test.js](./env-test.js) Shows that envs are propagated correctly when just using Node
- [env.test.ts](./env.test.ts) Shows the issue with jest
- [patchJest.ts](./patchJest.ts) The Monkey Patch we are currently using
## Requirements

- latest **Rust**
- **NodeJS@10+** which fully supported N-API
- **yarn@1.x**

## How to Reproduce

```bash
git clone https://github.com/williamluke4/napi-jest-repoduction
cd napi-jest-repoduction
yarn build 
# This will fail
jest  
# This will now work after the patch
ts-node ./patchJest.ts && jest
# This will also pass as it is not jest 
node ./env-test.js
# You can also revert the patch using 
ts-node ./patchJest.ts unpatch
```


