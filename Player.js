class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    try {
      let data = JSON.parse(gameState);
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay");
      let ourHand = ourPlayer["hole_cards"];
      let firstRank = ourHand[0]["rank"];
      let secondRank = ourHand[1]["rank"];
      let highRanks = ["A", "K", "Q", "J", "10"];
      let betAmount = firstRank == secondRank ? 1000 : highRanks.includes(firstRank) && highRanks.includes(secondRank) ? 1000 : 0;
      bet(betAmount);
    } catch (e){
      console.log("error happened", e);
      bet(1000);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
