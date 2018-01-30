<template>
    <div>
        <div class="settings">		
            <div v-if="!winner" id=player-info>
                <div>Current Player: </div>
                <div v-if="player">O</div>
                <div v-else>X</div>
            </div>
            
            <div v-else id=player-info>
                <h2>{{ winner }} has won!</h2>
            </div>        
    	</div>
        <div id="board">
            <div v-for="id in grid"
                :id="id"
                @click="handleClick"
                class="board-item">
                <p>{{ gameState[id] }}</p>
            </div>
        </div>
        <div>
            <button @click="resetGame" class="settings-restart">Restart</button>
        </div>
    </div>
</template>

<script>
import { windowBus } from '../../main';

export default {
    data() {
        return {
            grid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            player: true,
            winner: undefined,
            gameState: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: '',
            },
            winConditions: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
                [1, 5, 9],
                [3, 5, 7],
            ],
        };
    },
    methods: {
        handleClick: function(el) {
            this.gameState[el.target.id] = !this.player ? 'X' : 'O';
            this.player = !this.player;
            this.checkForWin(this.squares);
        },
        checkForWin() {
            for (let i = 0; i < this.winConditions.length; i++) {
                let condition = this.winConditions[i];
                let currentState = this.gameState;

                if (
                    currentState[condition[0]] === currentState[condition[1]] &&
                    currentState[condition[1]] === currentState[condition[2]] &&
                    currentState[condition[0]] != ''
                ) {
                    console.log('won!');
                    this.winner = this.player ? 'X' : 'O';
                    return true;
                }
            }
            return false;
        },
        resetGame() {
            this.gameState = {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: '',
            };
            this.winner = '';
        },
    },
};
</script>


<style scoped>
/* #1b998b #345995 #2d3047 #171123 #fffd82  */

.settings {
    position: relative;
    text-align: center;
    margin: 10px auto;
}

.settings-title {
    position: absolute;
    display: block;
    width: 100%;
    color: #35495e;
    font-size: 24px;
    text-align: center;
    font-family: Arial, sans-serif;
}

#board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    width: 150px;
    background-color: #fffd82;
    color: #345995;
}

.board-item {
    flex: 1 0 32%; /* explanation below */
    height: 50px;
    border: solid 1px black;
    transition: all 0.3s ease-in-out;
    text-align: center;
}

.board-item:before {
    content: '';
    float: left;
    padding-top: 100%;
}

.board-item:hover {
    background-color: #345995;
    color: #fffd82;
}

.settings-restart {
    display: block;
    margin: 5px auto;
    border-radius: 5px;
    outline: none;
    border: none;
    color: white;
    font-size: 18px;
    padding: 5px 5px;
    background-color: #2d3047;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.settings-restart:hover {
    background-color: #345995;
}
</style>
