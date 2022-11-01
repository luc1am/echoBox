let rm;
let response = '';
let narcLines, allegoryLines;

let myRec = new p5.SpeechRec();

let userTextArr = [];
let userLines = [];
let butt;



class UserText{
  constructor(text,x,y, frame_0){
    this.text = text;
    this.x = x;
    this.y = y;
    this.colorFade = 255;
    this.frame_0 = frame_0
  }
  display(){
    textSize(100);
    textWrap(WORD);
    fill(150,150,150,this.colorFade-(0.1*(frameCount-this.frame_0)));
    text(this.text, this.x,this.y, width/2, height/2);
  }
}

function preload(){
  allegoryLines = loadStrings('allegory.txt');
  narcLines = loadStrings('narcissusAndEcho.txt');



  rm = RiTa.markov(2);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  butt = createButton("start");
  butt.mousePressed(function startListen(){
    startRec();
    butt.hide();
  })

}

function startRec(){
  let continuous = true;
  let interimResults = false;
  myRec.start(continuous, interimResults);
  console.log("loaded");
  myRec.onResult = showResult;
}

function showResult(){
  console.log(myRec.resultString);
  talk(myRec.resultString);

}

function talk(text){
  userLines.push(text);
  print(userLines);
  rm.addText(userLines);
  rm.addText(narcLines);
  rm.addText(allegoryLines);
  response = rm.generate(1, {temperature:100}, {minLength:3});
  userTextArr.push(new UserText(response,
     random(width-300), random(height - 300),
      frameCount));
}


function draw() {
  blendMode(BLEND);


  let caveCenterX = width/2 ;
  let caveCenterY = height/2;

  //cave effect
  background(50);

  for (let i = 50; i>0; i--){
    noStroke();
    fill(i)
    //stroke(255);
    rectMode(CENTER);
    let rectHeight = height-10*(50-i)
    ellipse(caveCenterX, caveCenterY, width-10*(50-i), rectHeight);
    if (rectHeight < 10){
      break
    }
  }
  fill(100);

  if (userTextArr.length>0){
    for (let i = 0; i<userTextArr.length; i++){
      userTextArr[i].display();
    }
  }
}






// function talking(talked){
//   if (talked){
//     if (!otherUserLines.includes(talked)){
//       otherUserLines.push(talked);
//     }
//     userLines.push(talked);
//     //fill(200);
//     print(userLines);
//     rm.addText(userLines)
//     rm.addText(otherUserLines)
//     //input.value('')
//     //userTextArr[userTextArr.length - 1].display();
//   }
//   response = rm.generate(1, {temperature: 100}, {minLength: 3});
//   promptCount++;
//   userTextArr.push(new UserText(
//     response,
//     random(width - 100), random(height-100),
//     frameCount));
// }
