import scanner from 'sonarqube-scanner'

scanner(
  {
    serverUrl: 'http://sonarqube.manueldevops.tech',
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