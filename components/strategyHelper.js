'use strict';

let config = require('../config');

class StrategyHelper {
  constructor(chenScore, isBigBlind, raiseHappened, numberOfPlayers, minRaise, callAmount, roundNumber, ourStack) {
    this.chenScore = chenScore;
    this.isBigBlind = isBigBlind;
    this.raiseHappened = raiseHappened;
    this.numberOfPlayers = numberOfPlayers;
    this.minRaise = minRaise;
    this.callAmount = callAmount;
    this.roundNumber = roundNumber;
    this.ourStack = ourStack;
  }

  calculateTreshold() {

    // let agressiveTreshold = 7;
    // let passiveTreshold = 9;
    // let currentTreshold = numberOfPlayers > 3 ? passiveTreshold : agressiveTreshold;
    // betAmount = points < currentTreshold ? 0 : 5000;
  }

  calculate() {
    let safeLow = 8;
    let aggrLow = 6;
    let safeHigh = 10;
    let aggrHigh = 9;
    let low = this.numberOfPlayers == 4 ? safeLow : aggrLow;
    let high = this.numberOfPlayers == 4 ? safeHigh : aggrHigh;
    if(this.roundNumber == 0) {
      if (this.isBigBlind && !this.raiseHappened) {
        return this.minRaise;
      }
      if (this.chenScore < low) {
        return 0;
      }
      if (this.chenScore < high && this.callAmount <= (this.ourStack / 100 * 20)) {
        return this.callAmount;
      }
      return this.minRaise;
    } else {
      return (this.ourStack / 100 * 20) + Math.ceil(Math.random() * 500);
    }
  }
}

module.exports = StrategyHelper;
