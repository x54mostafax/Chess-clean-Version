import { GameBoard,times,FinishPrompt, Piecies } from "./data.js";
// import { Handleclick } from "./handleHtml.js";
import { HandleAnimate, Handleclick } from "./handleHtml.js";
import { Active,ActiveFinish,DeActive } from "./handleUi.js";
// import { PawnMove } from "./moves.js";


export class Player {
  static Players = [];
  constructor(name) {
    this.name = name;
    this.type = Player.Players.length;
    this.time = 600;
    this.isKished = false;
    this.AllowedArea = [];
    Player.Players.push(this);
  }
}


export class Piece {
  static AllPeices = [];
  #currentPosition;
  constructor(name, type, pos, doc) {
    this.name = name;
    this.type = type;
    this.dir = type ? -1 : 1;
    this.firstPos = new Vector2(pos);
    this.#currentPosition = new Vector2(pos);
    this.countMoves = 0;
    this.TisKilled = false;
    this.doc = doc;
    this.index = Piece.AllPeices.length;
    this.isKished = false;
    Game.Board[pos?.f - 1] = this;
    if (name == "king") {
      this.Guards = []
      this.Enemies = []
      Game.Kings.push(this);
    }
    Piece.AllPeices.push(this);
    CreatePieceHtml(this)
  }
  set isKilled(args){
    this.TisKilled = args;
    Game.CountOfPiecies+=1-args*2
    if (Game.CountOfPiecies<=4) {
      let AllowedPieces=['pawn','rook','queen']
      let LastPiece=Piece.AllPeices.filter((piece) => piece.isKilled==false)
      .find((piece) => AllowedPieces.includes(piece.name));
      if (!LastPiece) {
        console.log('Drawn');
        Game.IsDrawn()
      }
    }
    if (args==true) {
      Game.CounterOfMoves=50;
      Game.Board[this.currentPosition.f - 1] = 0;
      GameBoard.removeChild(this.doc);
    }
    else {GameBoard.appendChild(this.doc);Game.Board[this.currentPosition.f - 1]=this}
  }
  get isKilled(){return this.TisKilled}
  get currentPosition() { return this.#currentPosition; }
  set currentPosition(value) {
    if (!(this instanceof Vector2)) { value = new Vector2(value) };
    if (this.name=='pawn') {Game.CounterOfMoves=50;}
    Game.Board[this.#currentPosition.f - 1] = 0;
    Game.Board[value.f - 1] = this;
    this.#currentPosition = value;
    
  }
  set Promotion(name) {
    Game.CounterOfMoves=50;
    this.name = name;
    let NameOfPiece = this.name + (this.type ? 'w' : 'b');
    this.doc.innerHTML = `<img src="imgs/chess Piecies/${NameOfPiece}.svg" alt class="${NameOfPiece}" />`;
  }
}
export class HtmlNodes{
  static AllPeices=document.querySelectorAll('.piecechess')
  static Squares=document.querySelectorAll('.square')
  static Update=()=>{
    HtmlNodes.AllPeices=document.querySelectorAll('.piecechess');
    HtmlNodes.Squares=document.querySelectorAll('.square');
    HtmlNodes.Squares.forEach((Square, i) => {
        Square.dataset.index = i;
        Square.addEventListener('click', (e) => Handleclick(i, false))
    })
    HtmlNodes.AllPeices.forEach((piece, i) => {
        piece.dataset.index = i;
        piece.addEventListener('click', (e) => Handleclick(Piece.AllPeices[i].currentPosition.f - 1, true))
    })
  };
}

export class Game {
  static AllPeices = [];
  static Board = new Array(64).fill(0);
  static FiresPieces = [];
  static FiresPositions = [];
  static Kings = [];
  static currentPlayer = true;
  static PointsOfGames = [0, 0];
  static CounterOfMoves = 50;
  static CountOfPiecies=32;
  static IsPlay=()=>{
    let start =setInterval(e=>{
      let curPlayer=Player.Players[+!Game.currentPlayer];
      Player.Players[+!Game.currentPlayer].time--;
      times.item(+Game.currentPlayer).innerHTML=`${new String(Math.trunc(curPlayer.time/60)).padStart(2, 0)}:${new String(curPlayer.time%60).padStart(2, 0)}`
      if (curPlayer.time<=0) {clearInterval(start);Game.IsEnd(!curPlayer.type)}
    },1000)
  }
  static StartGame=()=>{
    times.forEach(el=>el.innerHTML='10:00')
    Game.IsPlay()
    let Names=[Player.Players[0]?.name,Player.Players[1]?.name]
    Move.Movements=[], Piece.AllPeices=[], Game.FiresPieces=[], Game.FiresPositions=[], Game.Kings=[],Player.Players=[];
    // Names.map(el=>new Player(el))
    Game.currentPlayer=true;
    Game.Board=new Array(64).fill(0);
    Move.indexMove=0,Move.curindex=0;
    InitPieces()
    
  }
  static IsEnd=(WinnerIndex,)=>{
    Game.PointsOfGames[WinnerIndex]++;
    ActiveFinish()
  }
  static IsDrawn=()=>{
    ActiveFinish()
  }
  constructor(name, type, pos, doc) {
    this.name = name;
    this.type = type;
    this.dir = [];
    this.doc = doc;
    Piece.AllPeices.push(this);
  }
  
}

export class Move {
  static Movements = [];
  static indexMove = 0;
  static curindex = 0;
  constructor(piece, BPos, APos, Iskiller, isTabiet) {
    this.piece = piece;
    this.BPos = BPos;
    this.APos = APos;
    this.Iskiller = Iskiller;
    this.AddedMove = []
    this.docOfkilled;
    this.index = Move.Movements.length;
    this.Promotion;
    this.PromotionTurn;
    Move.Movements[Move.indexMove++] = this;
    Move.Movements.length = Move.indexMove;
    if (isTabiet) {
      if (isTabiet.currentPosition.x == 1) {
        isTabiet.currentPosition = SumVecs(isTabiet.currentPosition, new Vector2(3, 0))
      }
      else if (isTabiet.currentPosition.x == 8) {
        isTabiet.currentPosition = SumVecs(isTabiet.currentPosition, new Vector2(-2, 0))
      }
      isTabiet.countMoves = 1;
      this.isTabiet = {
        Rock: isTabiet,
        APos: isTabiet.currentPosition
      };
    }
  }
}


export class Vector2 {
  static ZERO = { x: 0, y: 0 }
  static RIGHT = { x: 1, y: 0 }
  static UP_RIGHT = { x: 1, y: 1 }
  static UP = { x: 0, y: 1 }
  static UP_LEFT = { x: -1, y: 1 }
  static LEFT = { x: -1, y: 0 }
  static DOWN_LEFT = { x: -1, y: -1 }
  static DOWN = { x: 0, y: -1 }
  static DOWN_RIGHT = { x: 1, y: -1 }
  static MainVecs = [Vector2.UP, Vector2.DOWN, Vector2.RIGHT, Vector2.LEFT];
  static NoNMainVecs = [Vector2.UP_RIGHT, Vector2.UP_LEFT, Vector2.DOWN_LEFT, Vector2.DOWN_RIGHT];
  static AllVecs = [...Vector2.MainVecs, ...Vector2.NoNMainVecs]
  static KnightMoves = [
    new Vector2(2, 1), new Vector2(2, -1),
    new Vector2(-2, 1), new Vector2(-2, -1),
    new Vector2(1, 2), new Vector2(1, -2),
    new Vector2(-1, 2), new Vector2(-1, -2)
  ];
  constructor(input1, input2) {
    if (typeof input1 === 'object' && input1 !== null) {
      // Case 1: Input as an object with properties {x, y}
      this.x = input1.x || 0;
      this.y = input1.y || 0;
    } else if (typeof input1 === 'number' && typeof input2 === 'number') {
      // Case 2: Separate x, y values
      this.x = input1;
      this.y = input2;
    } else if (typeof input1 === 'number') {
      // Case 3: Single f value (field index)
      this.x = (input1 - 1) % 8 + 1;    // Assuming an 8x8 grid for a chessboard
      this.y = Math.floor((input1 - 1) / 8) + 1;
    } else {
      // Default values if no input provided or invalid input
      this.x = 0;
      this.y = 0;
    }
    if (this.x < 0 || this.x > 8 || this.x < 0 || this.y > 8)
      return null
  }
  get f() {
    return this.x + (this.y - 1) * 8;
  }
  set f(input1) {
    if (typeof input1 === 'object' && input1 !== null) {
      // Case 1: Input as an object with properties {x, y}
      this.x = input1.x || 0;
      this.y = input1.y || 0;
    } else if (typeof input1 === 'number') {
      // Case 3: Single f value (field index)
      this.x = (input1 - 1) % 8 + 1;    // Assuming an 8x8 grid for a chessboard
      this.y = Math.floor((input1 - 1) / 8) + 1;
    } else {
      // Default values if no input provided or invalid input
      this.x = 1;
      this.y = 1;
    }
  }
}

// fuctions of Vectors
export function isValidVector(vec) {
  return vec.x > 0 && vec.x <= 8 && vec.y > 0 && vec.y <= 8;
}

// حساب المجموع المتجهي
export function SumVecs(...vecs) {
  return vecs.reduce((acc, vec) => {
    acc.x += vec?.x;
    acc.y += vec?.y;
    return acc;
  }, new Vector2(0, 0));
}

// static MainVecs = [Vector2.UP, Vector2.DOWN, Vector2.RIGHT, Vector2.LEFT];
//   static NoNMainVecs = [Vector2.UP_RIGHT, Vector2.UP_LEFT, Vector2.DOWN_LEFT, Vector2.DOWN_RIGHT];
//   static AllVecs = [...Vector2.MainVecs, ...Vector2.NoNMainVecs]
export function TypeVector(x, y) {
  if (!x) if (y>0) return 0;else return 1;
  else if (!y) if (x>0) return 2;else return 3;
  else if (x>0) if (y>0) return 4;else return 7;
  else if (x<0)if (y<0) return 6;else return 5;
}

// ضرب متجه في عدد
export function MultiVectors(num, vec) {
  return new Vector2(num * vec.x, num * vec.y);
}

export function InitPieces() {
  document.querySelectorAll('.piecechess').forEach((el) => el.remove())
  let NamesPlayers=['Mostafa','Waterson']
  for (let i = Player.Players.length; i < 2; i++) {
    let x = 1;
    if (i) {
      for (let j = 1; j <= 8; j++) { new Piece('pawn', Boolean(i), new Vector2(j, 7)) }
    }
    new Player(NamesPlayers[i]);
    new Piece('rock', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('knight', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('bishop', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('queen', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('king', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('bishop', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('knight', Boolean(i), new Vector2(x++, 1 + i * 7))
    new Piece('rock', Boolean(i), new Vector2(x++, 1 + i * 7))
    if (!i) {
      for (let j = 1; j <= 8; j++) { new Piece('pawn', Boolean(i), new Vector2(j, 2)) }
    }
  }
  HtmlNodes.Update()
}

export function CreatePieceHtml(PieceChess) {
  let NameOfPiece = PieceChess.name + (PieceChess.type ? 'w' : 'b');
  let PieceHtml = document.createElement('div')
  PieceHtml.className = `piecechess ${PieceChess.type? 'white' : 'black'}`;
  PieceHtml.innerHTML += `<img src="./imgs/chess Piecies/${NameOfPiece}.svg" alt class="${NameOfPiece} PIECE" />`;
  PieceHtml.style.gridColumn = `${PieceChess.currentPosition.x}/${PieceChess.currentPosition.x+1}`;
  PieceHtml.style.gridRow = `${PieceChess.currentPosition.y}/${PieceChess.currentPosition.y+1}`;
  PieceHtml.style.width = '100%';
  GameBoard.appendChild(PieceHtml)
  PieceChess.doc = PieceHtml;
}

Game.StartGame()

