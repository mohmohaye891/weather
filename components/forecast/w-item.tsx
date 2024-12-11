import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Weather } from './w-list'
import Ionicons from '@expo/vector-icons/Ionicons';

type WItemProps = {
    weatherCondition: string;
    day: string;
    temp: number;
    wImage: ImageSourcePropType;
  };

const WItem = ({ weatherCondition, day, temp, wImage }: WItemProps) => {  
   //const { day, temp, weather } = w;
  return (
    <View className='flex-row items-center flex-1 pb-4 mb-4 border-b border-b-secondaryDark/30'>
        <Text className='flex-1 text-xl text-purpleDark font-bold'>{day}</Text>
        <View className='flex-1 flex-row gap-2 items-center justify-items-start'>
            <Image source={wImage} className="w-10 h-10"/>
            <Text className='text-left text-lg font-semibold text-pupleDark'>{weatherCondition}</Text>
        </View>
        <Text className='flex-1 text-right text-2xl font-bold text-pupleDark'>{temp.toFixed()}°</Text>
    </View>
  )
}

export default WItem
