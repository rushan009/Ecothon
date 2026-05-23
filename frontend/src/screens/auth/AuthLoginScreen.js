import { useState } from 'react';
import { AuthBackdrop } from '../../components/auth';
import { AuthLoginForm } from '../../components/auth/AuthLoginForm';
import { useTranslation } from '../../i18n/LanguageContext';

export default function AuthLoginScreen({ navigation, onLoggedIn, onBack }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('9841234567');

  return (
    <AuthBackdrop variant="soft">
      <AuthLoginForm
        title={t('loginTitle')}
        subtitle="Enter your phone number to continue"
        phone={phone}
        onChangePhone={setPhone}
        onContinue={onLoggedIn || (() => navigation.replace('UserApp'))}
        onBack={onBack}
        footerText="By continuing, you agree to RecycleSathi's Terms of Service and Privacy Policy."
        primaryButtonLabel="Continue"
        secondaryButtonLabel="Continue with Google"
        secondaryLinkLabel="New here? Create Account"
      />
    </AuthBackdrop>
  );
}