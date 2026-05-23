import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthLandingScreen from '../screens/auth/AuthLandingScreen';
import AuthOnboardingScreen from '../screens/auth/AuthOnboardingScreen';
import AuthLoginScreen from '../screens/auth/AuthLoginScreen';
import {
  PickupBookingScreen,
  PickupCompleteScreen,
  PickupHistoryScreen,
  RewardsScreen,
  ScrapPricesScreen,
  LiveTrackingScreen,
  UserHomeScreen,
  UserProfileScreen,
  WasteScannerScreen,
  userTabBar,
} from '../screens/UserScreens';
import { colors } from '../theme/tokens';

const RootStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const UserTabs = createBottomTabNavigator();

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
        <RootStack.Screen name="AuthLanding" component={AuthLandingScreen} />
        <RootStack.Screen name="AuthOnboarding" component={AuthOnboardingScreen} />
        <RootStack.Screen name="UserLogin" component={AuthLoginScreen} />
        <RootStack.Screen name="UserApp" component={UserFlow} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
