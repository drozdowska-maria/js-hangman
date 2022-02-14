
//my iniciators
function runDoubleLoop(a, student){
    for (i=0; i < myWordLength; i++){ //weak spot!!!!!
        for (j=0; j < student.length; j++){
            j;
            a(i, j)
        }
    }
}

function runSingleLoop(a, b){
    for (i = 0; i < b.length; i++){
        a(i);
    }
}

//document variables 

const myKeyboard = document.getElementsByClassName("key");
let myKeyWord = document.getElementById("keyword");
const letterStyle = `border: 1px solid #a8d1a8;border-radius:5px;padding:5px;background-color:#d4f1d4;margin-left:5px;`;

const myMistakeCounter = document.getElementById("count-1");
const myBanner = document.getElementById("banner");
const myBannerHeader = document.getElementById("banner-h1");
const myButton = document.getElementById("mybutton");

//document variables
let myWords = ['queen', 'ledzeppelin', 'lorde', 'thebeatles', 'pinkfloyd']; 
const myWordsLength = myWords.length;
    
function myLength(i){
        return i.length;
    }
   
    let myWordLength = Math.max(...myWords.map(myLength));
    console.log(myWords.map(myLength), myWordLength);

let result = false;

function runGame(){
    
    myKeyWord.innerHTML = myWords[Math.floor(Math.random()*myWords.length)];
    let arr = myKeyWord.textContent.split('');
    

    //styling letters
    function styleLetters(i) {
        arr[i] = `<span style="${letterStyle}">${arr[i]}</span>`;
        myKeyWord.innerHTML = arr.join('');
    }

    //adding click events - good/bad key 
    function getmyKeyWord(b, a){
        let x = `<span style="${letterStyle}">${myKeyboard[a].textContent}</span>`;
        const regex = new RegExp(x, "g");
        
        myKeyboard[a].addEventListener("click", function(){
        if (arr[b] === x){    
            
            myKeyboard[a].style.opacity = "0.5";
            arr[b] = arr[b].replace(regex, `<span style="${letterStyle} color:black;">${myKeyboard[a].textContent}</span>`);
            myKeyWord.innerHTML = arr.join('');
        

            result = arr.every(a => a.length > x.length)//weak spot - how to grab arr[b].length before init?
            console.log(result);
            if(result === true) {
                myMistakeCounter.style.backgroundColor = "var(--item-background-color)";
               
                myMistakeCounter.textContent = "Go!";
                myMistakeCounter.style.cursor = "pointer";
            }
            myKeyboard[a].disabled = true;
            return result;
           
        } 
        
        else if (myKeyboard[a].textContent !== myKeyWord.textContent.charAt(myKeyWord.textContent.indexOf(myKeyboard[a].textContent))){ 
            
            myKeyboard[a].style.backgroundColor = "var(--item-reddish)";
            myKeyboard[a].disabled = true;
            
        }
        
    });
      
    }

    //setting up counter
    function countMyMistakes(a) {
        
        myKeyboard[a].addEventListener("click", function(){
            
            if (myKeyboard[a].textContent !== myKeyWord.textContent.charAt(myKeyWord.textContent.indexOf(myKeyboard[a].textContent))){
                let num = parseInt(myMistakeCounter.textContent, 10);
                myMistakeCounter.textContent = Math.max(0, num - 1);  
                
            }
        });
        
        myKeyboard[a].addEventListener("click", function(){
            if (myMistakeCounter.textContent === "0") {
                myMistakeCounter.textContent = "Go!";
                myMistakeCounter.style.cursor = "pointer";
            }
            
        });
    }
    
    runSingleLoop(styleLetters, arr);
    runDoubleLoop(getmyKeyWord, myKeyboard);
    runSingleLoop(countMyMistakes, myKeyboard);
    
    let i = 0;
    
    myMistakeCounter.addEventListener("click", function() {
        //end game condition
        if (myWords.length === 1){
            if(result ===true){
                i++;
            }

            myBanner.style.marginTop = "0";
            myBanner.style.backgroundColor = "var(--item-background-color)";
            myBannerHeader.innerHTML = `<h1>Congrats! You reached the finish line.<br>Your score:<br><bold>${i}/${myWordsLength}</bold></h1>`;
            myMistakeCounter.disabled = true;

            myButton.addEventListener("click", function(){
                window.location.reload(true);
            });
        }

        else if (result === true){
            runResult();
            result = false;
            i++;
            
            myMistakeCounter.style.backgroundColor = "var(--item-reddish)";
            console.log(result);
            console.log(myWords.length)
            return i;
        }

        else if (myMistakeCounter.textContent === "Go!"){    
            runResult();
        }
    })


    function runResult(){
        
        myWords.indexOf(myKeyWord.textContent);
        myWords.splice(myWords.indexOf(myKeyWord.textContent), 1);
        
        myKeyWord.innerHTML = myWords[Math.floor(Math.random()*myWords.length)];
        arr = myKeyWord.innerHTML.split('');
        
        runSingleLoop(clearLevel, myKeyboard);
        runSingleLoop(styleLetters, arr);
        return arr;
            
    };  
} 

function clearLevel(a){

    myKeyboard[a].style.opacity = "1";   
    myKeyboard[a].style.backgroundColor = "var(--item-background-color)";
    myMistakeCounter.textContent = "10";
    myKeyboard[a].disabled = false;

}

runGame();