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
        document.getElementById("input_button").addEventListener("click", () => this.calculate());
        this.printer.innerHTML += "jsTPS_Tester: <br><br>";
        document.getElementById("output").value = "";

        // this.run();
    }

    /**
     * This runs our demo program. Note that it presents a 
     * menu, retrieves the input, and executes the selected
     * behavior.
     * 
     * @param args Not used in this demo.
     */
    menu() {
        document.getElementById("input_button").addEventListener("click", () => this.calculate());

        // DISPLAY THE CURRENT TPS
        this.printer.innerHTML += "CURRENT jsTPS: <br>";
        this.printer.innerHTML += this.tps.toString();

        // DISPLAY NUM
        this.printer.innerHTML += "<br><br> Num is " + this.num.getNum() + "<br><br>";

        // DISPLAY THE MENU
        this.printer.innerHTML += "ENTER A SELECTION<br>" +
            "1) Add a Transaction<br>" +
            "2) Undo a Transaction<br>" +
            "3) Redo a Transaction<br>" +
            "4) Clear All Transactions<br>" +
            "5) Reset Num and Transactions<br>" +
            "-<br><br>";
    }

    addToNumTransaction() {
        entry = document.getElementById("output").value;
        let amountToAdd = parseInt("5");
        let transaction = new AddToNum_Transaction(this.num, 5);
        this.tps.addTransaction(transaction);

        this.menu();
    }

    calculate() 
    {
        // GET THE USER SELECTION
        let entry = document.getElementById("output").value;

        // ADD AND EXECUTE A TRANSACTION
        if (entry === "1") {
            this.printer.innerHTML += "<br>Enter an amount to add: ";
            document.getElementById("output").value = "";
            document.getElementById("input_button").addEventListener("click", () => this.addToNumTransaction());
            
        }
        // UNDO A TRANSACTION
        else if (entry === "2") {
            this.tps.undoTransaction();
            document.getElementById("output").value = "";
            this.menu();
        }
        // REDO A TRANSACTION
        else if (entry === "3") {
            this.tps.doTransaction();
            document.getElementById("output").value = "";
            this.menu();
        }
        // CLEAR ALL TRANSACTIONS
        else if (entry === "4") {
            this.tps.clearAllTransactions();
            document.getElementById("output").value = "";
            this.menu();
        }
        // CLEAR ALL TRANSACTIONS AND RESET NUM TO 0
        else if (entry === "5") {
            this.tps.clearAllTransactions();
            this.num.setNum(0);
            document.getElementById("output").value = "";
            this.menu();
        }
        // QUIT
        else if (entry.startsWith("Q")) {
            this.printer.innerHTML += "GOODBYE";
        }
        else{
            this.printer.innerHTML += "Please choose another option";
            document.getElementById("output").value = "";
            this.menu();
        }
    }
}