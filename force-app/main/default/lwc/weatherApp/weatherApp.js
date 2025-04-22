import { LightningElement } from 'lwc';
import WEATHER_ICON from "@salesforce/resourceUrl/weatherAppIcons";
import getWeatherData from '@salesforce/apex/weatherApiCall.getWeatherData';

export default class WeatherApp extends LightningElement {
    clearIcon=WEATHER_ICON+'/weatherAppIcons/clear.svg'
    cloudIcon=WEATHER_ICON+'/weatherAppIcons/cloud.svg'
    arrowbackIcon=WEATHER_ICON+'/weatherAppIcons/arrow-back.svg'
    dropletIcon=WEATHER_ICON+'/weatherAppIcons/droplet.svg'
    hazeIcon=WEATHER_ICON+'/weatherAppIcons/haze.svg'
    mapIcon=WEATHER_ICON+'/weatherAppIcons/map.svg'
    rainIcon=WEATHER_ICON+'/weatherAppIcons/rain.svg'
    snowIcon=WEATHER_ICON+'/weatherAppIcons/snow.svg'
    stormIcon=WEATHER_ICON+'/weatherAppIcons/storm.svg'
    thermometerIcon=WEATHER_ICON+'/weatherAppIcons/thermometer.svg'


    city='';
    loadingText='';
    result='';
    errorMessage='';
    weatherIcon='';
    handleCityChange(event) {
        this.city = event.target.value;
        console.log('City changed to:', this.city);
    }
    handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submitted with city:', this.city);
        // Here you can add logic to fetch weather data based on the city
        this.loadingText='Fetching Weather Data...';    
        // Call the function to fetch weather data
        this.fetchWeatherData();
    }
    fetchWeatherData() {
        const APIkey='b1f7cf2e3ff5d976a63a7c4cad8c8d2d';
        const API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${APIkey}`
       /* fetch(API_URL).then(res=>res.json()).then(result=>{
            this.result=result;
            console.log(JSON.stringify(this.result),result.cod);
            if(result.cod === "404"){
                this.errorMessage=`${this.city} is not a valid city`;
                this.loadingText=''; // Clear loading text
                console.log('inside 404');
            }    
            else{
                console.log('inside else');
                this.weatherDetails(this.result);
            }
            
        }).catch(()=>{
            console.log('Inside catch');
            console.error('Error:', error);
            this.loadingText='Error in fetching weather data';
        });*/
        getWeatherData({city:this.city})
        .then(result => {
            this.result=result;
            console.log(JSON.stringify(this.result),result.cod);
            if(result.cod === "404"){
                this.errorMessage=`${this.city} is not a valid city`;
                this.loadingText=''; // Clear loading text
            }    
            else{
                this.weatherDetails(this.result);
            }
        }).catch(()=>{
            console.log('Inside catch');
            console.error('Error:', error);
            this.loadingText='Error in fetching weather data';
        });
    }
    weatherDetails(info){
        
            this.loadingText=''; // Clear loading text
            this.errorMessage='';      
            
            const{description,id}=info.weather[0];
            const city=info.name;
            const country=info.sys.country;
            const{temp,feels_like,humidity}=info.main;
            if(id===800){
                this.weatherIcon=this.clearIcon;
            }
            else if(id>800 && id<=804){
                this.weatherIcon=this.cloudIcon;    
            }
            else if(id>=500 && id<=531){
                this.weatherIcon=this.rainIcon;
            }
            else if(id>=600 && id<=622){
                this.weatherIcon=this.snowIcon;
            }
            else if(id>=701 && id<=781){
                this.weatherIcon=this.hazeIcon;
            }
            else if(id>=200 && id<=232){
                this.weatherIcon=this.stormIcon;
            }
            this.response={
                city:city,
                country:country,
                description:description,
                temp:temp,
                feels_like:feels_like,
                humidity:humidity,
                weatherIcon:this.weatherIcon
    
            }
        }
         handleBackClick(event){
            event.preventDefault(); 
            this.result='';
            this.city='';
            this.response='';
        }
}