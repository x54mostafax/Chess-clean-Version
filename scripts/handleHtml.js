import{HtmlNodes,InitPieces,Vector2,Game,Player,Piece,Move,SumVecs,MultiVectors}from'./classes.js';
import{GameBoard}from'./data.js';
import{IsMate,MangeMovies,MovePiece,ScanAllow,ScanDangerousFields,WhereTheEnemy}from'./moves.js';

let NowPiece,Squares, Piecies;
for(let i=0;i<64;i++){
    let square=document.createElement('div');
    square.className=`square${(i+Math.floor(i/8))%2+1} square`;
    GameBoard.appendChild(square);
}
export function MoveStep(direction=1){
    const isForward=direction===1;
    const index=isForward?Move.indexMove:Move.indexMove-1;
    const curMove=Move.Movements[index];
    if(!curMove){
        Move.indexMove=isForward?Move.Movements.length:0;
        return;
    }
    const piece=curMove.piece;
    const killedPiece=curMove.Iskiller;
    piece.countMoves+=direction;
    piece.currentPosition=isForward?curMove.APos:curMove.BPos;
    if(curMove.isTabiet){
        const rock=curMove.isTabiet.Rock;
        rock.currentPosition=isForward?curMove.isTabiet.APos:rock.firstPos;
        rock.countMoves+=direction;
        HandleAnimate(rock.currentPosition,rock,true);
    }
    HandleAnimate(piece.currentPosition,piece,true);
    if(killedPiece)killedPiece.isKilled=isForward;
    if(curMove.Promotion){
        piece.Promotion=isForward?curMove.Promotion:'pawn';
        HandleAnimate(piece.currentPosition,piece,true);
    }
    Game.currentPlayer=isForward?!piece.type:piece.type;
    Move.indexMove+=direction;
}

function HandleMove(index){
    if(!NowPiece)return;
    let result=MovePiece(index+1,NowPiece);
    if(result instanceof Piece)HandleAnimate(new Vector2(result.currentPosition.f),result);
    HandleAnimate(new Vector2(index+1));
}
export function HandleAnimate(Position,piece,Ismove=false){
    let element=piece||NowPiece;
    let start=element.firstPos;
    let delta=new Vector2(start.x-Position.x,start.y-Position.y);
    Piecies.item(element.index).style.cssText+=`transform:translate(${-delta.x*100}%,${-delta.y*100}%) rotate(${!element.type*180}deg);`;
    // Piecies.item(element.index).style.cssText=`grid-column: ${Position.x}/${Position.x+1};grid-row:${Position.y}/${Position.y+1}; width: 100%;`;
    ClearBoard();
}

function ClearBoard(){
    HtmlNodes.Squares.forEach(square=>square.classList.remove('fire','circle'));
}

export function Handleclick(index,isPiece=false){
    Squares=HtmlNodes.Squares;
    Piecies=HtmlNodes.AllPeices;
    let curPiece=Game.Board[index];
    if(!curPiece&&Squares[index].classList.contains('circle'))return HandleMove(index);
    if(curPiece.type==!Game.currentPlayer&&Squares[index].classList.contains('fire'))return HandleMove(index);
    ClearBoard();
    if(curPiece.type==Game.currentPlayer&&!curPiece.isKilled){
        NowPiece=curPiece;
        let player=Player.Players[+NowPiece.type];
        let king=Game.Kings[+NowPiece.type];
        ScanAllow(NowPiece.type);
        let guardIndex=king.Guards.indexOf(NowPiece);
        let possibleMoves=MangeMovies(NowPiece,true);
        possibleMoves.forEach(move=>{
            if(player.isKished&&!player.AllowedArea.find(pos=>pos.x===move.x&&pos.y===move.y)&&NowPiece.name!=='king')return;
            let posIndex=move.f-1;
            if(Game.Board[posIndex])Squares[posIndex].classList.add('fire');
            else Squares[posIndex].classList.add('circle');
        });
    }
}

function Helper(king,index,MovePos){
    if(!king.Enemies[index])return;
    let guard=king.Guards[index].currentPosition;
    let enemy=king.Enemies[index].currentPosition;
    let direction=Vector2.AllVecs[index];
    let moveVector=new Vector2(MovePos.x-guard.x,MovePos.y-guard.y).f;
    let expectedVector=MultiVectors(Math.abs(enemy.x-guard.x),direction);
}
