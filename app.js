import { BubbleSort, InsertionSort, SelectionSort, MergeSort, QuickSort } from './algorithms.js';
import { CanvasVisualizer, DataGenerator } from './visualizer.js';
import { AnimationController, CodeDisplayManager } from './controllers.js';

/**
 * Main Application Controller
 * SOLID: Dependency Inversion - Depends on abstractions not concrete implementations
 */
class Application {
    constructor() {
        // Algorithm registry (SOLID: Open/Closed - Easy to add new algorithms)
        this.algorithms = new Map();
        this.registerAlgorithms();
        this.currentAlgorithm = this.algorithms.get('bubble');
        
        // Core components
        this.visualizer = new CanvasVisualizer('visualization-canvas');
        this.animationController = new AnimationController(this.visualizer);
        this.codeDisplayManager = new CodeDisplayManager('code-display', 'current-line');
        
        // State
        this.currentArray = [];
        this.arraySize = 20;
        this.dataType = 'random';
        this.currentLanguage = 'javascript';
        
        // Get UI elements
        this.elements = this.getUIElements();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup animation callbacks
        this.setupAnimationCallbacks();
        
        // Initialize
        this.generateArray();
        this.updateAlgorithmInfo();
        this.updateCodeDisplay();
    }
    
    /**
     * Register all available algorithms
     */
    registerAlgorithms() {
        this.algorithms.set('bubble', new BubbleSort());
        this.algorithms.set('insertion', new InsertionSort());
        this.algorithms.set('selection', new SelectionSort());
        this.algorithms.set('merge', new MergeSort());
        this.algorithms.set('quick', new QuickSort());
    }
    
