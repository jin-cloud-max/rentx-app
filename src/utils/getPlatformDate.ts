import { addDays } from 'date-fns'
// import { Platform } from 'react-native'

export function getPlatformDate(date: Date) {
   return addDays(date, 1)
   
   // NOTE: Não funciona no meu aparelho
   // if (Platform.OS === 'ios' ) {
   // return addDays(date, 1)
   // } else {
      // return date
   // }
}
