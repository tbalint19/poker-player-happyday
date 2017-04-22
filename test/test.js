'use strict';

let assert = require('assert');
let sinon = require('sinon');
let chai = require('chai');
let sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);
global.expect = chai.expect;
global.assert = chai.assert;

let GameState = require('./gamestate.json');
let Player = require('../Player');
let ChenHelper = require('../components/chenHelper');
let BasicHelper = require('../components/basicHelper');

describe('LeanPoker', function() {
  describe('player', function() {
    it('should running', function() {
      try {
        let bet = (bet => true);
        Player.betRequest(GameState, bet);
      } catch (e) {
        throw new Error('throw error');
      }
    });

    it('should 66 bet: 1000', function() {
      GameState.players[1].hole_cards[0].rank = '6';
      GameState.players[1].hole_cards[1].rank = '6';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'spades';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(1000);
    });

    it('should AJ bet: 1000', function() {
      GameState.players[1].hole_cards[0].rank = 'A';
      GameState.players[1].hole_cards[1].rank = 'J';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'spades';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(1000);
    });

    it('should K7 bet: 0', function() {
      GameState.players[1].hole_cards[0].rank = 'K';
      GameState.players[1].hole_cards[1].rank = '7';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(0);
    });

  });

  describe('chenHelper', function() {
    it('should xx', function() {
      GameState.players[1].hole_cards[0].rank = 'K';
      GameState.players[1].hole_cards[1].rank = '7';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculate();
    });

  });
});

