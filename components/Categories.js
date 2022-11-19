import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CategoryCard from '../components/CategoryCard';
import sanityClient from "../sanity";
import { urlFor } from '../sanity';

const Categories = () => {
    const navigation = useNavigation();
    const [ featuredCategories, setFeaturedCategories ] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "category"] {
          ...,
          restaurants[]->{
              ...,
              dishes[]->
          }
        }
        `).then((data) => {
            setCategories(data);
        });
      }, []);
    

  return (
    <ScrollView
     contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
     }}
     horizontal
     showsHorizontalScrollIndicator={false}
    >
        {categories?.map(category => (
                    <CategoryCard
                    key={category._id}
                    id={category._id}
                    imgUrl={urlFor(category.image).width(200).url()}
                    title={category.name}
                    description={category.short_description}
                />
                ))}
    </ScrollView>
  )
}

export default Categories