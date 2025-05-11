import { Vector2 } from "./classes.js"
import { Handleclick } from "./handleHtml.js"
const CheckMate = [
  { from: [8, 7], to: [8, 6] },
  { from: [4, 2], to: [4, 3] },
  { from: [8, 6], to: [8, 5] },
  { from: [3, 1], to: [6, 4] },
  { from: [8, 5], to: [8, 4] },
  { from: [5, 1], to: [1, 5] },
  { from: [8, 4], to: [8, 3] },
  { from: [1, 5], to: [3, 7] }
]; 
const GuardWhite = [
  { from: [5, 7], to: [5, 5] },
  { from: [6, 2], to: [6, 4] },
  { from: [6, 7], to: [6, 6] },
  { from: [5, 2], to: [5, 4] },
  { from: [5, 5], to: [6, 4] },
  { from: [4, 1], to: [8, 5] },
  { from: [8, 4], to: [7, 5] },
  { from: [1, 5], to: [3, 7] }
];
const TabietTestWhiteRight = [
  { from: [2, 8], to: [3, 6] },
  { from: [5, 2], to: [5, 4] },
  { from: [2, 7], to: [2, 6] },
  { from: [6, 2], to: [6, 3] },
  { from: [3, 8], to: [1, 6] },
  { from: [1, 2], to: [1, 3] },
  { from: [5, 7], to: [5, 6] },
  { from: [5, 4], to: [5, 5] },
  { from: [4, 8], to: [7, 5] },
  { from: [1, 3], to: [1, 4] }
];


const whitePawnPromotionMoves = [
    { from: [1, 7], to: [1, 5] }, // White pawn moves forward two squares initially
    { from: [2, 2], to: [2, 4] },
    { from: [1, 5], to: [2, 4] },
    { from: [1, 2], to: [1, 4] },
    { from: [2, 4], to: [2, 3] },
    { from: [4, 2], to: [4, 4] },
    { from: [2, 3], to: [2, 2] },
    { from: [4, 4], to: [4, 5] },
    { from: [3, 7], to: [3, 6] },
    { from: [4, 5], to: [3, 6] },
];
const Kish = [
    { from: [7, 8], to: [8, 6] }, // White pawn moves forward two squares initially
    { from: [5, 2], to: [5, 3] },
    { from: [7, 7], to: [7, 5] },
    { from: [6, 1], to: [3, 4] },
    { from: [6, 7], to: [6, 5] },
    { from: [4, 1], to: [8, 5] },
    { from: [2, 3], to: [2, 2] },
    { from: [4, 4], to: [4, 5] },
    { from: [3, 7], to: [3, 6] },
    { from: [4, 5], to: [3, 6] },
    { from: [2, 2], to: [1, 1] },
];

const game = [
  { from: [2, 8], to: [3, 6] },
  { from: [5, 2], to: [5, 4] },
  { from: [2, 7], to: [2, 6] },
  { from: [6, 2], to: [6, 3] },
  { from: [3, 8], to: [1, 6] },
  { from: [1, 2], to: [1, 3] },
  { from: [5, 7], to: [5, 6] },
  { from: [5, 4], to: [5, 5] },
  { from: [4, 8], to: [7, 5] },
  { from: [1, 3], to: [1, 4] },
  { from: [5, 7], to: [5, 5] },
  { from: [6, 2], to: [6, 4] },
  { from: [6, 7], to: [6, 6] },
  { from: [5, 2], to: [5, 4] },
  { from: [5, 5], to: [6, 4] },
  { from: [4, 1], to: [8, 5] },
  { from: [8, 4], to: [7, 5] },
  { from: [1, 5], to: [3, 7] },
  { from: [8, 7], to: [8, 6] },
  { from: [4, 2], to: [4, 3] },
  { from: [8, 6], to: [8, 5] },
  { from: [3, 1], to: [6, 4] },
  { from: [8, 5], to: [8, 4] },
  { from: [5, 1], to: [1, 5] },
  { from: [8, 4], to: [8, 3] },
  { from: [1, 5], to: [3, 7] }
];

function Test(Ar) {
    for (let i = 0; i < Ar.length; i++) {
        const element = Ar[i];
        Handleclick(new Vector2(...element.from).f - 1)
        Handleclick(new Vector2(...element.to).f - 1)
    }
}
//  Test(Kish)
