import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from "react-native-heroicons/outline"
import RestaurantCard from './RestaurantCard';
import sanityClient from "../sanity"
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';

const FeatureRow = ({ id, title, description }) => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id]  {
      ...,
      restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
      },
    }[0]
    `,{ id }).then((data) => {
        setRestaurants(data?.restaurants);
    });
  }, [id]);
  

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView 
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                    key={restaurant._id}
                    id={restaurant._id}
                    imgUrl={urlFor(restaurant.image).width(800).url()}
                    title={restaurant.string}
                    rating={restaurant.rating}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                />
                ))}
       
      </ScrollView>
    </View>
  )
}

export default FeatureRow