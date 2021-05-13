# NAPI-RS with Jest ENV Vars Reproduction

This issue seems to arise from [this part of the jest code](https://github.com/facebook/jest/blob/master/packages/jest-util/src/installCommonGlobals.ts#L19).

Jest is mocking the process, which means that any changes to the env in a jest test environment (using something like `process.env.TEST="fff"`) will not get propagated to the actual process environment variables. Thus the rust side never receives them.

## Requirements

- latest **Rust**
- **NodeJS@10+** which fully supported N-API
- **yarn@1.x**

## How to Repoduce

```bash
git clone https://github.com/williamluke4/napi-jest-repoduction
cd napi-jest-repoduction
yarn && yarn dev
```

## Relevant Files

- [env-test.js](./env-test.js) Shows that envs are propagated correctly when just using Node
- [env.test.ts](./env.test.ts) Shows the issue with jest
