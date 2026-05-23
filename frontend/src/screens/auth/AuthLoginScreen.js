import { AuthBackdrop } from '../../components/auth';
import { AuthLoginForm } from '../../components/auth/AuthLoginForm';
import { useTranslation } from '../../i18n/LanguageContext';
import Toast from 'react-native-toast-message';
import { useAuthForm } from '../../features/auth';

export default function AuthLoginScreen({ navigation, onLoggedIn, onBack, onCreateAccount, auth }) {
  const { t } = useTranslation();
  const authState = auth || useAuthForm();
  const { form, setField, submitLogin, loading } = authState;

  const handleContinue = async () => {
    if (!form.phone?.trim() || !form.password?.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Phone and password are required',
      });
      return;
    }

    try {
      await submitLogin();

      if (onLoggedIn) {
        onLoggedIn();
        return;
      }

      navigation?.replace?.('UserApp');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error?.response?.data?.message || error?.message || 'Please try again',
      });
    }
  };

  return (
    <AuthBackdrop variant="soft">
      <AuthLoginForm
        title={t('loginTitle')}
        subtitle="Enter your phone number to continue"
        phone={form.phone}
        onChangePhone={(value) => setField('phone', value)}
        password={form.password}
        onChangePassword={(value) => setField('password', value)}
        onContinue={handleContinue}
        onBack={onBack}
        onCreateAccount={onCreateAccount || (() => navigation?.navigate?.('AuthSignup'))}
        footerText="By continuing, you agree to RecycleSathi's Terms of Service and Privacy Policy."
        primaryButtonLabel={loading ? 'Signing in...' : 'Continue'}
        secondaryLinkLabel="New here? Create Account"
      />
    </AuthBackdrop>
  );
}