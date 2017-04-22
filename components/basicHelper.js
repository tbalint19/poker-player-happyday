class basicHelper {

  constructor(hand){
    this.firstRank = hand[0]["rank"];
    this.secondRank = hand[1]["rank"];
    this.highRanks = ["A", "K", "Q", "J", "10"];
  }

  calculate(){
    let hrs = this.highRanks;
    let first = this.firstRank;
    let second = this.secondRank;
    return first == second ? 1000 : hrs.includes(first) && hrs.includes(second) ? 1000 : 0;
  }

}

module.exports = basicHelper;
