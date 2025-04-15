import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    weight='';
    height='';
    bmiValue='';
    result='';

   handleFormChange(event){
        const {name,value}=event.target;
        if(name==='height'){
            this.height=value
        }
        if(name==='weight'){
            this.weight=value
        }
   }
   handleSubmit(event){
       event.preventDefault()
       console.log('Height',this.height)
       console.log('Weight',this.weight)
       this.calculate()
   }
   calculate(){

    let height=this.height/100
    let bmi=this.weight/(height*height)
    console.log('BMI',bmi)
    this.bmiValue=bmi.toFixed(2);
    if(this.bmiValue<18.5){
        this.result='UnderWeight';
    }else if(this.bmiValue> 18.5 && this.bmiValue<25){
        this.result='Healthy';
    }else if(this.bmiValue> 25 && this.bmiValue <29.9){
        this.result='OverWeight';
    }else{
        this.result='Obese';
    }
   }
   reCalculate(){
     this.height='';
     this.weight='';
     this.bmiValue='';
     this.result='';
   }
}