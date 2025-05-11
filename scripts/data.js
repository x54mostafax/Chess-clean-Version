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
//BtnSOfQuit
export let QFinishs=document.querySelectorAll('.Quit-FinishPrompt');
export let QSettings=document.querySelectorAll('.Quit-settingsPrompt');
export let QExits=document.querySelectorAll('.Quit-ExitPrompt');
//BtnSOfEnter
export let E_Exits=document.querySelector('.btn-ExitPrompt');
export let E_Settings=document.querySelector('.btn-settingsPrompt');
export const regNum = /-?\d+/i
export const regNums = /-?\d+/gi

// المتغيرات
export let divpress = document.createElement('div')
export let divclick = document.createElement('div')
divpress.className = 'onpress'
divclick.className = 'onpress'
export let currentSquare = null
export let currentPiece = null
export let countOfFeilds = 64
export let feilds = []
export let fires = []
export let killedPiece = []
export let circlesTest = []
export let isWhite = true
export let nowfeilds = []
export let r = 'pkf';



