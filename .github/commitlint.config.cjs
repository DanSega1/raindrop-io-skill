module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.trim() === 'Initial plan'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'doc',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    'subject-full-stop': [0, 'never', '.'],
    'body-max-line-length': [0]
  }
};
