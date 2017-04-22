'use strict';

class DataDecorator {

  static create(data) {
    return new DataDecorator(data);
  }

  constructor(data) {
    this.data = data;
  }

  ourPlayer(){
    let player = this.data["players"].filter((player) => player.name == "happyDay")[0];
    return player;
  }

  ourIndex() {
    return this.data["players"].indexOf(this.ourPlayer);
  }

  activePlayers() {
    return this.data["players"].filter((player) => player.status == "active" || player.status == "folded");
  }

  numberOfPlayers() {
    return this.activePlayers().length;
  }

  isBigBlind() {
    return ((this.data['dealer'] + 1) % this.numberOfPlayers()) + 1 == this.ourIndex();
  }

  raiseHappend() {
    return this.data["current_buy_in"] > (this.data["small_blind"] * 2);
  }

  roundNumber() {
    switch(this.data["community_cards"].length) {
      case 0: return 0;
      case 3: return 1;
      case 4: return 2;
      case 5: return 3;
    }
  }

  ourStack() {
    return this.ourPlayer()['stack'];
  }

}

module.exports = DataDecorator;
