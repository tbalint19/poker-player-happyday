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
    if(this.roundNumber == 0) {
      if (this.isBigBlind && !this.raiseHappened) {
        return this.minRaise;
      }
      if (this.chenScore < 6) {
        return 0;
      }
      if (this.chenScore < 9 && this.callAmount <= (this.ourStack / 100 * 20)) {
        return this.callAmount;
      }
      return this.minRaise;
    } else {
      return (this.ourStack / 100 * 20) + Math.ceil(Math.random() * 500);
    }
  }
}

module.exports = StrategyHelper;
