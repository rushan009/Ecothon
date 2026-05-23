import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { BottomNav, EmptyState, GlassCard, GradientButton, GhostButton, MapViewWrapper, ScreenEnter } from '../components/ui';
import { COLLECTOR_REQUESTS } from '../data/mockData';
import { useTranslation } from '../i18n/LanguageContext';
import { colors, spacing, typography } from '../theme/tokens';
import { formatKg, formatNPR } from '../utils/format';

export function CollectorLoginScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={styles.loginWrap}>
      <GlassCard style={styles.cardGap}>
        <Text style={styles.headline}>Collector Login</Text>
        <Text style={styles.body}>OTP flow is shared with user app, tailored for collectors.</Text>
        <GradientButton label={t('verifyOtp')} onPress={() => navigation.replace('CollectorApp')} />
      </GlassCard>
    </View>
  );
}

export function CollectorDashboardScreen({ navigation }) {
  const { t } = useTranslation();
  const online = true;

  return (
    <ScreenEnter>
      <ScrollView contentContainerStyle={styles.page}>
        <GlassCard style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.body}>{online ? '🟢 Online' : '🔴 Offline'}</Text>
            <Switch value={online} />
          </View>
          <Text style={styles.earningsChip}>💰 {formatNPR(1240)} · {t('todayEarnings')}</Text>
          <Text style={styles.body}>✅ 4 Pickups | 📦 {formatKg(18.5)}</Text>
        </GlassCard>

        <Text style={styles.headline}>Pending Requests</Text>
        {COLLECTOR_REQUESTS.length ? (
          COLLECTOR_REQUESTS.map((request) => (
            <GlassCard key={request.id} style={styles.cardGap}>
              <Text style={styles.bodyStrong}>{request.items}</Text>
              <Text style={styles.body}>{formatKg(request.weight)} · {request.distance} km · {request.posted}</Text>
              <Text style={styles.body}>{request.area}</Text>
              <View style={styles.rowGap}>
                <GradientButton label="Accept" onPress={() => navigation.navigate('CollectorActivePickup')} />
                <GhostButton label="Decline" onPress={() => {}} />
              </View>
            </GlassCard>
          ))
        ) : (
          <EmptyState title="No pending requests. Stay online!" />
        )}
      </ScrollView>
    </ScreenEnter>
  );
}

export function CollectorMapScreen({ navigation }) {
  return (
    <View style={styles.pageFlex}>
      <MapViewWrapper label="Active Pickup Request Pins" height={420} />
      <GradientButton label="Accept Selected Request" onPress={() => navigation.navigate('CollectorActivePickup')} />
    </View>
  );
}

export function CollectorActivePickupScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <MapViewWrapper label="Turn-by-turn pickup route" height={300} />
      <GlassCard style={styles.cardGap}>
        <Text style={styles.bodyStrong}>Priya Sharma · +977-9841234567</Text>
        <Text style={styles.body}>📦 5 kg Plastic + 2 kg Paper — est. रु.190</Text>
        <View style={styles.rowGap}>
          <GhostButton label="📞 Call User" onPress={() => {}} />
          <GradientButton label="I've Arrived" onPress={() => navigation.navigate('CollectorConfirmCollection')} />
        </View>
      </GlassCard>
    </ScrollView>
  );
}

export function CollectorConfirmCollectionScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <GlassCard style={styles.cardGap}>
        <Text style={styles.headline}>Final Weight Entry</Text>
        <Text style={styles.body}>Plastic: 5.0 kg</Text>
        <Text style={styles.body}>Paper: 2.2 kg</Text>
        <Text style={styles.total}>Total: {formatNPR(185)}</Text>
        <GradientButton label="Complete Pickup" onPress={() => navigation.navigate('CollectorEarnings')} />
      </GlassCard>
    </ScrollView>
  );
}

export function CollectorEarningsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <GlassCard style={styles.cardGap}>
        <Text style={styles.headline}>Earnings Dashboard</Text>
        <Text style={styles.body}>This week: {formatNPR(8640)}</Text>
        <Text style={styles.body}>This month: {formatNPR(34100)}</Text>
      </GlassCard>
      <View style={styles.chartRow}>
        {[45, 70, 30, 58, 66, 76, 62].map((bar, idx) => <View key={idx} style={[styles.chartBar, { height: bar }]} />)}
      </View>
      <GlassCard style={styles.cardGap}>
        <Text style={styles.body}>Payout info (v1): eSewa linked</Text>
        <GradientButton label="Request Payout" onPress={() => {}} />
      </GlassCard>
    </ScrollView>
  );
}

export function CollectorProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <GlassCard style={styles.cardGap}>
        <Text style={styles.headline}>Hari Bahadur</Text>
        <Text style={styles.body}>Motorbike · Balaju</Text>
        <Text style={styles.body}>⭐ 4.7 (128 reviews)</Text>
      </GlassCard>
      <GlassCard style={styles.cardGap}>
        <Text style={styles.bodyStrong}>Recent Reviews</Text>
        <Text style={styles.body}>"On time and fair."</Text>
        <Text style={styles.body}>"Friendly and quick pickup."</Text>
      </GlassCard>
    </ScrollView>
  );
}

export function CollectorHistoryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      {COLLECTOR_REQUESTS.map((request) => (
        <GlassCard key={request.id} style={styles.cardGap}>
          <Text style={styles.bodyStrong}>{request.area}</Text>
          <Text style={styles.body}>{request.items}</Text>
          <Text style={styles.body}>{formatNPR(request.est)}</Text>
        </GlassCard>
      ))}
    </ScrollView>
  );
}

export const collectorTabBar = (props) => <BottomNav {...props} />;

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  page: {
    padding: spacing.md,
    gap: spacing.md,
  },
  pageFlex: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardGap: {
    gap: spacing.sm,
  },
  statusCard: {
    gap: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsChip: {
    ...typography.labelMd,
    color: colors.primary,
    fontWeight: '700',
  },
  headline: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  bodyStrong: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  body: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  total: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  rowGap: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  chartRow: {
    height: 130,
    backgroundColor: 'rgba(236,253,245,0.6)',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: 'rgba(22,163,74,0.78)',
  },
});
