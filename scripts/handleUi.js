import { Game, Player } from "./classes.js";
import { backBtn, frontBtn, QExits, QFinishs, QSettings,ExitPrompt,FinishPrompt,settingsPrompt,E_Settings,E_Exits, ResultGames, NamePLayerResults, Drawn, RePlayGame, ReasonEnd, StateEnd } from "./data.js";
import { MoveStep } from "./handleHtml.js";

//Doc

//Prompts

//Evets
export function Active(el) {return el.style.cssText='display:flex;'}
export function DeActive(el) {return el.style.cssText='display:none;'}


QFinishs.forEach(el=>{el.addEventListener('click',e=>{DeActive(FinishPrompt),Game.StartGame()})})
QSettings.forEach(el=>{el.addEventListener('click',e=>DeActive(settingsPrompt))})
QExits.forEach(el=>{el.addEventListener('click',e=>window.close())})

E_Exits.addEventListener('click',e=>Active(ExitPrompt))
E_Settings.addEventListener('click',e=>Active(settingsPrompt))
RePlayGame.addEventListener('click',e=>{Game.StartGame() })
export function ActiveFinish(msg,reason) {
    Active(FinishPrompt);
    ResultGames.innerHTML=`${Game.PointsOfGames[0]}:${Game.PointsOfGames[1]}`;
    ReasonEnd.innerHTML=reason;
    console.log(reason,msg);
    StateEnd.innerHTML=msg;
    NamePLayerResults.forEach((el,index)=>{
        el.innerHTML=`${Player.Players[index].name}`;
    })
}
Drawn.addEventListener('click',e=>{Game.IsDrawn('Agreement Draw')})
backBtn.addEventListener('click',e=>MoveStep(-1))
frontBtn.addEventListener('click',e=>MoveStep(1))