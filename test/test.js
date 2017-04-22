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

describe('LeanPoker', function() {
  describe('game', function() {
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
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(1000);
    });

    it('should AJ bet: 1000', function() {
      GameState.players[1].hole_cards[0].rank = 'A';
      GameState.players[1].hole_cards[1].rank = 'J';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(1000);
    });

    it('should K7 bet: 0', function() {
      GameState.players[1].hole_cards[0].rank = 'K';
      GameState.players[1].hole_cards[1].rank = '7';
      let bet = sinon.spy();
      Player.betRequest(GameState, bet);
      bet.should.have.been.calledWith(0);
    });

  });
});

