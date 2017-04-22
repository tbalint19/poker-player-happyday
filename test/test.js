'use strict';

let assert = require('assert');
let sinon = require('sinon');

let GameState = require('./gamestate.json');
let Player = require('../Player');

describe('LeanPoker', function() {
  describe('game', function() {
    it('running', function() {
      let bet = (bet => true);
      Player.betRequest(GameState, bet);
    });
  });
});
