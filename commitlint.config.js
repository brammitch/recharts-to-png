module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', ['lower-case', 'pascal-case', 'camel-case']],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['lib', 'deps', 'release', 'other']],
  },
};
