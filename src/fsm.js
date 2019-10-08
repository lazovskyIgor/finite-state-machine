class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.stateArray = [];
        this.stateArray.push(config.initial);
        this.stateNumber = 0;
        this.state = config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.stateArray[this.stateNumber];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let flag = false;
        for(let key in this.config.states) {
            if(key == state)  flag = true;
        }    
        if(flag == false) throw Error("");
        this.state = state;
        this.stateNumber++;
        this.stateArray[this.stateNumber] = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let flag = false;
        for(let key in this.config.states[this.state].transitions) {
            if(key == event)  flag = true;
        }    
        if(flag == false) throw Error("");        

        this.state = this.config.states[this.state].transitions[event];

        this.stateNumber++;
        this.stateArray[this.stateNumber] = this.state;
        console.log(this.stateArray[this.stateNumber]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stateArray[0] = this.config.initial;
        this.stateNumber = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let tempArr = [];
        for(let key in this.config.states) {
            if(this.config.states[key].transitions[event]) {
                tempArr.push(key);
            }
        }
        return event ? tempArr : Object.keys(this.config.states);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.stateNumber > 0) {
            this.stateNumber--;
            this.state = this.stateArray[this.stateNumber];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.stateNumber < this.stateArray.length - 1) {
            this.stateNumber++;
            this.state = this.stateArray[this.stateNumber];
            return true;
        } else  {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.config.initial;
        this.stateArray = [];
        this.stateArray.push(this.state);
        this.stateNumber = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
