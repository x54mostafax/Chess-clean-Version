import { Vector2, CreatePieceHtml,Piece, Player, Move, Game, SumVecs, MultiVectors, isValidVector, InitPieces, Sound } from './classes.js';
import { BackPromotion, ChoicesPromDoc, Promotions } from './data.js';

// let Promotions = document.querySelectorAll('.promotion')
// let BackPromotion = document.querySelector('.back')
// let Fields = document.querySelectorAll('.field-piece')
function GenerateMoves(directions, piece, limit = 8, isAttack = true) {
    const allowedArea = [];
    const { currentPosition, dir } = piece;
    const IsPawn = piece.name == "pawn";
    directions.forEach((dirVec, indexVec) => {
        for (let i = 1; i <= limit; i++) {
            const scanPos = SumVecs(currentPosition, MultiVectors(i * dir, dirVec));
            const boardValue = Game.Board[scanPos.f - 1] ? -Game.Board[scanPos.f - 1]?.dir : Game.Board[scanPos.f - 1];
            if (!isValidVector(scanPos)) { break; };
            if (IsPawn) {
                if (isAttack) {
                    if ((boardValue == dir && dirVec.x) || (!boardValue && !dirVec.x)) {
                        if (!piece.countMoves && dirVec.y ==2) {
                            let before = SumVecs(scanPos, MultiVectors(-i * dir, Vector2.UP));
                            if (Game.Board[before.f - 1]) break;
                        }
                        allowedArea.push(scanPos); 
                    }
                    let LastPawn= Move.Movements[Move.indexMove - 1]?.piece;
                    let PosMe,PosEnemy;
                    [PosMe,PosEnemy]=[piece.currentPosition,LastPawn?.currentPosition];
                    let AddedCond=Math.abs(LastPawn?.currentPosition?.y-LastPawn?.firstPos?.y)!==1 
                    if (LastPawn?.countMoves == 1 && dirVec.x*dir+PosMe.x==PosEnemy.x && PosMe.y==PosEnemy.y && AddedCond ) {
                        scanPos.isTagawz = LastPawn;
                        allowedArea.push(scanPos); 
                    }
                    else if (boardValue && !dirVec.x) { break; }
                    break;
                }
                else if (!isAttack && !dirVec.x) { break; }
            }
            if (boardValue * dir == 0) { allowedArea.push(scanPos); }
            else if (boardValue * dir && !isAttack) { allowedArea.push(scanPos); break; }
            else if (boardValue * dir > 0) { allowedArea.push(scanPos); break; }
            else break;
        }
    });
    return allowedArea;
}



export function PawnMove(PieceChess, isAttack = true,custom) {
    let Moves = [Vector2.UP_RIGHT, Vector2.UP_LEFT, Vector2.UP];
    let Added=0;
    if (!PieceChess.countMoves) { Moves.push(MultiVectors(2, Vector2.UP)) }
    return GenerateMoves(Moves, PieceChess, 1, isAttack)
}
export function RockMove(PieceChess, isAttack = true,custom) {
    return GenerateMoves(Vector2.MainVecs, PieceChess, 8, isAttack);
}

export function BishopMove(PieceChess, isAttack = true,custom) {
    return GenerateMoves(Vector2.NoNMainVecs, PieceChess, 8, isAttack);
}

export function KnightMove(PieceChess, isAttack = true,custom) {
    if (custom) return [];
    return GenerateMoves(Vector2.KnightMoves, PieceChess, 1, isAttack);
}

export function QueenMove(piece, isAttack = true,custom) {
    return GenerateMoves(Vector2.AllVecs, piece, 8, isAttack); // No move limit for Queen
}

export function KingMove(piece, isAttack = true) {
    let Moves = GenerateMoves(Vector2.AllVecs, piece, 1, isAttack);
    if (!isAttack) { return Moves; }
    let danger = ScanDangerousFields(!piece.type)
    if (!piece.countMoves) {
        Moves = [...Moves, ...Tabiet(danger, piece)]
    }
    return Moves.filter((Move) => !danger.map((Vec) => Vec.f).includes(Move.f))
}




export function Tabiet(DangerMove, king) {
    if (!DangerMove || !king) return [];
    let res = []
    for (let i = 2; i < 4; i++) {
        let x = Boolean(i % 2) ? -1 : 1;//  right or left
        let indRock=Boolean(i % 2)?-4:3;
        let dir = SumVecs(king.currentPosition, MultiVectors( 2*x, Vector2.RIGHT));// two steps to right or left
        let Rock = Piece.AllPeices[king.index + indRock]// Rock right or left
        let danger = (DangerMove.find((value) => (dir.f - value.f) <= Math.abs(indRock) && value.y==dir.y) );// Scan DangerMove 
        let stop = false;
        for (let j = 1; j < Math.abs(indRock); j++) {
            let nextPiece = Game.Board[king.currentPosition.f + j * x -1];
            // Scan Pieces 
            if (nextPiece) {stop=true;break;}
        }
        // dir.isTabiet=Rock;
        if (!danger && !Rock?.countMoves && !stop) {dir.isTabiet = Rock; res.push(dir);};
    }
    return res;
}

