'strict mode'

/**
 * jsTPS_Transaction.java
 * 
 * This interface provides the structure that all transactions to be
 * managed by jsTPS must follow. Each transaction must have defined
 * behavior for do and undo. Note that when defining custom transaction
 * classes one needs to make sure the constructor is given the objects
 * it will need to manipulate at the time the do and undo methods
 * are called.
 * 
 * @author Avik Kadakia
 * @version 1.0
 */

class jsTPS_Transaction {

  constructor() {

  }

  /**
  * This method is called by jsTPS when a transaction is executed.
  */
    doTransaction() {
    window.alert('Inheritance did not work and you are printing from the "Interface"');
  }

  /**
  * This method is called by jTPS when a transaction is undone.
  */
    undoTransaction () {
    window.alert('Inheritance did not work and you are printing from the "Interface"');
  }
}


/**
 * jsTPS.js
 * 
 * This class is used for managing an abstract transaction processing
 * system for the purpose of managing an undo/redo system for an
 * application. Note that one must specify all work done via custom
 * transactions.
 *
 */
class jsTPS{

  constructor()
  {
      // THE TRANSACTION STACK
      this.transactions = [];

      // KEEPS TRACK OF WHERE WE ARE IN THE STACK, THUS AFFECTING WHAT
      // TRANSACTION MAY BE DONE OR UNDONE AT ANY GIVEN TIME
      this.mostRecentTransaction = -1;

      // THESE VARIABLES CAN BE TURNED ON AND OFF TO SIGNAL THAT
      // DO AND UNDO OPERATIONS ARE BEING PERFORMED
      this.performingDo = false;
      this.performingUndo = false;
  }

  /**
   * Tests to see if the do (i.e. redo) operation is currently being
   * performed. If it is, true is returned, if not, false.
   * 
   * @return true if the do (i.e. redo) operation is currently in the
   * process of executing, false otherwise.
   */
  isPerformingDo()
  {
      return this.performingDo;
  }

  /**
   * Tests to see if the undo operation is currently being
   * performed. If it is, true is returned, if not, false.
   * 
   * @return true if the undo operation is currently in the
   * process of executing, false otherwise.
   */
  isPerformingUndo()
  {
      return this.performingUndo;
  }

  /**
   * This function adds the transaction argument to the top of
   * the transaction processing system stack and then executes it. Note that it does
   * When this method has completed transaction will be at the top 
   * of the stack, it will have been completed, and the counter have
   * been moved accordingly.
   * 
   * @param transaction The custom transaction to be added to
   * the transaction processing system stack and executed.
   */
  addTransaction(transaction)
  {
      // ARE THERE OLD UNDONE TRANSACTIONS ON THE STACK THAT FIRST
      // NEED TO BE CLEARED OUT, i.e. ARE WE BRANCHING?
      if((this.mostRecentTransaction < 0) || ((this.mostRecentTransaction) < (this.transactions.length - 1)))
      {
          for(let i = this.transactions.length - 1; i > this.mostRecentTransaction; i--)
          {
              this.transactions.slice(i);
          }
      }

      // AND NOW ADD THE TRANSACTION
      this.transactions.push(transaction);

      // AND EXECUTE IT
      this.doTransaction(); 
  }
   
  /**
   * This function executes the transaction at the location of the counter,
   * then moving the TPS counter. Note that this may be the transaction
   * at the top of the TPS stack or somewhere in the middle (i.e. a redo).
   */
  
  doTransaction() {
      if (this.hasTransactionToRedo()) {
          this.performingDo = true;
          let transaction = this.transactions[this.mostRecentTransaction+1];
          transaction.doTransaction();
          this.mostRecentTransaction++;
          this.performingDo = false;
      }
  }

  /**
   * This function gets the most recently executed transaction on the 
   * TPS stack and undoes it, moving the TPS counter accordingly.
   */
  undoTransaction() {
      if (this.hasTransactionToUndo()) {
          this.performingUndo = true;
          let transaction = this.transactions[this.mostRecentTransaction];
          transaction.undoTransaction();
          this.mostRecentTransaction--;
          this.performingUndo = false;
      }
  }

  /**
   * This method clears all transactions from the TPS stack
   * and resets the counter that keeps track of the location
   * of the top of the stack.
   */
  clearAllTransactions() {
      // REMOVE ALL THE TRANSACTIONS
      this.transactions = [];
      
      // MAKE SURE TO RESET THE LOCATION OF THE
      // TOP OF THE TPS STACK TOO
      this.mostRecentTransaction = -1;        
  }

  /**
   * Accessor method that returns the number of transactions currently
   * on the transaction stack. This includes those that may have been
   * done, undone, and redone.
   * 
   * @return The number of transactions currently in the transaction stack.
   */
  getSize() {
      return this.transactions.length;
  }

  /**
   * Accessor method that returns the number of transactions currently
   * on the transaction stack. This includes those that may have been
   * done, undone, and redone.
   * 
   * @return The number of transactions currently in the transaction stack.
   */
  getNumTrasactionsToUndo() {
    return this.mostRecentTransaction + 1;
}

  /**
   * This method returns the number of transactions currently in the
   * transaction stack that can be redone, meaning they have been added
   * and done, and then undone.
   * 
   * @return The number of transactions in the stack that can be redone.
   */
  getRedoSize() {
      return this.getSize() - this.mostRecentTransaction - 1;
  }

  /**
   * This method returns the number of transactions currently in the 
   * transaction stack that can be undone.
   * 
   * @return The number of transactions in the transaction stack that
   * can be undone.
   */
  getUndoSize() {
      return this.mostRecentTransaction + 1;
  }

  /**
   * This method tests to see if there is a transaction on the stack that
   * can be undone at the time this function is called.
   * 
   * @return true if an undo operation is possible, false otherwise.
   */
  hasTransactionToUndo() {
      return this.mostRecentTransaction >= 0;
  }

  /**
   * This method tests to see if there is a transaction on the stack that
   * can be redone at the time this function is called.
   * 
   * @return true if a redo operation is possible, false otherwise.
   */
  hasTransactionToRedo() {
      return this.mostRecentTransaction < (this.getSize()-1);
  }

  /**
   * This method builds and returns a textual summary of the current
   * Transaction Processing System, this includes the toString of
   * each transaction in the stack.
   * 
   * @return A textual summary of the TPS.
   */
  toString() {
      let text = "--Number of Transactions: " + this.getSize() + "<br>";
      text += "--Current Index on Stack: " + this.mostRecentTransaction + "<br>";
      text += "--Current Transaction Stack:<br>";
      for (let i = 0; i <= this.mostRecentTransaction; i++) {
          let jT = this.transactions.get(i);
          text += "----" + jT.toString() + "<br>";
      }
      return text;
  }
}