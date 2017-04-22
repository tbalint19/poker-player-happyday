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

    it.skip('should 66 bet: 0', function() {
      GameState.players[1].hole_cards[0].rank = '6';
      GameState.players[1].hole_cards[1].rank = '6';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'spades';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(0);
    });

    it.skip('should AJ bet: 1000', function() {
      GameState.players[1].hole_cards[0].rank = 'A';
      GameState.players[1].hole_cards[1].rank = 'J';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'spades';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(0);
    });

    it.skip('should K7 bet: 0', function() {
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
    it('should K7 suited calc chen score: 5', function() {
      GameState.players[1].hole_cards[0].rank = 'K';
      GameState.players[1].hole_cards[1].rank = '7';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculatePoints();
      expect(betAmount).to.eql(5);
    });

    it('should AK suited calc chen score: 12', function() {
      GameState.players[1].hole_cards[0].rank = 'A';
      GameState.players[1].hole_cards[1].rank = 'K';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculatePoints();
      expect(betAmount).to.eql(12);
    });

    it('should TT calc chen score: 10', function() {
      GameState.players[1].hole_cards[0].rank = '10';
      GameState.players[1].hole_cards[1].rank = '10';
      GameState.players[1].hole_cards[0].suit = 'spades';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculatePoints();
      expect(betAmount).to.eql(10);
    });

    it('should 5 7 suited calc chen score: 6', function() {
      GameState.players[1].hole_cards[0].rank = '5';
      GameState.players[1].hole_cards[1].rank = '7';
      GameState.players[1].hole_cards[0].suit = 'hearts';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculatePoints();
      expect(betAmount).to.eql(6);
    });

    it('should 2 7 calc chen score: -1', function() {
      GameState.players[1].hole_cards[0].rank = '2';
      GameState.players[1].hole_cards[1].rank = '7';
      GameState.players[1].hole_cards[0].suit = 'spades';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculatePoints();
      expect(betAmount).to.eql(-1);
    });


    it('should AA calc chen score: -1', function() {
      GameState.players[1].hole_cards[0].rank = 'A';
      GameState.players[1].hole_cards[1].rank = 'A';
      GameState.players[1].hole_cards[0].suit = 'spades';
      GameState.players[1].hole_cards[1].suit = 'hearts';
      let data = GameState;
      let ourPlayer = data["players"].filter((player) => player.name == "happyDay")[0];

      let helper = new ChenHelper(ourPlayer["hole_cards"]);
      let betAmount = helper.calculatePoints();
      expect(betAmount).to.eql(20);
    });

  });
});

