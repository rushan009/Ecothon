import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

const metrics = [
  { value: '500kg', label: 'Waste diverted', note: 'Hackathon MVP target' },
  { value: '90%', label: 'Pickup success', note: 'Reliable collector matching' },
  { value: '120pts', label: 'Eco rewards', note: 'Sample user milestone' },
];

const steps = [
  { title: 'Scan Waste', description: 'Capture a bottle, box, battery, or scrap pile and get a category estimate.' },
  { title: 'Book Pickup', description: 'Confirm your address, preferred time, and estimated value in NPR.' },
  { title: 'Earn Rewards', description: 'Complete the handoff, track your carbon savings, and build green points.' },
];

const personas = {
  user: [
    'Phone OTP login with Nepali and English labels',
    'AI waste classification and manual weight adjustment',
    'Pickup booking, live status, and rewards dashboard',
  ],
  collector: [
    'Pending request list with distance and item weight',
    'Accept, navigate, confirm, and log final weight',
    'Track earnings, route savings, and pickup history',
  ],
  admin: [
    'Overview cards for users, collectors, pickups, and kg collected',
    'Charts and heatmaps for recycling hotspots',
    'Scrap rate management and regional insights',
  ],
};

const roadmap = [
  'MVP: scan -> quote -> pickup -> complete',
  'Next: multi-item pickups, route optimization, and digital payments',
  'Scale: analytics for municipalities, NGOs, and new waste categories',
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
    </View>
  );
}

