import React from 'react';
import { Button, Text, View} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import qs from 'qs';

const config = {
  clientId: 'CLIENT_ID', // replace with your Fitbit app's client ID
  scopes: ['heartrate', 'activity', 'profile', 'sleep'],
};
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
console.log(redirectUri);

const getFitbitAuthUrl = () => {
  const baseUrl = 'https://www.fitbit.com/oauth2/authorize';
  redirectUri;
  const queryParams = qs.stringify({
    client_id: config.clientId,
    response_type: 'token',
    scope: config.scopes.join(' '),
    redirect_uri: redirectUri,
    expires_in: '31536000',
  });

  return `${baseUrl}?${queryParams}`;
};

export default function App() {
  const [authToken, setAuthToken] = React.useState(null);

  const handlePress = async () => {
    const authUrl = getFitbitAuthUrl();
    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === 'success') {
      setAuthToken(result.params.access_token);
    }
  };

  console.log(authToken);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {authToken ? (
        <Text>Your Fitbit access token: {authToken}</Text>
      ) : (
        <Button title="Authorize Fitbit" onPress={handlePress} />
      )}
    </View>
    
  );

}
