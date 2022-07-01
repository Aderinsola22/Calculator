
//refactor every function when fully done with logic of calculator
let decimalcount=0;
let equate ="";
let numerand="";
let re=/\d+(\+|\-|\*|\/)\d+/
function display(id) {

const buttonElement = document.querySelector(`#${id}`);
const displayElement = document.querySelector("#cal-display");
let displayLength= displayElement.textContent.length;
if(buttonElement.textContent==="."){
  decimalcount++;
}

if(displayLength===1 && displayElement.textContent[0]=== "0" && buttonElement.textContent[0] !="."){
    displayElement.textContent=buttonElement.textContent;
   }
else if(buttonElement.textContent==="." && decimalcount>1){
  displayElement.textContent +="";
  displayElement.textContent.trim();
  decimalcount--;
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
 if(displayElement.textContent[displayElement.textContent.length-1]===".")
 {
   decimalcount--;
   displayElement.textContent= delText;
 }
 else if(delText.length ===1 && displayElement.textContent[0]=== "-")
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
decimalcount=0;  
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
 decimalcount=0;
}

function clrEntry(){
  const displayElement= document.querySelector("#cal-display");
  displayElement.textContent= "0"; 
}

function test(s) {
  console.log("%s is valid? %s", s, re.test(s));
}

function result(){
decimalcount=0;  
const displayElement= document.querySelector("#cal-display");
const equationElement= document.querySelector("#equation-display");

if(re.test(equationElement.textContent)){
  equate = equationElement.textContent;
}
else{
  equate = equationElement.textContent;
  equate += displayElement.textContent; 
}

console.log(equate)

 if(equate.includes("+")){
  numerand=equate.split("+");
console.log(numerand)
  add(numerand)
 }
 else if(equate.includes("/")){
  numerand=equate.split("/");
  divide(numerand)
}
else if(equate.includes("*")){
  numerand=equate.split("*");
  mul(numerand);
}
else if(equate.includes("-")){
   checkSub(numerand,equate)
}
}

function checkSub(numerand,equate){
  const signIndex=[];
  for(let i =0;i<equate.length;i++){
    if(equate[i]==="-"){
      signIndex.push(i);
    }
  }
  if(signIndex.length===1){
   numerand=equate.split("-");
  sub(numerand);
  }
 else{
    doubleNega(numerand,signIndex,equate);
  }
}

function doubleNega(numerand,signIndex,equate){
  const distance= signIndex.reduceRight((total, current) => {
    return total - current;
  });
  let dist= signIndex[signIndex.length-1]-signIndex[signIndex.length-2]


  if(signIndex.length===2 && distance===1){
    equate=equate.replace("-","");
    equate=equate.replace("-","+");
    equate=equate.replace(/\s+/g,'');
    numerand=equate.split("+");
    add(numerand);
  }
  else if(signIndex.length==2 && distance!=1){
  numerand=equate.split("-");
  sub(numerand);
  }
  else if(signIndex.length===3 && dist ===1){
    equate=equate.replace("-","$");
    equate=equate.replace("-","");
    equate=equate.replace("-","+");
    equate=equate.replace("$","-");
    equate=equate.replace(/\s+/g,'');
    numerand=equate.split("+");
    add(numerand);

  }
}
//refactor later for advanced displaying of calculations
function add(numerand){
  decimalcount=0;   
const displayElement= document.querySelector("#cal-display");
const equationElement= document.querySelector("#equation-display");
 const floatrand= numerand.map(Number);
 const sum= floatrand.reduce((total, current) => {
  return total + current;
}, 0);
 displayElement.textContent= sum.toString(10);  
}

function sub(numerand){
  decimalcount=0; 
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
   const floatrand= numerand.map(Number);
   const sub= floatrand.reduce((total, current) => {
    return total - current;
  });
   displayElement.textContent= sub.toString(10); 
}

function mul(numerand){
  decimalcount=0; 
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
   const floatrand= numerand.map(Number);
   const product= floatrand.reduce((total, current) => {
    return total * current;
  }, 1);
   displayElement.textContent= product.toString(10); 
}

function divide(numerand){
  decimalcount=0; 
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
   const floatrand= numerand.map(Number);
   const div= floatrand.reduce((total, current) => {
    return total / current;
  });
   displayElement.textContent= div.toString(10); 

}

function root(displayNum){
  decimalcount=0; 
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  displayElement.textContent=Math.sqrt(displayNum).toString(10);
}

function square(displayNum){
  decimalcount=0; 
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  displayElement.textContent=Math.pow(displayNum,2).toString(10);

}

function inverse(displayNum){
  decimalcount=0; 
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  displayElement.textContent=(1/displayNum).toString(10);
}

function percent(id){
  const displayElement= document.querySelector("#cal-display");
  const equationElement= document.querySelector("#equation-display");
  const buttonElement = document.querySelector(`#${id}`);
  let perString ="";
  perString += equationElement.textContent;
  perString += displayElement.textContent;
let numerand="";
  numerand=perString.split(/[+-/*]/);
  console.log(numerand);
  perNum=(parseFloat(numerand[0])*parseFloat(numerand[1])/100).toString()
  displayElement.textContent=perNum;
  equationElement.textContent+=perNum;
}

function elementSelectors(id){

}