function Pill({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default function App() {
  const [activePersona, setActivePersona] = useState('user');

  const activePersonaLabel = useMemo(() => {
    if (activePersona === 'collector') return 'Collector workflow';
    if (activePersona === 'admin') return 'Admin analytics';
    return 'Household experience';
  }, [activePersona]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brandKicker}>RecycleSathi</Text>
            <Text style={styles.brandSubtitle}>Turn Waste Into Value</Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>MVP ready</Text>
          </View>
        </View>

        <Card style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Nepal-first recycling marketplace</Text>
            </View>
            <View style={styles.heroBadgeSecondary}>
              <Text style={styles.heroBadgeSecondaryText}>AI-powered pickup flow</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>A premium sustainability app for households, kabadiwalas, and city teams.</Text>
          <Text style={styles.heroCopy}>
            This frontend translates the hackathon plan into a polished mobile experience: scan recyclables, get a fair estimate,
            schedule pickup, and watch the environmental impact accumulate in real time.
          </Text>

          <View style={styles.ctaRow}>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Scan Waste</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>View Flow</Text>
            </Pressable>
          </View>

          <View style={styles.heroStatsGrid}>
            {metrics.map((metric) => (
              <View key={metric.label} style={styles.metricCard}>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricNote}>{metric.note}</Text>
              </View>
            ))}
          </View>
        </Card>

        <SectionTitle
          eyebrow="Why it matters"
          title="Built from the project plan, not just a generic app shell"
          description="The product needs to work for households, collectors, and administrators at the same time."
        />

        <View style={styles.stepsGrid}>
          {steps.map((step, index) => (
            <Card key={step.title} style={styles.stepCard}>
              <View style={styles.stepNumber}><Text style={styles.stepNumberText}>0{index + 1}</Text></View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </Card>
          ))}
        </View>

        <SectionTitle
          eyebrow="Experience map"
          title={`One interface, three viewpoints: ${activePersonaLabel}`}
          description="Tap a role to preview the features that matter most to that user type."
        />

        <View style={styles.pillRow}>
          <Pill label="User" active={activePersona === 'user'} onPress={() => setActivePersona('user')} />
          <Pill label="Collector" active={activePersona === 'collector'} onPress={() => setActivePersona('collector')} />
          <Pill label="Admin" active={activePersona === 'admin'} onPress={() => setActivePersona('admin')} />
        </View>

        <Card style={styles.featureCard}>
          <Text style={styles.featureHeading}>{activePersonaLabel}</Text>
          <View style={styles.featureList}>
            {personas[activePersona].map((item) => (
              <View key={item} style={styles.featureRow}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>{item}</Text>
              </View>
            ))}
          </View>
        </Card>

        <SectionTitle
          eyebrow="Impact dashboard"
          title="A sustainability story users can actually understand"
          description="The design emphasizes environmental value, collector reliability, and transparent pricing."
        />

        <View style={styles.impactGrid}>
          <Card style={styles.impactCardTall}>
            <Text style={styles.impactLabel}>Environmental lift</Text>
            <Text style={styles.impactTitle}>kg recycled, CO₂e saved, and trees equivalent</Text>
            <Text style={styles.impactCopy}>
              The app should show a clean reward narrative so users can see the effect of every pickup, not just the cash value.
            </Text>
            <View style={styles.chartMock}>
              <View style={[styles.chartBar, { height: '42%' }]} />
              <View style={[styles.chartBar, { height: '64%' }]} />
              <View style={[styles.chartBar, { height: '53%' }]} />
              <View style={[styles.chartBar, { height: '78%' }]} />
              <View style={[styles.chartBar, { height: '60%' }]} />
            </View>
          </Card>

          <Card style={styles.impactCardSmall}>
            <Text style={styles.impactLabel}>Pricing</Text>
            <Text style={styles.impactMiniTitle}>Transparent scrap rates</Text>
            <Text style={styles.impactMiniCopy}>Show live NPR estimates and reduce haggling at pickup time.</Text>
          </Card>

          <Card style={styles.impactCardSmall}>
            <Text style={styles.impactLabel}>Routing</Text>
            <Text style={styles.impactMiniTitle}>Optimized collector trips</Text>
            <Text style={styles.impactMiniCopy}>Cluster nearby pickups to save fuel and make work more reliable.</Text>
          </Card>
        </View>

        <SectionTitle
          eyebrow="Roadmap"
          title="A launchable hackathon MVP with a realistic growth path"
          description="The plan supports a 24-48 hour demo now and future expansion into payments, analytics, and localization."
        />

        <Card style={styles.roadmapCard}>
          {roadmap.map((item, index) => (
            <View key={item} style={[styles.roadmapRow, index !== roadmap.length - 1 && styles.roadmapRowDivider]}>
              <View style={styles.roadmapBullet}>
                <Text style={styles.roadmapBulletText}>0{index + 1}</Text>
              </View>
              <Text style={styles.roadmapText}>{item}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.footerCard}>
          <Text style={styles.footerTitle}>RecycleSathi MVP concept</Text>
          <Text style={styles.footerCopy}>
            Mobile-first, glassmorphic, eco-focused, and ready to be expanded into the full booking, collector, and admin stack
            described in the project plan.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f8f4',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 20,
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -80,
    right: -100,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(22, 163, 74, 0.14)',
  },
  backgroundGlowBottom: {
    position: 'absolute',
    bottom: 120,
    left: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  brandKicker: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  brandSubtitle: {
    color: '#46614e',
    marginTop: 2,
    fontSize: 14,
    fontWeight: '600',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16a34a',
  },
  liveBadgeText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.76)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#102018',
    shadowOpacity: 0.08,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  heroCard: {
    padding: 20,
    gap: 18,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(22, 163, 74, 0.12)',
  },
  heroBadgeText: {
    color: '#0f5b2e',
    fontSize: 12,
    fontWeight: '700',
  },
  heroBadgeSecondary: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
  },
  heroBadgeSecondaryText: {
    color: '#0c5f58',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#0f172a',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  heroCopy: {
    color: '#405057',
    fontSize: 16,
    lineHeight: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#14532d',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(20, 83, 45, 0.18)',
  },
  secondaryButtonText: {
    color: '#14532d',
    fontSize: 15,
    fontWeight: '800',
  },
  heroStatsGrid: {
    gap: 12,
  },
  metricCard: {
    padding: 16,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.05)',
  },
  metricValue: {
    color: '#0f172a',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  metricLabel: {
    marginTop: 2,
    color: '#28433a',
    fontSize: 14,
    fontWeight: '700',
  },
  metricNote: {
    marginTop: 4,
    color: '#5a6c66',
    fontSize: 12,
  },
  sectionHeader: {
    gap: 6,
    marginTop: 4,
  },
  eyebrow: {
    color: '#0b7b4a',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  sectionDescription: {
    color: '#526068',
    fontSize: 15,
    lineHeight: 22,
  },
  stepsGrid: {
    gap: 12,
  },
  stepCard: {
    padding: 18,
    gap: 10,
  },
  stepNumber: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(22, 163, 74, 0.12)',
  },
  stepNumberText: {
    color: '#0b7b4a',
    fontSize: 12,
    fontWeight: '800',
  },
  stepTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },
  stepDescription: {
    color: '#526068',
    fontSize: 14,
    lineHeight: 21,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  pillActive: {
    backgroundColor: '#14532d',
    borderColor: '#14532d',
  },
  pillText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  featureCard: {
    padding: 18,
    gap: 14,
  },
  featureHeading: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },
  featureList: {
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  featureDot: {
    marginTop: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0b7b4a',
  },
  featureText: {
    flex: 1,
    color: '#3f4d57',
    fontSize: 14,
    lineHeight: 21,
  },
  impactGrid: {
    gap: 12,
  },
  impactCardTall: {
    padding: 18,
    gap: 10,
  },
  impactCardSmall: {
    padding: 18,
    gap: 8,
  },
  impactLabel: {
    color: '#0b7b4a',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  impactTitle: {
    color: '#0f172a',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  impactCopy: {
    color: '#526068',
    fontSize: 14,
    lineHeight: 21,
  },
  chartMock: {
    height: 120,
    marginTop: 6,
    paddingHorizontal: 8,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: 'rgba(236, 253, 245, 0.8)',
    borderRadius: 20,
  },
  chartBar: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#0d9488',
    opacity: 0.82,
  },
  impactMiniTitle: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '800',
  },
  impactMiniCopy: {
    color: '#526068',
    fontSize: 14,
    lineHeight: 21,
  },
  roadmapCard: {
    padding: 18,
  },
  roadmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  roadmapRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  roadmapBullet: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 163, 74, 0.12)',
  },
  roadmapBulletText: {
    color: '#0b7b4a',
    fontSize: 12,
    fontWeight: '800',
  },
  roadmapText: {
    flex: 1,
    color: '#34454b',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  footerCard: {
    padding: 18,
    gap: 8,
    marginBottom: 4,
  },
  footerTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },
  footerCopy: {
    color: '#526068',
    fontSize: 14,
    lineHeight: 21,
  },
});