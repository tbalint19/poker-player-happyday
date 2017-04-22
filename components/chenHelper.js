'use strict';

let Logger = require('./logger');

const cardlist = {
  '2': 0,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 4,
  '7': 5,
  '8': 6,
  '9': 7,
  '10': 8,
  'J': 9,
  'Q': 10,
  'K': 11,
  'A': 12
};

class ChenHelper {

  constructor(hand){
    Logger.log('hand', hand);
    Logger.log();
    this.firstRank = hand[0]["rank"];
    this.secondRank = hand[1]["rank"];
    this.firstSuit = hand[0]["suit"];
    this.secondSuit = hand[1]["suit"];
    this.firstValue = this.firstRank == "A" ?
      10 : this.firstRank == "K" ?
        8 : this.firstRank == "Q" ?
          7 : this.firstRank == "J" ?
            6 : parseInt(this.firstRank)/2;

    Logger.log('first:', this.firstValue);
    this.secondValue = this.secondRank == "A" ?
      10 : this.secondRank == "K" ?
        8 : this.secondRank == "Q" ?
          7 : this.secondRank == "J" ?
            6 : parseInt(this.secondRank)/2;

    Logger.log('sec:', this.secondValue);
    Logger.log();
  }

  calculatePoints(){
    let betAmount = this.getScoreForHighest();
    Logger.log('based max', betAmount);
    betAmount = this.firstRank == this.secondRank ? betAmount * 2 : betAmount;
    betAmount = this.firstSuit == this.secondSuit ? betAmount + 2 : betAmount;
    let gapFirst = cardlist[this.firstRank];
    let gapSec = cardlist[this.secondRank];
    let gap;
    if (gapFirst == gapSec) {
      gap = 0;
    } else {
      gap = Math.abs(gapFirst - gapSec) - 1;
    }
    betAmount = gap == 0 ?
      betAmount : gap == 1 ?
      betAmount - 1 : gap == 2 ?
      betAmount - 2 : gap == 3 ?
      betAmount - 4 : betAmount - 5;

    Logger.log('BET', betAmount);
    Logger.log('gap', gap);
    Logger.log('this.firstValue', this.firstValue);
    Logger.log('this.secondValue', this.secondValue);
    betAmount = gap < 2 && this.firstValue < 7 && this.secondValue < 7 && this.firstValue !== this.secondValue ? betAmount + 1 : betAmount;
    Logger.log('BETU', betAmount);
    return Math.ceil(betAmount)
  }

  getScoreForHighest(){
    return Math.max(this.firstValue, this.secondValue);
  }

  calculate(){
    let points = this.calculatePoints()
    Logger.log(points);
    return points < 9 ? 0 : 1000;
  }

}

module.exports = ChenHelper;
