// ===================================
// Base Class (SOLID: Open/Closed)
// ===================================

/**
 * Base class for sorting algorithms
 * New algorithms extend this class without modifying existing code
 * 
 * @class BaseSortingAlgorithm
 * @property {string} name - Algorithm name
 * @property {Array} steps - Visualization steps
 * @property {number} comparisons - Number of comparisons
 * @property {number} swaps - Number of swaps
 */
export class BaseSortingAlgorithm {
    constructor() {
        this.name = '';
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }
    
    /**
     * Sort the array and return steps
     * @param {number[]} array - Array to sort
     * @returns {Array} Sorting steps
     */
    sort(array) {
        throw new Error('sort() must be implemented by subclass');
    }
    
    /**
     * Get complexity information
     * @returns {Object} Complexity info
     */
    getComplexity() {
        throw new Error('getComplexity() must be implemented by subclass');
    }
    
    /**
     * Get code in specified language
     * @param {string} language - Programming language
     * @returns {string} Code string
     */
    getCode(language) {
        throw new Error('getCode() must be implemented by subclass');
    }
    
    /**
     * Helper method to add a step to the visualization
     * @param {number[]} array - Current array state
     * @param {Object} highlights - Highlight information
     * @param {string} message - Step message
     * @param {number} lineNumber - Code line number
     */
    addStep(array, highlights = {}, message, lineNumber) {
        this.steps.push({
            array: [...array],
            comparing: highlights.comparing,
            swapping: highlights.swapping,
            sorted: highlights.sorted,
            pivot: highlights.pivot,
            current: highlights.current,
            message,
            lineNumber
        });
    }
    
    /**
     * Helper method to swap two elements
     * @param {number[]} array - Array to modify
     * @param {number} i - First index
     * @param {number} j - Second index
     */
    swap(array, i, j) {
        [array[i], array[j]] = [array[j], array[i]];
        this.swaps++;
    }
    
    /**
     * Helper method to increment comparison counter
     */
    compare() {
        this.comparisons++;
    }
    
    /**
     * Get statistics
     * @returns {Object} Statistics object
     */
    getStatistics() {
        return {
            comparisons: this.comparisons,
            swaps: this.swaps,
            steps: this.steps.length
        };
    }
    
    /**
     * Reset statistics
     */
    resetStatistics() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }
}
