import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, ImageBackground, Platform, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const QRCode = () => {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? 24 : 0}}
      className='bg-white'
    >
      <ImageBackground
        source={require("../assets/bg.jpg")} 
        className='w-full h-full'
        blurRadius={6}>
        <View className="px-8 flex-1 items-center justify-center ">   
            <View>
                <Image 
                    source={require("../assets/scan-me.png")}
                    className='w-60 h-60'
                />
            </View>
          <Text className='text-center text-secondaryDark text-sm '>Demo Weather App - CODE HUB</Text>
        </View>
        <StatusBar style='dark' />
      </ImageBackground>      
    </SafeAreaView>
  )
}

export default QRCode
