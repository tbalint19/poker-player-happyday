'use strict';
let Logger = require('./logger');

class DataDecorator {

  static create(data) {
    return new DataDecorator(data);
  }

  constructor(data) {
    this.data = data;
  }

  ourPlayer() {
    let result = this.data["players"].filter((player) => player.name == "happyDay")[0];
    Logger.log('DATADECORATOR ourPlayer', result);
    return result;
  }

  ourIndex() {
    let result = this.data["players"].indexOf(this.ourPlayer());
    Logger.log('DATADECORATOR ourIndex', result);
    return result;
  }

  activePlayers() {
    let result = this.data["players"].filter((player) => player.status == "active" || player.status == "folded");
    Logger.log('DATADECORATOR activePlayers', result);
    return result;
  }

  numberOfPlayers() {
    let result = this.activePlayers().length;
    Logger.log('DATADECORATOR numberOfPlayers', result);
    return result;
  }

  isBigBlind() {
    let result = ((this.data['dealer'] + 1) % this.numberOfPlayers()) + 1 == this.ourIndex();
    Logger.log('DATADECORATOR isBigBlind', result);
    return result;
  }

  raiseHappend() {
    let result = this.data["current_buy_in"] > (this.data["small_blind"] * 2);
    Logger.log('DATADECORATOR raiseHappend', result);
    return result;
  }

  roundNumber() {
    let result;
    switch(this.data["community_cards"].length) {
      case 0: result = 0;
      case 3: result = 1;
      case 4: result = 2;
      case 5: result = 3;
      default: result = 0;
    }
    Logger.log('DATADECORATOR roundNumber', result);
    return result;
  }

  ourStack() {
    let result = this.ourPlayer()['stack'];
    Logger.log('DATADECORATOR ourStack', result);
  }

}

module.exports = DataDecorator;
