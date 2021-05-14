function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      specialAttackRound: 0,
      disablespecialattack: false,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerrHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Player";
      }
    },
  },
  computed: {
    decreaseMonsterBar() {
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      return { width: this.monsterHealth + "%" };
    },
    decreasePlayerBar() {
      if (this.playerHealth < 0) {
        this.playerHealth = 0;
      }
      return { width: this.playerHealth + "%" };
    },
    enableSpecialAttack() {
      if (this.disablespecialattack === false) {
        return false;
      } else {
        let that = this;
        if (that.specialAttackRound === 4) {
          that.specialAttackRound = 0;
          that.disablespecialattack = false;
        } else {
          that.disablespecialattack = true;
        }
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.specialAttackRound = 0;
      this.disablespecialattack = false;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.specialAttackRound++;
      this.enableSpecialAttack;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('Player', 'attack', attackValue)
    },
    specialAttackMonster() {
      this.disablespecialattack = !this.disablespecialattack;
      this.specialAttackRound = 0;
      this.specialAttackRound++;
      this.enableSpecialAttack;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('Player', 'special-attack', attackValue)
    },
    attackPlayer() {
      const attackValue = getRandomValue(7, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('Monster', 'attack', attackValue)
    },
    healPlayer() {
      this.specialAttackRound++;
      this.enableSpecialAttack;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.addLogMessage('Player', 'heal', healValue)
    },
    surrenderGame() {
      this.winner = "Monster";
      this.addLogMessage('Player', 'surrender')
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        logWho: who,
        logWhat: what,
        logValue: value,
      });
    },
  },
});

const mounting = app.mount("#game");
