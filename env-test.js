const { envTest } = require('./index')

const val = 'fff'

process.env.TEST = val

function main() {
  try {
    const rustEnvValue = envTest('TEST')
    if (rustEnvValue === val) {
      console.info('Success Works without Jest')
    } else {
      console.error('Nope')
    }
  } catch (err) {
    console.info('ENV Var Not Found')
  }
}

main()
