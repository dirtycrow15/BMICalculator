import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
import imageUrl from "@salesforce/resourceUrl/currency"

export default class CurrencyConvertor extends LightningElement {

    countryList=countryCodeList; 
    fromCurrency = 'USD';
    toCurrency = 'INR';
    amount=0;
    imageUrl = imageUrl;
    result = '';
    errorMessage='';

    handleChange(event){
        const {name,value}=event.target;
        this[name] = value;
    }
    handleConvertCurrency(event){
        event.preventDefault();
        const {name,value}=event.target;
        this[name] = value;
        console.log('From Currency:', this.fromCurrency);
        console.log('To Currency:', this.toCurrency);
        console.log('Amount:', this.amount);
        this.convert();
    }
    async convert(){
        const API_KEY='1732b5aad5741f2daa0a6c95' ;
        const API_URL=`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.fromCurrency}/${this.toCurrency}`;

        try{
            const data=await fetch(API_URL);
            const json=await data.json();
            console.log('Response:', json);
            if(json.result === 'success'){
                const rate=json.conversion_rate;
                console.log('Conversion Rate:', rate);
                this.result = (Number(this.amount) * json.conversion_rate).toFixed(2)
                console.log(this.result)
            }
        }
        catch(error){
            this.errorMessage='Error in converting currency';
            console.error('Error:', error);
        }
    }

   
}