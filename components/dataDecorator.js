'use strict';

class DataDecorator {

  static create(data) {
    return new DataDecorator(data);
  }

  constructor(data) {
    this.data = data;
  }

  ourPlayer() {
    return this.data["players"].filter((player) => player.name == "happyDay")[0];
  }

  ourIndex() {
    return this.data["players"].indexOf(ourPlayer);
  }

  activePlayers() {
    return this.data["players"].filter((player) => player.status == "active" || player.status == "folded");
  }

  numberOfPlayers() {
    return this.activePlayers().length();
  }

  isBigBlind() {
    return ((this.data['dealer'] + 1) % this.numberOfPlayers()) + 1 == this.ourIndex();
  }

  raiseHappend() {
    return this.data["current_buy_in"] > (this.data["small_blind"] * 2);
  }

}

module.exports = DataDecorator;