export function MangeMovies(PieceChess, isAttack=true) {
    if (!PieceChess) return;
    let NamesOfPiecies = ["pawn", "rock", "bishop", "king", "knight", "queen"]
    let MoviesOfPiecies = [PawnMove, RockMove, BishopMove, KingMove, KnightMove, QueenMove];
    let res=MoviesOfPiecies[NamesOfPiecies.indexOf(PieceChess.name)](PieceChess, isAttack);
    if (isAttack===true) {
        ScanAllow(PieceChess.type)
            let Guards=GuardsOfKingOrEnemies(PieceChess.type);
            let Enemys=GuardsOfKingOrEnemies(PieceChess.type,true);
            let index=Guards.indexOf(PieceChess)
            if (index>=0 && Enemys[index]) {
                if (Guards[index].name=='knight') {
                    return [];
                }
                return res.filter((value) => {
                    let Vec=Vector2.AllVecs[index];
                    Vec=new Vector2(Vec.x,-Vec.y);
                    let Gap=new Vector2(Motlak(value.x-PieceChess.currentPosition.x),Motlak(value.y-PieceChess.currentPosition.y))
                    if (Gap.f==Vec.f || new Vector2(-Gap.x,-Gap.y).f==Vec.f) {
                        return true;
                    }
                    return false;
                })
            
        }
    }
    return res
}
function Motlak(n) {
    if (n>0) return 1
    if (n<0) return -1
    return 0;
}

//After Select Postion To Move
export function MovePiece(Position, PieceChess) {
    if (Position == undefined || PieceChess == undefined) return false;
    if (!isNaN(Position)) { Position = new Vector2(Position) }
    //Find the move
    let move = MangeMovies(PieceChess).find(el => el.x == Position.x && el.y == Position.y);
    if (!move) { return "Failed move." }
    let PositionIndex = Position.f - 1;
    if (Game.currentPlayer == PieceChess.type) {
        // Kill Piece
        let attackedPiece= move.isTagawz||Game.Board[Position.f-1] ;
        if (attackedPiece.type==!Game.currentPlayer) {
            //Fire Sound
            attackedPiece.isKilled = true;
        }
        Game.Board[PositionIndex] = PieceChess;
        //Rock Sound and Move
        let NewMove = new Move(PieceChess, PieceChess.currentPosition, Position, attackedPiece, move.isTabiet);
        PieceChess.currentPosition = Position;
        PieceChess.countMoves += 1;
        Game.currentPlayer = !Game.currentPlayer;
        ScanAllow(Game.currentPlayer);
        IsMate(!Game.currentPlayer,'MovePiece 2')
        Game.CounterOfMoves--;
        let AllMovesEnemy=Piece.AllPeices.filter(piece=>piece.type== !PieceChess.type && !piece.isKilled).find(el=>MangeMovies(el).length>0)
        if (Game.CounterOfMoves<=0 || !AllMovesEnemy) {Game.IsDrawn()};
        // Sound.Play(Sound.SoundKeys.TenSeconds)
        ScannerOfPromotion(PieceChess);
        
        Sound.Play(Sound.SoundKeys.Move)
        Sound.IsPlay=false;
        return move.isTabiet || true;
    }
    return false;
}

// static MainVecs = [Vector2.UP, Vector2.DOWN, Vector2.RIGHT, Vector2.LEFT];
// static NoNMainVecs = [Vector2.UP_RIGHT, Vector2.UP_LEFT, Vector2.DOWN_LEFT, Vector2.DOWN_RIGHT];
export function GuardsOfKingOrEnemies(type, isEnemy = false) {
    let king = Game.Kings[+type];
    let Main = [['rock', 'queen'], ['queen', 'bishop']]
    if (isEnemy) king.Enemies = []; else king.Guards = []
    for (const index in Vector2.AllVecs) {
        let Vec = [...Vector2.AllVecs][index];
        Vec = new Vector2(Vec.x, -Vec.y);
        let i=1;
        while (true) {
            const Pos = SumVecs(king.currentPosition, MultiVectors(i++, Vec));
            if (!isValidVector(Pos)) { break ;}
            let curPiece = Game.Board[Pos.f - 1];
            if (curPiece.type == !type && isEnemy) {
                if (Main[Math.abs(Motlak(Vec.x))+Math.abs(Motlak(Vec.y)) - 1].includes(curPiece.name)) {
                king.Enemies[index] = curPiece;
                break;
            }}
            if (curPiece.type == type && !isEnemy) {
                if (king.Guards[index]) {
                    king.Guards[index]=undefined
                    break;
                }
                king.Guards[index] = curPiece; 
            }
        }
    }
    if (isEnemy) return king.Enemies; else return king.Guards
}


