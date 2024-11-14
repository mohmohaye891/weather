import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/header';
import InputBox from '../components/home/input-box';
import Content from '../components/home/content';
import Info from '../components/home/info';

export default function Index() {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? 24 : 0}}
      className='bg-white'
    >
      <ImageBackground 
        source={require("../assets/bg.jpg")} 
        className='w-full h-full'
        blurRadius={6}>
        <View className='px-8'>
          <Header />
          <InputBox />
          <Content />
          <Info />
          <Text className='text-center text-secondaryDark text-sm my-4'>Demo Weather App - CODE HUB</Text>
        </View>
        <StatusBar style='dark' />
      </ImageBackground>
      
    </SafeAreaView>
  )
}
