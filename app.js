new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed:{
        hasResult (){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame (){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.log = []
        },
        attack(special){
            this.hurt( 'playerLife', 5, 10, true, 'Player', 'Monster', 'player')
            if(this.monsterLife > 0){
                this.hurt( 'monsterLife', 7, 12, special, 'Monster', 'Player', 'monster')
            }
        },
        hurt(prop, min, max, special, source, target, cls) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom (min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} target ${target} with ${hurt}.`, cls)
        },
        cureAndHurt(){
            this.cure( 10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster')
        },
        cure(min, max) {
            const cure = this.getRandom (min, max)
            this.playerLife = Math.min (this.playerLife + cure, 100)
            this.registerLog(`Player win force with ${cure}.`, 'player')
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls){
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value){
            if (value) this.running = false
        }
    }
})