import { useState } from 'react';
import AuthLandingScreen from './AuthLandingScreen';
import AuthLoginScreen from './AuthLoginScreen';

export default function AuthFlow({ AppNavigator }) {
  const [stage, setStage] = useState('landing');

  if (stage === 'app') {
    return <AppNavigator />;
  }

  if (stage === 'login') {
    return <AuthLoginScreen onLoggedIn={() => setStage('app')} onBack={() => setStage('landing')} />;
  }

  return <AuthLandingScreen onGetStarted={() => setStage('login')} />;
}