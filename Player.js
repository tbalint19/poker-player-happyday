'use strict';

let ChenHelper = require('./components/chenHelper');
let BasicHelper = require('./components/basicHelper');
let _ = require('lodash');

class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    let data = gameState;
    let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];
    let helper;
    let betAmount;
    let agressiveTreshold = 7;
    let passiveTreshold = 9;
    let numberOfPlayers = data["players"].filter((player) => player.status == "active" || player.status == "folded").length;
    let currentTreshold = numberOfPlayers > 3 ? passiveTreshold : agressiveTreshold;
    try {
      helper = new ChenHelper(ourPlayer["hole_cards"]);
      let points = helper.calculatePoints();
      betAmount = points < currentTreshold ? 0 : 5000;
      bet(betAmount);
    } catch (e){
      helper = new BasicHelper(ourPlayer["hole_cards"]);
      betAmount = helper.calculate();
      bet(betAmount);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
