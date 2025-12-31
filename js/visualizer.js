/**
 * Canvas-based visualizer for sorting algorithms
 * SOLID: Single Responsibility - Only handles visualization
 */
export class CanvasVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas with id "${canvasId}" not found`);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.padding = 40;
        
        // Color scheme
        this.colors = {
            default: 'hsl(220, 15%, 75%)',
            comparing: 'hsl(45, 100%, 60%)',
            swapping: 'hsl(0, 84%, 60%)',
            sorted: 'hsl(142, 76%, 56%)',
            pivot: 'hsl(280, 85%, 65%)',
            current: 'hsl(210, 100%, 60%)',
            background: 'transparent'
        };
        
        this.resize();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }
    
    /**
     * Resize canvas to fit container
     */
    resize() {
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    /**
     * Draw the array with optional highlights
     */
    drawArray(array, highlights = {}) {
        this.clear();
        
        if (array.length === 0) return;
        
        const maxValue = Math.max(...array);
        const minValue = Math.min(...array);
        const range = maxValue - minValue || 1;
        
        const barWidth = (this.canvas.width - this.padding * 2) / array.length;
        const maxBarHeight = this.canvas.height - this.padding * 2;
        
        array.forEach((value, index) => {
            const normalizedHeight = ((value - minValue) / range) * maxBarHeight;
            const x = this.padding + index * barWidth;
            const y = this.canvas.height - this.padding - normalizedHeight;
            const height = normalizedHeight;
            
            // Determine bar color based on highlights
            let color = this.colors.default;
            
            if (highlights.sorted?.includes(index)) {
                color = this.colors.sorted;
            } else if (highlights.swapping?.includes(index)) {
                color = this.colors.swapping;
            } else if (highlights.comparing?.includes(index)) {
                color = this.colors.comparing;
            } else if (highlights.pivot === index) {
                color = this.colors.pivot;
            } else if (highlights.current === index) {
                color = this.colors.current;
            }
            
            // Draw bar with gradient
            const gradient = this.ctx.createLinearGradient(x, y, x, y + height);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, this.adjustColorBrightness(color, -20));
            
            this.ctx.fillStyle = gradient;
            
            // Draw rounded rectangle
            this.roundRect(x + 2, y, barWidth - 4, height, 4);
            
            // Add glow effect for highlighted bars
            if (color !== this.colors.default && color !== this.colors.sorted) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = color;
                this.roundRect(x + 2, y, barWidth - 4, height, 4);
                this.ctx.shadowBlur = 0;
            }
            
            // Draw value label for smaller arrays
            if (array.length <= 30) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                this.ctx.font = `${Math.min(barWidth * 0.6, 14)}px 'Inter', sans-serif`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'bottom';
                this.ctx.fillText(
                    value.toString(),
                    x + barWidth / 2,
                    y - 5
                );
            }
        });
    }
    
    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Draw rounded rectangle
     */
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    /**
     * Adjust color brightness
     */
    adjustColorBrightness(color, percent) {
        // Parse HSL color
        const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!hslMatch) return color;
        
        const h = parseInt(hslMatch[1]);
        const s = parseInt(hslMatch[2]);
        let l = parseInt(hslMatch[3]);
        
        l = Math.max(0, Math.min(100, l + percent));
        
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
}

/**
 * Data generator utility
 * SOLID: Single Responsibility - Only handles data generation
 */
export class DataGenerator {
    /**
     * Generate random array
     */
    static random(size, min = 1, max = 100) {
        return Array.from({ length: size }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }
    
    /**
     * Generate reversed (descending) array
     */
    static reversed(size, min = 1, max = 100) {
        const step = (max - min) / (size - 1);
        return Array.from({ length: size }, (_, i) => 
            Math.round(max - i * step)
        );
    }
    
    /**
     * Generate nearly sorted array (90% sorted with some swaps)
     */
    static nearlySorted(size, min = 1, max = 100) {
        const step = (max - min) / (size - 1);
        const arr = Array.from({ length: size }, (_, i) => 
            Math.round(min + i * step)
        );
        
        // Swap 10% of elements randomly
        const swapCount = Math.floor(size * 0.1);
        for (let i = 0; i < swapCount; i++) {
            const idx1 = Math.floor(Math.random() * size);
            const idx2 = Math.floor(Math.random() * size);
            [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        }
        
        return arr;
    }
    
    /**
     * Generate array based on type
     */
    static generate(type, size) {
        switch (type) {
            case 'random':
                return this.random(size);
            case 'reversed':
                return this.reversed(size);
            case 'nearly':
                return this.nearlySorted(size);
            default:
                return this.random(size);
        }
    }
}