export function ScanDangerousFields(Type, IsChicked = false) {
    let DangerousFields = [];
    let PiecesScanned = Piece.AllPeices.filter(el => el.type == Type && !el.isKilled);
    let kingEnemy = Game.Kings[+!Type];
    let Atackers = [];
    PiecesScanned.forEach((piece, i) => {
        let fields = MangeMovies(piece, false).map((Vec) => {
            if (Game.Board[Vec.f - 1].name=='king' && Game.Board[Vec.f - 1].type === !piece.type && piece.name != 'pawn') {
                let PosMe, Posking;
                [PosMe, Posking] = [piece.currentPosition, kingEnemy.currentPosition];
                let V=new Vector2(Motlak(Posking.x - PosMe.x),Motlak(Posking.y - PosMe.y));
                DangerousFields.push(SumVecs(Posking, V).f);
            }
            return Vec.f
        });
        if (IsChicked && fields.includes(kingEnemy.currentPosition.f)) { Atackers.push(piece) }
        else DangerousFields.push(...fields)
    })
    if (IsChicked) return Atackers
    DangerousFields = [...new Set(DangerousFields)].map(value => new Vector2(value))
    return DangerousFields;
}


// export function IsChicked(Type) {
//     if (!Type) return;
//     return Boolean(ScanDangerousFields(Type).find(el => el.f == Game.Kings[+!Type].currentPosition.f))
// }
export function IsMate(type,where) {
    ScanAllow(+!type);
    if (Player.Players[+!type].isKished) {
        let King = Game.Kings[+!type];
        let cond1 = KingMove(King).length
        let AllowedArea = Player.Players[+!type].AllowedArea.map((value) => value.f);
        let cond = !Boolean(Player.Players[+!type].AllowedArea.length+cond1)
        // console.log(AllowedArea);
        if (!cond1 ) {
            let fields = []
            //check The safe Area
            let cond4 =Piece.AllPeices.filter(piece => piece.type == !type && !piece.isKilled).map((piece) => fields=[...fields,...MangeMovies(piece).filter((pos) =>
                {if (AllowedArea.includes(pos.f)) {
                    return true;
                }
                } )
            ]) ;
            if (!fields.length) {
                Game.IsEnd(0,where)
            }
            return cond;
        }
        return [...KingMove(Game.Kings[+type]), ...Player.Players[+type].AllowedArea];
    }
}


export function ScanAllow(type) {
    let player = Player.Players[+type];
    let AllowedArea=AllowedFields(+type);
    // console.log(AllowedArea,'jeer');
    if (AllowedArea.isKished) {
        player.isKished = true
        player.AllowedArea = AllowedArea.res;
    } else { player.isKished = false; player.AllowedArea = [] }
}

export function WhereTheEnemy(Type) {
    if (!Type) return;
    let Guards = GuardsOfKingOrEnemies(Type);
    let Enemies = GuardsOfKingOrEnemies(Type, true);
    let places = [];
    Enemies.forEach((value, i) => {if (value && !Guards[i])  places.push(i) })
    return places;
}
export function AllowedFields(type) {
    let t1 = ScanDangerousFields(!type, true);
    let kingEnemy = Game.Kings[+type];
    let res = [];
    if (t1.length != 1) { return { isKished: Boolean(t1.length), res: [] } }
    let value = t1[0]
    // console.log(kingEnemy,value,'ops',type);
    let fields = SumVecs(kingEnemy.currentPosition, MultiVectors(-1, value.currentPosition));
    let { x, y } = fields;
    res.push(value.currentPosition)
    if (value.name == 'knight') { return { isKished: true, res: res } }
    for (let i = 1; i <= Math.max(Math.abs(fields.x),Math.abs(fields.y)); i++) {
        if (x > 0) { x -= 1 }
        else if (x < 0) { x += 1 }
        if (y > 0) { y -= 1 }
        else if (y < 0) { y += 1 }
        if (x || y) { res.push(new Vector2(value.currentPosition.x + x, value.currentPosition.y + y)) }
    }
    // console.log(res);
    
    return { isKished: true, res: res }
}

function ScannerOfPromotion(Pawn) {
    if (Pawn.name !='pawn') {return false};
    if (Pawn.currentPosition.y == 1 || Pawn.currentPosition.y == 8) {
        Promotions.item(+Pawn.type).style.display = 'grid'
        BackPromotion.style.display = 'block'
        Sound.Play(Sound.SoundKeys.Promote)
        return true 
    }
    return false
}
ChoicesPromDoc.forEach((el,i) => el.addEventListener('click', (e) => {
    // Promotions.item(0).style.display = 'none'
    // Promotions.item(1).style.display = 'none'
    BackPromotion.style.display = 'none'
    let CurrentPawn = Move.Movements[Move.indexMove-1];
    let Names = ['queen', 'bishop', 'rock', 'knight']
    CurrentPawn.Promotion = Names[(i)%4];
    CurrentPawn.piece.Promotion = Names[(i)%4]
    // console.log(CurrentPawn);
    
    IsMate(CurrentPawn.piece.type)
    IsMate(!CurrentPawn.piece.type)
    
}))