    /**
     * Get all UI elements
     */
    getUIElements() {
        return {
            algorithmButtons: document.querySelectorAll('.algorithm-btn'),
            arraySizeSlider: document.getElementById('array-size'),
            sizeValueDisplay: document.getElementById('size-value'),
            dataTypeButtons: document.querySelectorAll('.control-btn[data-type]'),
            generateButton: document.getElementById('generate-array'),
            speedSlider: document.getElementById('animation-speed'),
            speedValueDisplay: document.getElementById('speed-value'),
            playButton: document.getElementById('play-btn'),
            pauseButton: document.getElementById('pause-btn'),
            stepButton: document.getElementById('step-btn'),
            resetButton: document.getElementById('reset-btn'),
            languageButtons: document.querySelectorAll('.lang-btn'),
            toggleCodeButton: document.getElementById('toggle-code'),
            codeContent: document.getElementById('code-content'),
            currentAlgorithmTitle: document.getElementById('current-algorithm'),
            bestCase: document.getElementById('best-case'),
            avgCase: document.getElementById('avg-case'),
            worstCase: document.getElementById('worst-case'),
            comparisonsDisplay: document.getElementById('comparisons'),
            swapsDisplay: document.getElementById('swaps'),
            stepsDisplay: document.getElementById('steps')
        };
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Algorithm selection
        this.elements.algorithmButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const algorithm = btn.dataset.algorithm;
                if (algorithm) {
                    this.selectAlgorithm(algorithm);
                }
            });
        });
        
        // Array size
        this.elements.arraySizeSlider.addEventListener('input', (e) => {
            const target = e.target;
            this.arraySize = parseInt(target.value);
            this.elements.sizeValueDisplay.textContent = target.value;
        });
        
        this.elements.arraySizeSlider.addEventListener('change', () => {
            this.generateArray();
        });
        
        // Data type
        this.elements.dataTypeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                if (type) {
                    this.dataType = type;
                    this.setActiveButton(this.elements.dataTypeButtons, btn);
                    this.generateArray();
                }
            });
        });
        
        // Generate array
        this.elements.generateButton.addEventListener('click', () => {
            this.generateArray();
        });
        
        // Animation speed
        this.elements.speedSlider.addEventListener('input', (e) => {
            const target = e.target;
            const speed = parseInt(target.value);
            this.animationController.setSpeed(speed);
            
            const speedLabels = ['Çok Yavaş', 'Yavaş', 'Orta', 'Hızlı', 'Çok Hızlı'];
            this.elements.speedValueDisplay.textContent = speedLabels[speed - 1];
        });
        
        // Playback controls
        this.elements.playButton.addEventListener('click', () => {
            this.play();
        });
        
        this.elements.pauseButton.addEventListener('click', () => {
            this.pause();
        });
        
        this.elements.stepButton.addEventListener('click', () => {
            this.step();
        });
        
        this.elements.resetButton.addEventListener('click', () => {
            this.reset();
        });
        
        // Language selection
        this.elements.languageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang) {
                    this.currentLanguage = lang;
                    this.setActiveButton(this.elements.languageButtons, btn);
                    this.updateCodeDisplay();
                }
            });
        });
        
        // Toggle code display
        this.elements.toggleCodeButton.addEventListener('click', () => {
            this.elements.codeContent.classList.toggle('hidden');
        });
    }
    
    /**
     * Setup animation callbacks
     */
    setupAnimationCallbacks() {
        this.animationController.onStep((step, index) => {
            // Update step counter
            this.elements.stepsDisplay.textContent = (index + 1).toString();
            
            // Highlight code line
            if (step.lineNumber) {
                this.codeDisplayManager.highlightLine(step.lineNumber);
            }
        });
        
        this.animationController.onFinish(() => {
            this.updatePlaybackButtons('finished');
        });
        
        this.animationController.onStateChanged((state) => {
            this.updatePlaybackButtons(state);
        });
    }
    
    /**
     * Select algorithm
     */
    selectAlgorithm(algorithmKey) {
        const algorithm = this.algorithms.get(algorithmKey);
        if (!algorithm) return;
        
        this.currentAlgorithm = algorithm;
        
        // Update active button
        this.elements.algorithmButtons.forEach(btn => {
            if (btn.dataset.algorithm === algorithmKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Reset animation
        this.reset();
        
        // Update displays
        this.updateAlgorithmInfo();
        this.updateCodeDisplay();
    }
    
    /**
     * Generate new array
     */
    generateArray() {
        this.currentArray = DataGenerator.generate(this.dataType, this.arraySize);
        this.visualizer.drawArray(this.currentArray);
        this.reset();
    }
    
    /**
     * Start sorting animation
     */
    play() {
        const state = this.animationController.getState();
        
        if (state === 'idle') {
            // Generate steps
            const steps = this.currentAlgorithm.sort([...this.currentArray]);
            this.animationController.loadSteps(steps);
            
            // Update statistics
            const stats = this.currentAlgorithm.getStatistics();
            this.updateStatistics(stats);
        }
        
        this.animationController.play();
    }
    
    /**
     * Pause animation
     */
    pause() {
        this.animationController.pause();
    }
    
    /**
     * Step forward
     */
    step() {
        const state = this.animationController.getState();
        
        if (state === 'idle') {
            // Generate steps
            const steps = this.currentAlgorithm.sort([...this.currentArray]);
            this.animationController.loadSteps(steps);
            
            // Update statistics
            const stats = this.currentAlgorithm.getStatistics();
            this.updateStatistics(stats);
        }
        
        this.animationController.step();
    }
    
    /**
     * Reset animation
     */
    reset() {
        this.animationController.reset();
        this.visualizer.drawArray(this.currentArray);
        this.resetStatistics();
        this.codeDisplayManager.highlightLine(null);
    }
    
    /**
     * Update algorithm information display
     */
    updateAlgorithmInfo() {
        const complexity = this.currentAlgorithm.getComplexity();
        
        this.elements.currentAlgorithmTitle.textContent = this.currentAlgorithm.name;
        this.elements.bestCase.textContent = complexity.best;
        this.elements.avgCase.textContent = complexity.average;
        this.elements.worstCase.textContent = complexity.worst;
    }
    
    /**
     * Update code display
     */
    updateCodeDisplay() {
        const code = this.currentAlgorithm.getCode(this.currentLanguage);
        this.codeDisplayManager.displayCode(code, this.currentLanguage);
    }
    
    /**
     * Update statistics display
     */
    updateStatistics(stats) {
        this.elements.comparisonsDisplay.textContent = stats.comparisons.toString();
        this.elements.swapsDisplay.textContent = stats.swaps.toString();
        this.elements.stepsDisplay.textContent = '0';
    }
    
    /**
     * Reset statistics display
     */
    resetStatistics() {
        this.elements.comparisonsDisplay.textContent = '0';
        this.elements.swapsDisplay.textContent = '0';
        this.elements.stepsDisplay.textContent = '0';
    }
    
    /**
     * Update playback button states
     */
    updatePlaybackButtons(state) {
        switch (state) {
            case 'idle':
                this.elements.playButton.disabled = false;
                this.elements.pauseButton.disabled = true;
                this.elements.stepButton.disabled = false;
                this.elements.resetButton.disabled = true;
                break;
            case 'playing':
                this.elements.playButton.disabled = true;
                this.elements.pauseButton.disabled = false;
                this.elements.stepButton.disabled = true;
                this.elements.resetButton.disabled = false;
                break;
            case 'paused':
                this.elements.playButton.disabled = false;
                this.elements.pauseButton.disabled = true;
                this.elements.stepButton.disabled = false;
                this.elements.resetButton.disabled = false;
                break;
            case 'finished':
                this.elements.playButton.disabled = false;
                this.elements.pauseButton.disabled = true;
                this.elements.stepButton.disabled = true;
                this.elements.resetButton.disabled = false;
                break;
        }
    }
    
    /**
     * Set active button in a group
     */
    setActiveButton(buttons, activeButton) {
        buttons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Application();
});
