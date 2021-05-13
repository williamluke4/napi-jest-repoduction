const { envTest } = require('./index')

process.env.TEST = 'fff'

test('simple env test', () => {
  expect.assertions(1)
  process.env.TEST = 'fff'
  try {
    const rustEnvValue = envTest('TEST')
    expect(rustEnvValue).toBe('fff')
  } catch {
    console.error('Does not work with Jest')
  }
})
