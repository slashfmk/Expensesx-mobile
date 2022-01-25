// All first letters to uppercase

import 'intl';
import 'intl/locale-data/jsonp/en';

const AllFirstLetterToUpperCase = (word: string) => {
    let finalWord: string = "";
    const breakDown: string[] = word.split(" ");
    breakDown.forEach((item) => {
        finalWord += item.substr(0, 1).toUpperCase();
        finalWord += item.substr(1, item.length - 1);
        finalWord += " ";
    })
    return finalWord;
}

// only the first letter in uppercase and the rest in lowercase
const FirstLetterToUpperCase = (word: string) => {
    let wordConverted: string = word.toLowerCase();
    let finalConversion: string = "";

    finalConversion += wordConverted.substr(0, 1).toUpperCase();
    finalConversion += wordConverted.substr(1, wordConverted.length - 1);

    return finalConversion;
}

const currencyFormatted = (amount: number, locale: string = 'de-DE', currencyCode: string) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(amount)
}

export default {AllFirstLetterToUpperCase, FirstLetterToUpperCase, currencyFormatted}