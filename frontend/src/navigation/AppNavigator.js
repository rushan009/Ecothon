import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoleSelectScreen from '../screens/RoleSelectScreen';
import AdminDashboardScreen from '../screens/AdminScreen';
import {
  PickupBookingScreen,
  PickupCompleteScreen,
  PickupHistoryScreen,
  RewardsScreen,
  ScrapPricesScreen,
  LiveTrackingScreen,
  UserHomeScreen,
  UserLoginScreen,
  UserOnboardingScreen,
  UserProfileScreen,
  WasteScannerScreen,
  userTabBar,
} from '../screens/UserScreens';
import {
  CollectorActivePickupScreen,
  CollectorConfirmCollectionScreen,
  CollectorDashboardScreen,
  CollectorEarningsScreen,
  CollectorHistoryScreen,
  CollectorLoginScreen,
  CollectorMapScreen,
  CollectorProfileScreen,
  collectorTabBar,
} from '../screens/CollectorScreens';
import { colors } from '../theme/tokens';

const RootStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const CollectorStack = createNativeStackNavigator();
const UserTabs = createBottomTabNavigator();
const CollectorTabs = createBottomTabNavigator();

function UserTabNavigator() {
  return (
    <UserTabs.Navigator tabBar={userTabBar} screenOptions={{ headerShown: false }}>
      <UserTabs.Screen name="Home" component={UserHomeScreen} />
      <UserTabs.Screen name="Scan" component={WasteScannerScreen} />
      <UserTabs.Screen name="History" component={PickupHistoryScreen} />
      <UserTabs.Screen name="Rewards" component={RewardsScreen} />
      <UserTabs.Screen name="Profile" component={UserProfileScreen} />
    </UserTabs.Navigator>
  );
}

function UserFlow() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <UserStack.Screen name="UserTabs" component={UserTabNavigator} />
      <UserStack.Screen name="WasteScanner" component={WasteScannerScreen} />
      <UserStack.Screen name="PickupBooking" component={PickupBookingScreen} />
      <UserStack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <UserStack.Screen name="PickupComplete" component={PickupCompleteScreen} />
      <UserStack.Screen name="ScrapPrices" component={ScrapPricesScreen} />
    </UserStack.Navigator>
  );
}

function CollectorTabNavigator() {
  return (
    <CollectorTabs.Navigator tabBar={collectorTabBar} screenOptions={{ headerShown: false }}>
      <CollectorTabs.Screen name="Jobs" component={CollectorDashboardScreen} />
      <CollectorTabs.Screen name="Map" component={CollectorMapScreen} />
      <CollectorTabs.Screen name="History" component={CollectorHistoryScreen} />
      <CollectorTabs.Screen name="Earnings" component={CollectorEarningsScreen} />
      <CollectorTabs.Screen name="Profile" component={CollectorProfileScreen} />
    </CollectorTabs.Navigator>
  );
}

function CollectorFlow() {
  return (
    <CollectorStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <CollectorStack.Screen name="CollectorTabs" component={CollectorTabNavigator} />
      <CollectorStack.Screen name="CollectorActivePickup" component={CollectorActivePickupScreen} />
      <CollectorStack.Screen name="CollectorConfirmCollection" component={CollectorConfirmCollectionScreen} />
    </CollectorStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
        },
      }}
    >
      <RootStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <RootStack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <RootStack.Screen name="UserOnboarding" component={UserOnboardingScreen} />
        <RootStack.Screen name="UserLogin" component={UserLoginScreen} />
        <RootStack.Screen name="UserApp" component={UserFlow} />

        <RootStack.Screen name="CollectorLogin" component={CollectorLoginScreen} />
        <RootStack.Screen name="CollectorApp" component={CollectorFlow} />

        <RootStack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
