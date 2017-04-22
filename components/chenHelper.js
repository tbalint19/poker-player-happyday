class ChenHelper {

  constructor(hand){
    this.firstRank = hand[0]["rank"];
    this.secondRank = hand[0]["rank"];
    this.firstSuit = hand[1]["suit"];
    this.secondSuit = hand[1]["suit"];
    this.firstValue = this.firstRank == "A" ? 10 : this.firstRank == "K" ? 8 : this.firstRank == "Q" ? 7 : this.firstRank == "J" ? 6 : parseInt(this.firstRank)/2;
    this.secondValue = this.secondRank == "A" ? 10 : this.secondRank == "K" ? 8 : this.secondRank == "Q" ? 7 : this.secondRank == "J" ? 6 : parseInt(this.secondRank)/2;
  }

  calculatePoints(){
    let betAmount = this.getScoreForHighest();
    betAmount = this.firstRank == this.secondRank ? betAmount * 2 : betAmount;
    betAmount = this.firstSuit == this.secondSuit ? betAmount + 2 : betAmount;
    let gap = Math.abs(this.firstValue - this.secondValue);
    betAmount = gap == 0 ?
      betAmount : gap == 1 ?
      betAmount - 1 : gap == 2 ?
      betAmount - 2 : gap == 3 ?
      betAmount - 4 : betAmount - 5;
    betAmount = gap < 2 && firstValue < 7 && secondValue < 7 ? betAmount + 1 : betAmount;
    return Math.ceil(betAmount)
  }

  getScoreForHighest(){
    return Math.max(this.firstValue, this.secondValue);
  }

  calculate(){
    let points = this.calculatePoints()
    return points < 9 ? 0 : 1000;
  }

}

module.exports = ChenHelper
