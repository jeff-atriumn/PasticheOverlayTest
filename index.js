/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Amplify} from 'aws-amplify';

Amplify.configure({
  // OPTIONAL - if your API requires authentication
  Auth: {
    identityPoolId: 'us-east-1:de5903bc-0141-488a-a38c-19dea2048e77', // REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_cQHz83kU2', // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: 'g7srne8cu30kuivgqobki14uk', // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  },
  API: {
    endpoints: [
      {
        name: 'notes',
        endpoint: 'https://nl0b32f2bc.execute-api.us-east-1.amazonaws.com',
      },
    ],
  },
});

AppRegistry.registerComponent(appName, () => App);
