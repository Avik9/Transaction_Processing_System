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

