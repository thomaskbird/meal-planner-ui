const { quote: escape } = require('shell-quote')

const isWin = process.platform === 'win32'

module.exports = {
  '**/*.{js,jsx,ts,tsx}': filenames => {
    const escapedFileNames = filenames
      .map(filename => `"${isWin ? filename : escape([filename])}"`)
      .join(' ')
    const filenamesForESLint = filenames.map(f => `"${f}"`).join(' ')

    return [
      `eslint --cache --fix ${filenamesForESLint}`,
      `prettier --write ${escapedFileNames}`,
      `jest --bail --findRelatedTests ${escapedFileNames}`
    ]
  },
  '**/*.{json,yml,yaml,css,less,scss,md,graphql,mdx}': filenames => {
    const escapedFileNames = filenames
      .map(filename => `"${isWin ? filename : escape([filename])}"`)
      .join(' ')
    return [`prettier --write ${escapedFileNames}`]
  }
}
