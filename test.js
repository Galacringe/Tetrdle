// Input Variables
let aim = 0;
let slot = [document.getElementById('i1'),document.getElementById('i2'),document.getElementById('i3'),document.getElementById('i4'),document.getElementById('i5')];
stack = []
let tempvisualstack = [];
let temp_answer;
let temp_answer_trial;
let isgameover = false;
const regex = /^[a-z|A-Z]+$/


// File Variables
var alphabet = 'abcdefghijklmnopqrstuwxyz'
var files, word, wordddd, answer, answer_address;
String(word);
fetch("words.txt")
.then(response => response.text())
.then(TEXT =>{ word = TEXT.toString().split("\n"); select_new_answer(word);} );
let colorstack = [];
select_new_answer(word);

// Score Variables
let score = 0;
let score_html = document.getElementById('score');

function select_new_answer(words) {
    if(words != null && words != undefined) {
    console.log("ok");
    let answer_address = Math.floor(Math.random() * 14854);
    answer = words[answer_address]; 
    }
    else console.log(typeof(words))
};

function alphabet_at(letter){
    for(asdf = 0; asdf < alphabet.length; asdf++){
        if(alphabet[asdf] == letter){
            return asdf;
        }
    }
    console.log("alphabet null");
    return null;
}

// Input Manager
window.onkeydown = (e) => {
    console.log(e.key);
    if(isgameover === false){
    switch(e.key){
        case "Backspace":
            if(aim != 0) {
                console.log("bac");
                aim -= 1;
                slot[aim].innerHTML = " ";
                break;
            }

        default:
            if(regex.test(e.key) && aim <= 4 && e.key.length == 1){
                slot[aim].innerHTML = e.key.toLowerCase();
                aim += 1;
                if(aim == 5) {
                recent_answer_trial = slot[0].innerHTML + slot[1].innerHTML + slot[2].innerHTML + slot[3].innerHTML + slot[4].innerHTML;

                if(word.includes(recent_answer_trial) && !(stack.includes(recent_answer_trial))) {

                    stack.push(recent_answer_trial); 
                    stack_sliced = stack.join().replace(/,/g,'').split(""); 
                    console.log(stack_sliced);
                    word_color = ['','','','','']

                    
                    for(i = 0; i < stack.length; i++) {
                        var answer_alphacnt = Array.from({length: 25}, () => 0);
                        answer_sliced = [...answer]
                        for(j = 0; j < answer_sliced.length; j++) {
                            for(k=0; k < 25; k++){
                                if(alphabet[k] == answer_sliced[j]) {
                                    answer_alphacnt[k] += 1;
                                }
                            }
                        }
                        console.log(answer_alphacnt);
                   }

                   for(i = 0; i < answer_sliced.length; i++){
                    if(recent_answer_trial[i] == answer_sliced[i]){
                        console.log(recent_answer_trial[i] + '==' + answer_sliced[i]);
                        word_color[i] = 'GREEN';
                        if(answer_alphacnt[alphabet_at(recent_answer_trial[i])] > 0){
                            answer_alphacnt[alphabet_at(recent_answer_trial[i])] -= 1;
                            console.log(recent_answer_trial[i]+" - alpha / Val - "+ answer_alphacnt);
                        }
                        
                    }
                   }
                   console.log('WORD COLOR - ' + word_color);
                   console.log(answer_alphacnt);

                   for(i = 0; i < word_color.length; i++){
                    if(word_color[i] != 'GREEN'){
                        console.log(recent_answer_trial[i] +" is still unknown!");
                        console.log("searching letter " + recent_answer_trial[i] + "...");

                        if(answer_alphacnt[alphabet_at(recent_answer_trial[i])] > 0){
                            answer_alphacnt[alphabet_at(recent_answer_trial[i])] -= 1;
                            word_color[i] = 'YELLOW';
                        }
                    }
                   }
                   for(i = 0; i < word_color.length; i++){
                    if(word_color[i] == ''){
                        word_color[i] = 'GREY';
                    }
                   }
                   console.log("Result => " + word_color);
                   colorstack.push(...word_color);


                   // visual html code goes here
                   for(block = 1; block < colorstack.length + 1; block++) {
                    currentblock = document.getElementById(block);
                    console.log(currentblock);
                    console.log(stack_sliced[block-1]);
                    console.log(colorstack[block-1]);
                    currentblock.innerHTML = stack_sliced[block-1];
                    
                    switch(colorstack[block-1]) {
                        case 'GREEN':
                            currentblock.parentElement.style.backgroundColor = '#6aaa64';
                            break;
                        case 'YELLOW':
                            currentblock.parentElement.style.backgroundColor = '#c9b458';
                            break;
                        case 'GREY':
                            currentblock.parentElement.style.backgroundColor = '#787c7e';
                            break;

                        default:
                            alert("invaild color detected, color => " + colorstack[block-1]);
                        }
                    
                   }



                    if(answer === recent_answer_trial) {
                        console.log("answer");
                        console.log(stack.length);
                        score += 100 * (10 - stack.length);
                        score_html.innerHTML = score;
                        select_new_answer(word);
                        stack = [];
                        tempvisualstack = [];
                        colorstack = [];
                        // 판 초기화 요망
                        for(grid = 1; grid < 36; grid++){
                            currentblock = document.getElementById(grid);
                            currentblock.innerHTML = "";
                            currentblock.parentNode.style.backgroundColor = 'white';
                        }
                    }
                    else if(stack.length == 7){
                        isgameover = true;
                        alert("Game Over! Your final score - " + score);
                    }

                } else { console.log("invaild word"); }

                slot[0].innerHTML = "";
                slot[1].innerHTML = "";
                slot[2].innerHTML = "";
                slot[3].innerHTML = "";
                slot[4].innerHTML = "";
                aim = 0;
                }
            }
            else { console.log(e.key + "is not correct form of input, check out for word's length or it is vaild alphabet."); break;}
        }
    }
}
