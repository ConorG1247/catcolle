import { useState } from "react";
import Enemy from "./Enemy/Enemy";
import Player from "./Player/Player";
import { playerStats, enemyStats } from "../../libs/types";
import { enemyStatsData, playerStatsData } from "libs/data";

function Battle() {
  const [playerStats, setPlayerStats] = useState<playerStats>(playerStatsData);

  const [enemyStats, setEnemyStats] = useState<enemyStats>(enemyStatsData);
  const [resetStats, setResetStats] = useState(false);
  const [battleCheck, setBattleCheck] = useState(false);
  const [playerCharge, setPlayerCharge] = useState(0);

  const changeBattleCheck = () => {
    setBattleCheck(false);
  };

  const addCharge = () => {
    if (
      playerCharge +
        playerStats.level * 0.2 +
        playerStats.stats.intelligence * 0.3 +
        10 >=
      playerStats.stats.intelligence * 1.5 + 100
    ) {
      setPlayerCharge(playerStats.stats.intelligence * 1.5 + 100);
      return;
    }
    setPlayerCharge(
      playerCharge +
        playerStats.level * 0.2 +
        playerStats.stats.intelligence * 0.3 +
        7 +
        Math.floor(Math.random() * 6)
    );
  };

  const removeCharge = (cost: number) => {
    setPlayerCharge(playerCharge - cost);
  };

  const reset = () => {
    setResetStats(!resetStats);
    setBattleCheck(false);
    setPlayerCharge(0);
  };

  return (
    <div>
      <Player
        pStats={playerStats}
        eStats={enemyStats}
        reset={resetStats}
        changeBattleCheck={changeBattleCheck}
        battleCheck={battleCheck}
        playerCharge={playerCharge}
      />
      <Enemy
        pStats={playerStats}
        eStats={enemyStats}
        reset={resetStats}
        changeBattleCheck={changeBattleCheck}
        addCharge={addCharge}
        playerCharge={playerCharge}
        removeCharge={removeCharge}
      />
      <button className="reset" onClick={() => setBattleCheck(true)}>
        Stop
      </button>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Battle;
