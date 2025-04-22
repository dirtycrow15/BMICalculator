public with sharing class weatherApiCall {
    @AuraEnabled(cacheable=true)
    public static String getWeatherData(String cityName) {

        String APIkey='b1f7cf2e3ff5d976a63a7c4cad8c8d2d';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid='+APIkey);
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');
        
        HttpResponse response = http.send(request);
        return response.getBody();
        
    }
}
