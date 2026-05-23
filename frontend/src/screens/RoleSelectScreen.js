import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton, GlassCard, GhostButton } from '../components/ui';
import { colors, spacing, typography } from '../theme/tokens';
import { useTranslation } from '../i18n/LanguageContext';

export default function RoleSelectScreen({ navigation }) {
  const { t, language, setLanguage } = useTranslation();

  return (
    <LinearGradient colors={colors.gradientPrimary} style={styles.container}>
      <View style={styles.languageWrap}>
        <GhostButton label={`EN | ${language === 'np' ? 'नेपाली' : 'NP'}`} onPress={() => setLanguage(language === 'np' ? 'en' : 'np')} />
      </View>

      <View style={styles.centerWrap}>
        <Text style={styles.logo}>♻️</Text>
        <Text style={styles.title}>{t('appName')}</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
      </View>

      <GlassCard style={styles.card}>
        <Text style={styles.cardTitle}>{t('rolePickerTitle')}</Text>
        <Text style={styles.cardSubtitle}>{t('rolePickerSubtitle')}</Text>

        <GradientButton label={t('userApp')} onPress={() => navigation.navigate('UserOnboarding')} />
        <GradientButton label={t('collectorApp')} onPress={() => navigation.navigate('CollectorLogin')} />
        <GradientButton label={t('adminDashboard')} onPress={() => navigation.navigate('AdminDashboard')} />
      </GlassCard>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  languageWrap: {
    marginTop: 48,
    alignItems: 'flex-end',
  },
  centerWrap: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    fontSize: 76,
  },
  title: {
    ...typography.headlineLg,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tagline: {
    ...typography.bodyMd,
    color: '#D6FFF0',
  },
  card: {
    gap: spacing.sm,
    marginBottom: 24,
  },
  cardTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  cardSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sm,
  },
});
