class ChenHelper {

  constructor(hand){
    this.firstRank = hand[0]["rank"];
    this.secondRank = hand[0]["rank"];
    this.firstSuit = hand[1]["suit"];
    this.secondSuit = hand[1]["suit"];
  }

}

module.exports = ChenHelper
