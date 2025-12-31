/**
 * Animation controller
 * SOLID: Single Responsibility - Only handles animation playback
 */
export class AnimationController {
    constructor(visualizer) {
        this.state = 'idle';
        this.steps = [];
        this.currentStepIndex = 0;
        this.animationId = null;
        this.speed = 3; // 1 (slowest) to 5 (fastest)
        this.visualizer = visualizer;
        
        // Callbacks
        this.onStepChange = null;
        this.onComplete = null;
        this.onStateChange = null;
    }
    
    /**
     * Load steps for animation
     */
    loadSteps(steps) {
        this.steps = steps;
        this.currentStepIndex = 0;
        this.state = 'idle';
        
        if (steps.length > 0) {
            this.showStep(0);
        }
    }
    
    /**
     * Play animation
     */
    play() {
        if (this.state === 'playing') return;
        
        if (this.state === 'finished') {
            this.reset();
        }
        
        this.state = 'playing';
        this.notifyStateChange();
        this.animate();
    }
    
    /**
     * Pause animation
     */
    pause() {
        if (this.state !== 'playing') return;
        
        this.state = 'paused';
        this.notifyStateChange();
        
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    /**
     * Reset animation to beginning
     */
    reset() {
        this.pause();
        this.currentStepIndex = 0;
        this.state = 'idle';
        this.notifyStateChange();
        
        if (this.steps.length > 0) {
            this.showStep(0);
        }
    }
    
    /**
     * Step forward one frame
     */
    step() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            this.showStep(this.currentStepIndex);
        } else {
            this.finish();
        }
    }
    
    /**
     * Set animation speed (1-5)
     */
    setSpeed(speed) {
        this.speed = Math.max(1, Math.min(5, speed));
    }
    
    /**
     * Get current state
     */
    getState() {
        return this.state;
    }
    
    /**
     * Set step change callback
     */
    onStep(callback) {
        this.onStepChange = callback;
    }
    
    /**
     * Set completion callback
     */
    onFinish(callback) {
        this.onComplete = callback;
    }
    
    /**
     * Set state change callback
     */
    onStateChanged(callback) {
        this.onStateChange = callback;
    }
    
    /**
     * Main animation loop
     */
    animate() {
        if (this.state !== 'playing') return;
        
        const delay = this.getDelay();
        
        setTimeout(() => {
            if (this.state !== 'playing') return;
            
            if (this.currentStepIndex < this.steps.length - 1) {
                this.currentStepIndex++;
                this.showStep(this.currentStepIndex);
                this.animationId = requestAnimationFrame(() => this.animate());
            } else {
                this.finish();
            }
        }, delay);
    }
    
    /**
     * Show specific step
     */
    showStep(index) {
        if (index < 0 || index >= this.steps.length) return;
        
        const step = this.steps[index];
        
        // Update visualization
        this.visualizer.drawArray(step.array, {
            comparing: step.comparing,
            swapping: step.swapping,
            sorted: step.sorted,
            pivot: step.pivot,
            current: step.current
        });
        
        // Notify listeners
        if (this.onStepChange) {
            this.onStepChange(step, index);
        }
    }
    
    /**
     * Finish animation
     */
    finish() {
        this.state = 'finished';
        this.notifyStateChange();
        
        if (this.onComplete) {
            this.onComplete();
        }
    }
    
    /**
     * Notify state change
     */
    notifyStateChange() {
        if (this.onStateChange) {
            this.onStateChange(this.state);
        }
    }
    
    /**
     * Calculate delay based on speed
     */
    getDelay() {
        // Speed 1: 1000ms, Speed 5: 50ms
        const delays = [1000, 500, 250, 100, 50];
        return delays[this.speed - 1];
    }
}

/**
 * Code display manager
 * SOLID: Single Responsibility - Only handles code display
 */
export class CodeDisplayManager {
    constructor(codeElementId, indicatorElementId) {
        const codeEl = document.getElementById(codeElementId);
        const indicatorEl = document.getElementById(indicatorElementId);
        
        if (!codeEl || !indicatorEl) {
            throw new Error('Code display elements not found');
        }
        
        this.codeElement = codeEl;
        this.currentLineIndicator = indicatorEl;
        this.currentLanguage = 'javascript';
    }
    
    /**
     * Display code
     */
    displayCode(code, language) {
        this.codeElement.textContent = code;
        this.codeElement.className = `language-${language}`;
        this.currentLanguage = language;
        this.highlightLine(null);
    }
    
    /**
     * Highlight specific line
     */
    highlightLine(lineNumber) {
        if (lineNumber === null) {
            this.currentLineIndicator.classList.remove('active');
            return;
        }
        
        const lineHeight = parseFloat(getComputedStyle(this.codeElement).lineHeight);
        const top = (lineNumber - 1) * lineHeight;
        
        this.currentLineIndicator.style.top = `${top}px`;
        this.currentLineIndicator.classList.add('active');
    }
    
    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Set language
     */
    setLanguage(language) {
        this.currentLanguage = language;
    }
}
