import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { CarDTO } from '../../dtos/CarDTO'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'


import {
   Container,
   Header,
   CarImages,
   Content,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   Accessories,
   Footer,
   RentalPeriod,
   CalendarIcon,
   DateInfo,
   DateTitle,
   DateValue,
   RentalPrice,
   RentalPriceLabel,
   RentalPriceDetails,
   RentalPriceQuote,
   RentalPriceTotal,
} from './styles'
import { api } from '../../services/api'
import { Alert } from 'react-native'


interface Params {
   car: CarDTO
   dates: string[];
}

interface RentalPeriod {
   start: string;
   end: string;
}

export function SchedulingDetails() {
   const [loading, setLoading] = useState(false)
   const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
   
   const theme = useTheme()

   const navigation = useNavigation()
   const route = useRoute()
   const { car, dates } = route.params as Params

   const rentTotal = Number(dates.length  * car.rent.price)

   async function handleConfirm() {
      setLoading(true)

      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [
         ...schedulesByCar.data.unavailable_dates,
         ...dates,
      ]

      await api.post('schedules_byuser', {
         user_id: 6,
         car,
         startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
         endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
      })

      api.put(`/schedules_bycars/${car.id}`, {
         id: car.id,
         unavailable_dates
      }).then(() => {
         navigation.navigate('SchedulingComplete')
      }).catch(() => {
         Alert.alert('N??o foi poss??vel fazer o agendamento')
         setLoading(false)
      })



      navigation.navigate('SchedulingComplete')
   }

   function handleNavigateBackToScheduling() {
      navigation.goBack()
   } 

   useEffect(() => {
      setRentalPeriod({
         start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
         end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
      })
   }, [])


   return (
      <Container>
         <Header>
            <BackButton
               onPress={handleNavigateBackToScheduling}
            />
         </Header>

         <CarImages>
            <ImageSlider
               imagesUrl={car.photos}
            />
         </CarImages>

         <Content>
            <Details>
               <Description>
                  <Brand>{car.brand}</Brand>
                  <Name>{car.name}</Name>
               </Description>

               <Rent>
                  <Period>{car.rent.period}</Period>
                  <Price>R$ {car.rent.price}</Price>
               </Rent>
            </Details>
            
            <Accessories>
               {
                  car.accessories.map(accessory => (
                     <Accessory
                        key={accessory.type}
                        name={accessory.name}
                        icon={getAccessoryIcon(accessory.type)}
                     />
                  ))
               }
            </Accessories>
               
            <RentalPeriod>
                  <CalendarIcon>
                     <Feather
                        name="calendar"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                     />
                  </CalendarIcon>
                  <DateInfo>
                     <DateTitle>DE</DateTitle>
                     <DateValue>{rentalPeriod.start}</DateValue>
                  </DateInfo>

                  <Feather
                     name="chevron-right"
                     size={RFValue(10)}
                     color={theme.colors.text}
                  />

                  <DateInfo>
                     <DateTitle>AT??</DateTitle>
                     <DateValue>{rentalPeriod.end}</DateValue>
                  </DateInfo>
               </RentalPeriod>
           
            <RentalPrice>
               <RentalPriceLabel>TOTAL</RentalPriceLabel>
               <RentalPriceDetails>
                  <RentalPriceQuote>{`R$ ${car.rent.price} x${dates.length} di??rias`}</RentalPriceQuote>
                  <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
               </RentalPriceDetails>
            </RentalPrice>
         </Content>

         <Footer>
            <Button
               title="Alugar agora"
               onPress={handleConfirm}
               color={theme.colors.success}
               enabled={!loading}
               loading={loading}
            />
         </Footer>
      </Container>
   )
}
