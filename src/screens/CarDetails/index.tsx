import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

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
   About,
   Accessories,
   Footer,
   
} from './styles'

export function CarDetails() {
   const navigation = useNavigation()


   function handleNavigateToScheduling() {
      navigation.navigate('Scheduling')
   }

   return (
      <Container>
         <Header>
            <BackButton
               onPress={() => {}}
            />
         </Header>

         <CarImages>
            <ImageSlider
               imagesUrl={['http://www.pngall.com/wp-content/uploads/2016/04/Porsche-Free-Download-PNG.png']}
            />
         </CarImages>

         <Content>
            <Details>
               <Description>
                  <Brand>Porsche</Brand>
                  <Name>Panamera</Name>
               </Description>

               <Rent>
                  <Period>Ao dia</Period>
                  <Price>R$ 580</Price>
               </Rent>
            </Details>
            
            <Accessories>
               <Accessory name="300km/h" icon={speedSvg}/>
               <Accessory name="3.2s" icon={accelerationSvg}/>
               <Accessory name="800 HP" icon={forceSvg}/>
               <Accessory name="Gasolina" icon={gasolineSvg}/>
               <Accessory name="Auto" icon={exchangeSvg}/>
               <Accessory name="2 pessoas" icon={peopleSvg}/>
            </Accessories>

            <About>
               Este é um automóvel desportivo. Surgiu do
               lendário touro de lide indulgido na praça Real.
               Maestranza de Sevilla. É um belíssimo carro,
               para quem gosta de acelerar.
            </About>
         </Content>

         <Footer>
            <Button
               title="Escolher período do aluguel"
               onPress={handleNavigateToScheduling}
            />
         </Footer>
      </Container>
   )
}
