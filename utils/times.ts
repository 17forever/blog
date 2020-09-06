import { differenceInYears } from 'date-fns'

const myAge: number = differenceInYears(new Date(), new Date(1993, 2, 17))

export default {
    myAge
}