import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Main from '../menu/main'
import Options from '../menu/options'
import Game from '../game'
import Play from '../menu/play'

//import CustomTabBar from '../custom-tabbar/index'

import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const initialApp = () => {


    const createCreateMeetStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="CreateMeet" component={CreateMeet}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="MeetDetail" component={MeetDetail}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
    }



    function handleBackButton() {
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // returned function will be called on component unmount 
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [])
    //tabBar={props => <CustomTabBar {...props} />}
    const createMeetsStack = () => {
        return (
            <Stack.Navigator>
                
                <Stack.Screen name="Main" component={Main}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Play" component={Play}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Options" component={Options}
                    options={{
                        headerShown: false
                    }} />
            </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator >
            <Stack.Screen name="Menu" children={createMeetsStack} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Game" component={Game} options={{
                headerShown: false
            }} />
            {/**
             * <Tab.Screen name="CreateMeet" children={createCreateMeetStack} />
            <Tab.Screen name="Profile" component={Profile} />
             * 
             */}
        </Stack.Navigator>
    )
}

export default initialApp;