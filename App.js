import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AuthNavigation from './app/navigation/AuthNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/authStorage';

export default function App() {
  const [user, setUser] = useState()

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


