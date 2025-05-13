import { Game } from "./classes.js"


export const GameBoard = document.querySelector('.chessboard')
export const Piecies = document.querySelectorAll('.piecechess')
export const Squares = document.querySelectorAll('.square')
export const Circles = document.querySelectorAll('.square .circle')
export const backBtn = document.querySelector('.backmove')
export const frontBtn = document.querySelector('.frontmove')
export const times = document.querySelectorAll('.timeplayer')
export const sqb = []
export let PieciesHtml=document.querySelectorAll('.piecechess')
export let Promotions = document.querySelectorAll('.promotion')
export let BackPromotion = document.querySelector('.Back-Prom')
export let ChoicesPromDoc = document.querySelectorAll('.field-piece')
export let FinishPrompt=document.querySelector('.FinishPrompt');
export let settingsPrompt=document.querySelector('.settingsPrompt');
export let ExitPrompt=document.querySelector('.ExitPrompt');
export let ResultGames=document.querySelector('.ResultGames');
export let NamePLayerResults=document.querySelectorAll('.NamePLayerResult');
export let SettingsBtn=document.querySelector('.SettingsBtn');
export let Drawn=document.querySelector('.Drawn');
export let RePlayGame=document.querySelector('.RePlayGame');
export let ReasonEnd=document.querySelector('.ReasonEnd');
export let StateEnd=document.querySelector('.StateEnd')
//BtnSOfQuit
export let QFinishs=document.querySelectorAll('.Quit-FinishPrompt');
export let QSettings=document.querySelectorAll('.Quit-settingsPrompt');
export let QExits=document.querySelectorAll('.Quit-ExitPrompt');
//BtnSOfEnter
export let E_Exits=document.querySelector('.btn-ExitPrompt');
export let E_Settings=document.querySelector('.btn-settingsPrompt');

// export let Replay=








