import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car'

import {
   Container,
   Header,
   TotalCars,
   HeaderContent,
   CarList
} from './styles'

export function Home() {
   const navigation = useNavigation()

   const carData = {
      brand: 'Porsche',
      name: 'Panamera',
      rent: {
         period: 'ao dia',
         price: 120,
      },
      thumbnail: 'http://www.pngall.com/wp-content/uploads/2016/04/Porsche-Free-Download-PNG.png'
   }

   function handleNavigateToCarDetail() {
      navigation.navigate('CarDetails')
   }

   return (
      <Container>
         <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
         />
         <Header>
            <HeaderContent>
               <Logo
                  width={RFValue(108)}
                  height={RFValue(12)}
               />
               <TotalCars>
                  Total de 12 carros
               </TotalCars>
            </HeaderContent>
         </Header>

         <CarList
            data={[1, 2, 3, 4, 5, 6, 7]}
            keyExtractor={item => String(item)}
            renderItem={({ item }) =>
               <Car
                  data={carData}
                  onPress={handleNavigateToCarDetail}
               />
            }
         />

      </Container>
   )
}
