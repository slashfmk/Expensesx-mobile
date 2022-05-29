// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import Main from "./app/screens/Main";
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./app/context/AuthContext";
import {IsLoggedInProvider} from "./app/context/IsLoggedInContext";
import useCachedResources from "./app/hooks/useCachedResources";


const queryClient = new QueryClient();

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <IsLoggedInProvider>
                    <AuthProvider>
                        <Main/>
                    </AuthProvider>
                </IsLoggedInProvider>
            </QueryClientProvider>
        );
    }
}
