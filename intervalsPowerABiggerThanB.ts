
// You are given a list of [time, power] for player A and player B where the first element is the timestamp and second element is the power output the player reaches at that timestamp. You are also given a window for how long the game will last. Calculate the percentage of time for which player A has greater power than player B.

// Example:
// total game window: 300.0 seconds

//               i                       
// player A [ [1, 60], [100.33, 75], [200, 80] ] sorted asc based on timestamp
//               j
// player B [ [1, 75] , [50.5, 70] ] sorted asc based on timestamp

// deltaA = (200 - 100.33) = 99.66
// previousTimeStamp = 200
// PlayerA: 80
// PlayerB: 70
// total game window 300 -200 = 100

// 1            50   50.5  100.33   200    300 total game window time
// Player A: 0  60   60     40       80
// Player B: 75 75   70     70       70

// let's assume they won't be ordered by timestamp
// total game window >= 0
// first element of timestamp is always smaller than total time

// #########
// Implementation
// sort both of these ararys ascending
// {1,50,50.5,100.33, 200} this should have no duplicates
// 

// #########

// 300 - 200 = 100
// 100/300 = 33%

// percentage of time A > B ~= 33 %

// Explanation: From 200 -> 300 is when player A has higher power output that player B. 100/300 ~= 33%


const _ = require('lodash');

function findOutTimeWhenAIsStrongerThanB(playerA: number[][], playerB: number[][], gameTime: number) {
  playerA.sort((a,b) => a[0] - b[0]);
  playerB.sort((a,b) => a[0] - b[0]);

  let i = 0;
  let j = 0;

  let aLen = playerA.length;
  let bLen = playerB.length;

  let previousTimeStamp = 0;
  let playerAPower = 0;
  let playerBPower = 0; // 75

  let timeWhenAIsMorePowerfulThanB = 0;

  while (i < aLen || j < bLen) {
    let timeA: number = 0, timeB: number = 0, powerA: number = 0, powerB: number = 0;
    if (i >= aLen) {
      timeA = Infinity;
    } else {
      timeA = playerA[i][0];
      powerA = playerA[i][1];
    }
    if (j >= bLen) {
      timeB = Infinity;
    } else {
      timeB = Infinity;
      timeB = playerB[j][0];
      powerB = playerB[j][1];
    }

    let currTimestamp = 0;

    if (timeA === timeB) {
      currTimestamp = timeA; // 50
      timeWhenAIsMorePowerfulThanB += getDeltaIfPowerAIsBigger(playerAPower, playerBPower,previousTimeStamp, currTimestamp);

      playerAPower = powerA; // 90
      playerBPower = powerB; // 75
      i++;
      j++;
    } else if (timeA < timeB) {
      currTimestamp = timeA;
      timeWhenAIsMorePowerfulThanB += getDeltaIfPowerAIsBigger(playerAPower, playerBPower,previousTimeStamp, currTimestamp);

      playerAPower = powerA;
      i++;
    } else {
      currTimestamp = timeB;
      timeWhenAIsMorePowerfulThanB += getDeltaIfPowerAIsBigger(playerAPower, playerBPower,previousTimeStamp, currTimestamp);

      playerBPower = powerB;
      j++;
    }

    previousTimeStamp = currTimestamp;
  }

  timeWhenAIsMorePowerfulThanB += getDeltaIfPowerAIsBigger(playerAPower, playerBPower,previousTimeStamp, gameTime);

  return timeWhenAIsMorePowerfulThanB/gameTime;
}

function getDeltaIfPowerAIsBigger(
  powerA: number, 
  powerB: number, 
  prevTs: number, 
  currTs: number): number {
  if (powerA > powerB) return currTs - prevTs;
  return 0;
}


findOutTimeWhenAIsStrongerThanB([[1, 60], [100.33, 60], [200, 80] ], [ [1, 75] , [50.5, 70]], 300);
