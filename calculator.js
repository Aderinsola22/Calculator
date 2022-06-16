//refactor every function when fully done with logic of calculator

function display(id) {

const buttonElement = document.querySelector(`#${id}`);
const displayElement = document.querySelector("#cal-display");

let displayLength= displayElement.textContent.length;
   if(displayLength===1 && displayElement.textContent[0]=== "0"){
    displayElement.textContent=buttonElement.textContent;
   }
   else{
    displayElement.textContent+=buttonElement.textContent;    
   }
    
}
//refactor polarity function to account for floating point numbers
function polarity(){
 const displayElement = document.querySelector("#cal-display");

 let displayNum= parseFloat(displayElement.textContent,10);

 if(displayNum <= 0){
     displayElement.textContent = Math.abs(displayNum).toString(10);
 }
 else{
     displayElement.textContent = `-${displayNum}`;
     displayNum*=-1.0;
 }
}

function del(){
 const displayElement=document.querySelector("#cal-display");

 let delText= displayElement.textContent.slice(0,-1);
 if(delText.length ===1 && displayElement.textContent[0]=== "-")
 {
   clrEntry();
 }
 else if(delText.length >=1)
 {
  displayElement.textContent= delText;
 }
 else
 {
  clrEntry();
 }
}
//refactor later for neccessary overwrites in display and equation element
function equationbuffer(id){
const buttonElement = document.querySelector(`#${id}`);
const displayElement = document.querySelector("#cal-display");
const equationElement= document.querySelector("#equation-display");


equationElement.textContent= displayElement.textContent;
equationElement.textContent+= buttonElement.textContent; 
displayElement.textContent="0";

}
//refactor for calculation chaining and result displaying
function instaCompute(id){
const buttonElement = document.querySelector(`#${id}`);
const displayElement= document.querySelector("#cal-display");
const equationElement= document.querySelector("#equation-display");
equationElement.textContent=""
equationElement.textContent+=`${buttonElement.textContent}(${displayElement.textContent})=`;
let equate="";
equate= equationElement.textContent;
let regexs=["^2","2rx","1/x"];
let op="";
let numerand="";
regexs.forEach(regex=>{
  if(equate.includes(regex)){
     op= regex; 
     numerand=equate.split(regex);
  }
})
let stripNum= numerand[1].replace(/[^\d.-]/g,'');
let displayNum= parseFloat(stripNum,10);

if(op==="^2"){
  square(displayNum);
 }
 if(op==="2rx"){
  root(displayNum);
}
if(op==="1/x"){
  inverse(displayNum);
}

}

function clr(){
 const displayElement= document.querySelector("#cal-display");
 const equationElement= document.querySelector("#equation-display");
 displayElement.textContent= "0";
 equationElement.textContent="";
}

function clrEntry(){
  const displayElement= document.querySelector("#cal-display");
  displayElement.textContent= "0"; 
}



function result(){
const displayElement= document.querySelector("#cal-display");
const equationElement= document.querySelector("#equation-display");
const buttonElement= document.querySelector("#button29");
console.log(displayElement.textContent);
console.log(equationElement.textContent);
let equate ="";
equate += equationElement.textContent;
equate += displayElement.textContent;
console.log(equate);
let regexs=["+","-","/","*"];
let op="";
let numerand="";
regexs.forEach(regex=>{
  if(equate.includes(regex)){
     op= regex; 
     numerand=equate.split(regex);
  }
})
console.log(op);
console.log(numerand);
 if(op==="+"){
  add(op,numerand)
 }
 if(op==="-"){
  sub(op,numerand)
}
if(op==="/"){
  divide(op,numerand)
}
if(op==="*"){
  mul(op,numerand)
}
}
//refactor later for advanced displaying of calculations
function add(op,numerand){
const displayElement= document.querySelector("#cal-display");
const equationElement= document.querySelector("#equation-display");
 const floatrand= numerand.map(Number);
 console.log(floatrand);
 const sum= floatrand.reduce((total, current) => {
  return total + current;
}, 0);
 displayElement.textContent= sum.toString(10);  
}

function sub(op,numerand){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
   const floatrand= numerand.map(Number);
   console.log(floatrand);
   const sub= floatrand.reduce((total, current) => {
    return total - current;
  });
   displayElement.textContent= sub.toString(10); 
}

function mul(op,numerand){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
   const floatrand= numerand.map(Number);
   console.log(floatrand);
   const product= floatrand.reduce((total, current) => {
    return total * current;
  }, 1);
   displayElement.textContent= product.toString(10); 
}

function divide(op,numerand){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
   const floatrand= numerand.map(Number);
   console.log(floatrand);
   const div= floatrand.reduce((total, current) => {
    return total / current;
  });
   displayElement.textContent= div.toString(10); 

}

function root(displayNum){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  displayElement.textContent=Math.sqrt(displayNum).toString(10);
}

function square(displayNum){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  displayElement.textContent=Math.pow(displayNum,2).toString(10);

}

function inverse(displayNum){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  displayElement.textContent=(1/displayNum).toString(10);
}

function percent(displayNum){

}

function elementSelectors(id){

}




