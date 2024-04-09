import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AuthNavigation from './app/navigation/AuthNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/authStorage';
import Screen from './app/components/Screen';
import FileUpload from './app/api/image';
import { Session } from '@supabase/supabase-js'
import { jwtDecode } from 'jwt-decode';

export default function App() {

  const [user, setUser] = useState()
  const restoreToken = () => {
    const token = authStorage.getToken()
    if (!token) return;
    console.log(token)
    setUser(token)

  }
  useEffect(() => {
    restoreToken()
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {(user) ? <AppNavigator /> : <AuthNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>

    // <Screen>
    //   <FileUpload />
    // </Screen>
  );
}


