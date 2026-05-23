import { useState } from 'react';
import { useAuthForm } from '../../features/auth';
import AuthLandingScreen from './AuthLandingScreen';
import AuthLoginScreen from './AuthLoginScreen';
import AuthSignupScreen from './AuthSignupScreen';
import RoleSelectionScreen from './RoleSelectionScreen';
import RegistrationDetailsScreen from './RegistrationDetailsScreen';

export default function AuthFlow({ AppNavigator }) {
  const [stage, setStage] = useState('landing');
  const auth = useAuthForm();

  if (stage === 'app') {
    return <AppNavigator initialRouteName="UserApp" />;
  }

  if (stage === 'login') {
    return <AuthLoginScreen onLoggedIn={() => setStage('app')} onBack={() => setStage('landing')} onCreateAccount={() => setStage('signup')} />;
  }

  if (stage === 'signup') {
    return <AuthSignupScreen auth={auth} onBack={() => setStage('login')} onContinue={() => setStage('details')} />;
  }

  if (stage === 'details') {
    return <RegistrationDetailsScreen auth={auth} onBack={() => setStage('signup')} onComplete={() => setStage('roles')} />;
  }

  if (stage === 'roles') {
    return <RoleSelectionScreen auth={auth} onBack={() => setStage('details')} onContinue={() => setStage('app')} />;
  }

  return <AuthLandingScreen onGetStarted={() => setStage('login')} />;
}