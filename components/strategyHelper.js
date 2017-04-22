'use strict';

let config = require('../config');
let _ = require('lodash');

class StrategyHelper {
  constructor(chenScore, isBigBlind, raiseHappened, numberOfPlayers, minRaise, callAmount, roundNumber, ourStack, ourCards, communityCards) {
    this.chenScore = chenScore;
    this.isBigBlind = isBigBlind;
    this.raiseHappened = raiseHappened;
    this.numberOfPlayers = numberOfPlayers;
    this.minRaise = minRaise;
    this.callAmount = callAmount;
    this.roundNumber = roundNumber;
    this.ourStack = ourStack;
    this.ourCards = ourCards;
    this.communityCards = communityCards;
  }

  calculateTreshold() {

    // let agressiveTreshold = 7;
    // let passiveTreshold = 9;
    // let currentTreshold = numberOfPlayers > 3 ? passiveTreshold : agressiveTreshold;
    // betAmount = points < currentTreshold ? 0 : 5000;
  }

  calculate() {
    let safeLow = 9;
    let aggrLow = 7;
    let safeHigh = 11;
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
      let randomRatio = 100;
      if(_.find(this.communityCards, { rank: this.ourCards[0].rank }) ||
        _.find(this.communityCards, { rank: this.ourCards[1].rank })) {
        randomRatio += 400;
      }
      return (this.ourStack / 100 * 20) + Math.ceil(Math.random() * randomRatio);
    }
  }
}

module.exports = StrategyHelper;
