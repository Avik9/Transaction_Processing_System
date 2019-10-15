// import AddToNum_Transaction from './AddToNum_Transaction.js'

/**
 * This driver demonstrates simple usage of the jTPS API.
 * 
 * @author Avik Kadakia
 * @version 1.0
 */
class jsTPS_Tester {
    constructor() {
        // HERE'S OUR TRANSACTION PROCESSING SYSTEM
        this.tps = new jsTPS();

        // HERE'S THE DATA WE'RE MANIPULATING IN THIS DEMO
        this.num = new Num();

        this.printer = document.getElementById("display");

        // LOOP FLAG VARIABLE
        this.keepGoing = true;

        // THESE ARE TO HELP WITH I/O
        this.printer.innerHTML += "jsTPS_Tester: <br><br> Current Num: " + this.num.getNum();
        document.getElementById("output").value = "";
    }

    start(){
        document.getElementById("add_button").addEventListener("click", () => this.addToNumTransaction());
        document.getElementById("undo_button").addEventListener("click", () => this.undoTransaction());
        document.getElementById("redo_button").addEventListener("click", () => this.redoTransaction());
        document.getElementById("clear_button").addEventListener("click", () => this.tps.clearAllTransactions());
        document.getElementById("reset_button").addEventListener("click", () => this.reset());
    }

    reset = () => {
        this.tps.clearAllTransactions();

        this.num.setNum(0);

        this.printer.innerHTML = "jsTPS_Tester: <br><br> Current Num: " + this.num.getNum();
    }
   
    addToNumTransaction = () => {
        let entry = document.getElementById("output").value;
        let amountToAdd = parseInt(entry);
        let transaction = new AddToNum_Transaction(this.num, amountToAdd);
        this.tps.addTransaction(transaction);

        this.printer.innerHTML = "jsTPS_Tester: <br><br> Current Num: " + this.num.getNum();
    }

    undoTransaction = () => {
        this.tps.undoTransaction();
        this.printer.innerHTML = "jsTPS_Tester: <br><br> Current Num: " + this.num.getNum();
    }

    redoTransaction = () => {
        this.tps.doTransaction();
        this.printer.innerHTML = "jsTPS_Tester: <br><br> Current Num: " + this.num.getNum();
    }
}