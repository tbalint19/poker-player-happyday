'use strict';

let _ = require('lodash');
let DataDecorator = require('./components/dataDecorator');
let ChenHelper = require('./components/chenHelper');
let BasicHelper = require('./components/basicHelper');
let StartegyHelper = require('./components/strategyHelper');
let config = require('./config');
let Logger = require('./components/logger');

class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    let helper;
    let betAmount;
    let data = DataDecorator.create(gameState);
    let ourPlayer = data.ourPlayer();

    try {
      Logger.log('NORMAL');
      helper = new ChenHelper(ourPlayer["hole_cards"]);
      let points = helper.calculatePoints();
      Logger.log('NORMAL', points);

      let strategy = new StartegyHelper(
        points,
        data.isBigBlind(),
        data.raiseHappend(),
        data.numberOfPlayers(),
        gameState['minimum_raise'],
        gameState['current_buy_in'],
        data.roundNumber(),
        data.ourStack(),
        ourPlayer["hole_cards"],
        gameState['community_cards']
      );
      betAmount = strategy.calculate();
      Logger.log('NORMAL', betAmount);

      bet(betAmount);
    } catch (e){
      Logger.log('catch');
      helper = new BasicHelper(ourPlayer["hole_cards"]);
      betAmount = helper.calculate();
      bet(betAmount);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
