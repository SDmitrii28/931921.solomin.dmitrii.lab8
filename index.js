
let divContainerElem = document.getElementById('containers');
const buttonAdd = document.getElementById('bntAdd');
const buttonSave = document.getElementById('bntSave');
const labelText = document.getElementById('labelText');
let buttonUp = null;
let buttonDown = null;
let buttonClose = null;

/*const lineTemplate = `<div id="container" class="container_elem">
<input id="editText_nomer" class="cvn">
<input id="editText_count" class="cvn">
<button id="btnUp" class="cvn">&#8593;</button>
<button id="btnDown" class="cvn">&#8595;</button>
<button id="bntClose" class="cvn bnt_border">x</button>
</div>`;*/

let lineTemplate=document.createElement('div');

let input1=document.createElement('input');
let input2=document.createElement('input');
let button1=document.createElement('button');
let button2=document.createElement('button');
let button3=document.createElement('button');

input1.setAttribute('id', 'editText_nomer');
input2.setAttribute('id', 'editText_count');
button1.setAttribute('id', 'btnUp');
button2.setAttribute('id', 'btnDown');
button3.setAttribute('id', 'btnClose');


lineTemplate.setAttribute.id='container';
lineTemplate.classList.add('container_elem');

input1.classList.add('cvn');
input2.classList.add('cvn');
button1.classList.add('cvn');
button2.classList.add('cvn');
button3.classList.add('cvn');
button3.classList.add('bnt_border');

button1.innerText='\u2191';
button2.innerText='\u2193';
button3.innerText='x';

lineTemplate.appendChild(input1);
lineTemplate.appendChild(input2);
lineTemplate.appendChild(button1);
lineTemplate.appendChild(button2);
lineTemplate.appendChild(button3);

const lines = [];
lines[0]=lineTemplate.cloneNode(true);

divContainerElem.appendChild(lines[0]);

const getButton = () => {
    buttonUp = document.querySelectorAll('#btnUp');
    buttonDown = document.querySelectorAll('#btnDown');
    buttonClose = document.querySelectorAll('#btnClose');
}

const listenButtons = () => {
    divContainerElem.addEventListener('click', (event) => {
        if(event.target.tagName=='BUTTON') {
            if(event.target.id=='btnUp'){
                let number = Array.prototype.indexOf.call(buttonUp, event.target);
                if(lines.length>1)
                {
                    if(number<lines.length-1){
                        let tempNode = divContainerElem.children[number].cloneNode(true);
                        divContainerElem.replaceChild(divContainerElem.children[number+1].cloneNode(true), divContainerElem.children[number]);
                        divContainerElem.replaceChild(tempNode, divContainerElem.children[number+1]);
                        let t = lines[number];
                        lines[number] = lines[number+1];
                        lines[number+1]=t;
                }
                else
                if(number>=lines.length-1){
                    let tempNode = divContainerElem.children[number].cloneNode(true);
                    divContainerElem.replaceChild(divContainerElem.children[0].cloneNode(true), divContainerElem.children[number]);
                    divContainerElem.replaceChild(tempNode, divContainerElem.children[0]);
                    let t = lines[number];
                    lines[number] = lines[0];
                    lines[0]=t;
                }
                getButton();
            }
        }
            else
                if(event.target.id=='btnDown'){
                    if(lines.length > 1){
                        let number = Array.prototype.indexOf.call(buttonDown, event.target);
                        if(number>0){
                            let tempNode = divContainerElem.children[number].cloneNode(true);
                            divContainerElem.replaceChild(divContainerElem.children[number-1].cloneNode(true), divContainerElem.children[number]);
                            divContainerElem.replaceChild(tempNode, divContainerElem.children[number-1]);
                            let t = lines[number];
                            lines[number] = lines[number-1];
                            lines[number-1]=t;
                    }
                    else
                    if(number<1){
                        let tempNode = divContainerElem.children[number].cloneNode(true);
                        divContainerElem.replaceChild(divContainerElem.children[lines.length-1].cloneNode(true), divContainerElem.children[number]);
                        divContainerElem.replaceChild(tempNode, divContainerElem.children[lines.length-1]);
                        let t = lines[number];
                        lines[number] = lines[lines.length-1];
                        lines[lines.length-1]=t;
                    }
                    getButton();
            }
        }
            else
            if(event.target.id=='btnClose'){
                
                let number = Array.prototype.indexOf.call(buttonClose, event.target);
                divContainerElem.removeChild(divContainerElem.children[number]);
                lines.splice(number,1);
                getButton();
            }
        }
    }
    )}
   //[...divContainerElem.children.indexOf(event.target.parentNode())]

window.onload = function() {
    getButton();
    listenButtons();
  };

buttonAdd.addEventListener('click', () => {
    let temp = lineTemplate.cloneNode(true);
    lines.push(temp);
    divContainerElem.appendChild(temp);
    getButton();
})
buttonSave.addEventListener('click', () => {
    const editText1 = document.querySelectorAll('#editText_nomer');
    const editText2 = document.querySelectorAll('#editText_count');

    let str='{ ';
    for(let i=0;i<lines.length-1;i++){
        str+='"'+ editText1[i].value +'":' + '"' + editText2[i].value + '",';
    }
    str+='"'+ editText1[lines.length-1].value +'":' + '"' + editText2[lines.length-1].value + '"}';
    labelText.innerText=str;
})