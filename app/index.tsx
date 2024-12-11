import { StatusBar } from 'expo-status-bar';
import { Alert, ImageBackground, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/header';
import InputBox from '../components/home/input-box';
import Content from '../components/home/content';
import Info from '../components/home/info';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { useWeatherStore } from '../store/weather-store';
import { getLocationByCity, getWeatherInfo } from '../utils/weather-api';

type Location = {
  latitude: number,
  longitude: number
}

export type Weather = {
  current_weather: {
    temperature: number,
    weathercode: 0, 
    windspeed: number;     
  },
  daily: {
    sunrise: string[

    ],
    sunset: string[],
    temperature_2m_max: number[],
    time: string[],
    weathercode: number[]
  },
  latitude: number,
  longitude: number
}

export default function Index() {   
  const setCurrentWeather = useWeatherStore(state => state.setCurrentWeather);
  const setDailyForecast = useWeatherStore(state => state.setDailyForecast);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location>({longitude : 96.1735, latitude: 16.8409});
  const [city, setCity] = useState<string>("Yangon");

  useEffect(() => {
    const getPermission = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== "granted") {
        console.log("Please grant location access.");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation);    
      setLocation({
        latitude: currentLocation.coords.latitude, 
        longitude: currentLocation.coords.longitude
      });
    }
    getPermission();  

  }, []);

  const getWeather = async() => {
    const weather = await getWeatherInfo(location.latitude, location.longitude);
    setCurrentWeather({ 
      temperature : weather.current_weather.temperature, 
      weatherCode : weather.current_weather.weathercode,
      windspeed: weather.current_weather.windspeed,
    });
    setDailyForecast({
      sunrise: weather.daily.sunrise,
      sunset: weather.daily.sunset,
      temperature_2m_max: weather.daily.temperature_2m_max,
      time: weather.daily.time,
      weathercode: weather.daily.weathercode,
    });
  }

  const getReverseGeoCode = async() => {
    const reverseGeoCodeResponse = await Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude
    });
    setCity(reverseGeoCodeResponse[0].city! || reverseGeoCodeResponse[0].country!)
    
  }

  const searchLocationByCity = async (city: string) => {
    try {
      const {latitude, longitude} = await getLocationByCity(city);
      setLocation({latitude, longitude})
    } catch (error) {
      Alert.alert(error as string, "Please enter a valid city name");
    }
  }

  useEffect(() => {
    setLoading(true);
    getWeather();
    getReverseGeoCode();
    setLoading(false);
  }, [location])

  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? 24 : 0}}
      className='bg-white'
    >
      <ImageBackground 
        source={require("../assets/bg.jpg")} 
        className='w-full h-full'
        blurRadius={6}>
        <View className='px-8'>
          {
            !loading && (
              <>
                <Header  cityName={city}/>
                <InputBox searchLocationByCity = {searchLocationByCity}/>
                <Content />
                <Info />
                <Text className='text-center text-secondaryDark text-sm my-4'>Demo Weather App - CODE HUB</Text>
              </>
            )
          }
        </View>
        <StatusBar style='dark' />
      </ImageBackground>
      
    </SafeAreaView>
  )
}
