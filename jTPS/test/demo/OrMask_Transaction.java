package demo;

import jtps.jTPS_Transaction;

/**
 *
 * @author McKillaGorilla
 */
public class OrMask_Transaction implements jTPS_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE
    private Num num;
    
    private int intNum;
    
    // AMOUNT TO MASK FOR NUM
    private int mask;

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    public OrMask_Transaction(Num initNum, int initIntNum, int initMask) {
        // KEEP THESE FOR LATER
        num = initNum;
        intNum = initIntNum;
        mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    @Override
    public void doTransaction() {
        num.orMask(mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    @Override
    public void undoTransaction() {
        num.setNum(intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    @Override
    public String toString() {
        return "Or Mask " + mask;
    }
}