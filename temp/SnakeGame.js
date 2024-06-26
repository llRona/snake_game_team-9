//전역 변수
let pMan; //팩멘
let m1, m2, m3; //몬스터 1, 2, 3
let scl = 20; 
let food;
let playfield = 600;

// 맵 
let map1 = [];
let map2 = [];
let map3 = [];
let map4 = [];
let map5 = [];

function setup() {
  createCanvas(playfield, playfield + 40);
  background(51);
  frameRate(10);
  
  //객체생성 팩맨이면 true, 아니면 false
  pMan = new obj(true);
  m1 = new obj(false);
  m2 = new obj(false);
  m3 = new obj(false);
}

function draw() {
  background(220);
  pMan.show();
  pMan.update();
  
  m1.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW){
      pMan.dir(0, -1);
  }else if (keyCode === DOWN_ARROW) {
      pMan.dir(0, 1);
  }else if (keyCode === RIGHT_ARROW) {
      pMan.dir (1, 0);
  }else if (keyCode === LEFT_ARROW) {
      pMan.dir (-1, 0);
  }
}
 
function pickLocation() { //랜덤한 위치를 지정해주는 클래스
  let cols = floor(playfield/scl);
  let rows = floor(playfield/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
 
  // Check the food isn't appearing inside the tail
 
  for (let i = 0; i < s.tail.length; i++) {
    let pos = s.tail[i];
    let d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }
  }
} 

function obj(type) {
  // 객체의 상태에 관한 필드
  
  this.x = 0; //객체의 x 위치
  this.y = 0; //객체의 y 위치
  this.xspeed = 0; //x 방향 이동속도
  this.yspeed = 0; //y 방향 이동속도
  this.type = type;
  
  // 점수관련 필드
  
  this.total = 0;
  this.score = 1;
  this.highscore = 1;

  //객체의 이동방향을 정하는 메소드
  this.dir = function(x,y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
 // 점수 얻는 메소드
  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      text(this.score, 70, 625);
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      text(this.highscore, 540, 625);
      return true;
    } else {
      return false;
    }
  } 

  //몬스터와 만났을 때, 죽음 판정하는 메소드
  this.death = function(monster) {
    let d = dist(this.x, this.y, monster.x, monster.y);
    if (d < 1) {
      this.total = 0;
      this.score = 0;
    }
  }
 
  //맵 데이터를 받아 객체를 이동시키는 메소드
  this.update = function(mapData){
    //객체가 맵에 부딛히지 않을 때, 이동할 수 있게함.
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;      
    //if(mapData[this.x / scl + this.xspeed][this.y / scl + this.yspeed]) {
    //  this.x += this.xspeed * scl;
    //  this.y += this.yspeed * scl;      
    //}

    this.x = constrain(this.x, 0, playfield-scl); //x, y를 경기장 안에서만 있게 제한함.
    this.y = constrain(this.y, 0, playfield-scl);
  }
  
  //객체를 그리는 메소드
  this.show = function(){
    if (type) { //팩맨 그림
      push();
      fill(255,255,0);
      rect(this.x, this.y, scl, scl);
      pop();
    } else { //몬스터 그림
      push();
      fill(255);
      rect(this.x, this.y, scl, scl);
      pop();
    }
  } 
}

//맵에 따른 벽을 생성하는 함수
function wall(mapData) {
  fill(110);
  for (i = 0; i < playfield/scl; i++) {
    for (j = 0; j < playfield/scl; j++) {
      if (mapData[i][j]) rect(i*scl, j*scl, scl, scl);
    }
  }
}
