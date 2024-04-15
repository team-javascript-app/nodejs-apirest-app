import scanner from 'sonarqube-scanner'

scanner(
  {
    serverUrl: process.env.URL,
    token: process.env.TOKEN,
     options: {
      'sonar.projectName': 'nodejs-apirest-app',
      'sonar.sources': 'src',
      'sonar.tests': '__tests__',
      'sonar.javascript.lcov.reportPaths': './coverage/lcov.info'
    },
  },
  () => process.exit(),
);