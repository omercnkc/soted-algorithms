// ===================================
// Base Class (SOLID: Open/Closed)
// ===================================

/**
 * Base class for sorting algorithms
 */
class BaseSortingAlgorithm {
    constructor() {
        this.name = '';
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }
    
    sort(array) {
        throw new Error('sort() must be implemented by subclass');
    }
    
    getComplexity() {
        throw new Error('getComplexity() must be implemented by subclass');
    }
    
    getCode(language) {
        throw new Error('getCode() must be implemented by subclass');
    }
    
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
    
    swap(array, i, j) {
        [array[i], array[j]] = [array[j], array[i]];
        this.swaps++;
    }
    
    compare() {
        this.comparisons++;
    }
    
    getStatistics() {
        return {
            comparisons: this.comparisons,
            swaps: this.swaps,
            steps: this.steps.length
        };
    }
    
    resetStatistics() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }
}

// ===================================
// Bubble Sort Implementation
// ===================================
class BubbleSort extends BaseSortingAlgorithm {
    constructor() {
        super();
        this.name = 'Bubble Sort';
    }
    
    sort(array) {
        this.resetStatistics();
        const arr = [...array];
        const n = arr.length;
        
        this.addStep(arr, {}, 'Başlangıç durumu', 1);
        
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                this.compare();
                this.addStep(arr, { comparing: [j, j + 1] }, `${arr[j]} ve ${arr[j + 1]} karşılaştırılıyor`, 3);
                
                if (arr[j] > arr[j + 1]) {
                    this.addStep(arr, { swapping: [j, j + 1] }, `${arr[j]} > ${arr[j + 1]}, yer değiştiriliyor`, 4);
                    this.swap(arr, j, j + 1);
                    this.addStep(arr, { current: j + 1 }, 'Yer değiştirildi', 5);
                    swapped = true;
                }
            }
            
            const sorted = Array.from({ length: n - i }, (_, idx) => n - 1 - idx);
            this.addStep(arr, { sorted }, `${i + 1}. geçiş tamamlandı`, 8);
            
            if (!swapped) break;
        }
        
        this.addStep(arr, { sorted: Array.from({ length: n }, (_, i) => i) }, 'Sıralama tamamlandı!', 11);
        return this.steps;
    }
    
    getComplexity() {
        return {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        };
    }
    
    getCode(language) {
        const codes = {
            javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
            python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
            java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
            cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
        };
        return codes[language];
    }
}

// ===================================
// Insertion Sort Implementation
// ===================================
class InsertionSort extends BaseSortingAlgorithm {
    constructor() {
        super();
        this.name = 'Insertion Sort';
    }
    
    sort(array) {
        this.resetStatistics();
        const arr = [...array];
        const n = arr.length;
        
        this.addStep(arr, { sorted: [0] }, 'İlk eleman sıralı kabul edilir', 1);
        
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            
            this.addStep(arr, { current: i }, `Anahtar: ${key}`, 3);
            
            while (j >= 0 && arr[j] > key) {
                this.compare();
                this.addStep(arr, { comparing: [j, i], current: i }, `${arr[j]} > ${key}`, 5);
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
            const sorted = Array.from({ length: i + 1 }, (_, idx) => idx);
            this.addStep(arr, { sorted }, `${key} doğru konuma yerleştirildi`, 8);
        }
        
        this.addStep(arr, { sorted: Array.from({ length: n }, (_, i) => i) }, 'Sıralama tamamlandı!', 10);
        return this.steps;
    }
    
    getComplexity() {
        return {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        };
    }
    
    getCode(language) {
        const codes = {
            javascript: `function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
            python: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
            java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
            cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
        };
        return codes[language];
    }
}

// ===================================
// Selection Sort Implementation
// ===================================
class SelectionSort extends BaseSortingAlgorithm {
    constructor() {
        super();
        this.name = 'Selection Sort';
    }
    
    sort(array) {
        this.resetStatistics();
        const arr = [...array];
        const n = arr.length;
        
        this.addStep(arr, {}, 'Başlangıç durumu', 1);
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            this.addStep(arr, { current: i }, `Minimum aranıyor (başlangıç: ${arr[i]})`, 3);
            
            for (let j = i + 1; j < n; j++) {
                this.compare();
                this.addStep(arr, { comparing: [minIdx, j], current: i }, `${arr[minIdx]} ve ${arr[j]} karşılaştırılıyor`, 5);
                
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    this.addStep(arr, { current: i, pivot: minIdx }, `Yeni minimum: ${arr[minIdx]}`, 6);
                }
            }
            
            if (minIdx !== i) {
                this.addStep(arr, { swapping: [i, minIdx] }, `${arr[i]} ve ${arr[minIdx]} yer değiştiriliyor`, 9);
                this.swap(arr, i, minIdx);
            }
            
            const sorted = Array.from({ length: i + 1 }, (_, idx) => idx);
            this.addStep(arr, { sorted }, `${i + 1}. eleman yerleştirildi`, 11);
        }
        
        this.addStep(arr, { sorted: Array.from({ length: n }, (_, i) => i) }, 'Sıralama tamamlandı!', 13);
        return this.steps;
    }
    
    getComplexity() {
        return {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        };
    }
    
    getCode(language) {
        const codes = {
            javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}`,
            python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
            java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
            cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}`
        };
        return codes[language];
    }
}

// ===================================
// Merge Sort Implementation
// ===================================
class MergeSort extends BaseSortingAlgorithm {
    constructor() {
        super();
        this.name = 'Merge Sort';
    }
    
    sort(array) {
        this.resetStatistics();
        const arr = [...array];
        
        this.addStep(arr, {}, 'Başlangıç durumu', 1);
        this.mergeSort(arr, 0, arr.length - 1);
        this.addStep(arr, { sorted: Array.from({ length: arr.length }, (_, i) => i) }, 'Sıralama tamamlandı!', 20);
        
        return this.steps;
    }
    
    mergeSort(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            this.addStep(arr, { comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i) }, 
                `Bölünüyor: [${left}..${mid}] ve [${mid + 1}..${right}]`, 4);
            
            this.mergeSort(arr, left, mid);
            this.mergeSort(arr, mid + 1, right);
            this.merge(arr, left, mid, right);
        }
    }
    
    merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            this.compare();
            this.addStep(arr, { comparing: [left + i, mid + 1 + j] }, 
                `Birleştiriliyor: ${leftArr[i]} ve ${rightArr[j]}`, 12);
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
        
        const merged = Array.from({ length: right - left + 1 }, (_, idx) => left + idx);
        this.addStep(arr, { sorted: merged }, `Birleştirildi: [${left}..${right}]`, 18);
    }
    
    getComplexity() {
        return {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(n)'
        };
    }
    
    getCode(language) {
        const codes = {
            javascript: `function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
    return arr;
}

function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
}`,
            python: `def merge_sort(arr, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    if left < right:
        mid = (left + right) // 2
        merge_sort(arr, left, mid)
        merge_sort(arr, mid + 1, right)
        merge(arr, left, mid, right)
    return arr

def merge(arr, left, mid, right):
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1`,
            java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int[] leftArr = new int[n1];
    int[] rightArr = new int[n2];
    
    System.arraycopy(arr, left, leftArr, 0, n1);
    System.arraycopy(arr, mid + 1, rightArr, 0, n2);
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < n1) arr[k++] = leftArr[i++];
    while (j < n2) arr[k++] = rightArr[j++];
}`,
            cpp: `void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int leftArr[n1], rightArr[n2];
    
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < n1) arr[k++] = leftArr[i++];
    while (j < n2) arr[k++] = rightArr[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`
        };
        return codes[language];
    }
}

// ===================================
// Quick Sort Implementation
// ===================================
class QuickSort extends BaseSortingAlgorithm {
    constructor() {
        super();
        this.name = 'Quick Sort';
    }
    
    sort(array) {
        this.resetStatistics();
        const arr = [...array];
        
        this.addStep(arr, {}, 'Başlangıç durumu', 1);
        this.quickSort(arr, 0, arr.length - 1);
        this.addStep(arr, { sorted: Array.from({ length: arr.length }, (_, i) => i) }, 'Sıralama tamamlandı!', 15);
        
        return this.steps;
    }
    
    quickSort(arr, low, high) {
        if (low < high) {
            const pi = this.partition(arr, low, high);
            
            this.quickSort(arr, low, pi - 1);
            this.quickSort(arr, pi + 1, high);
        }
    }
    
    partition(arr, low, high) {
        const pivot = arr[high];
        this.addStep(arr, { pivot: high }, `Pivot: ${pivot}`, 7);
        
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            this.compare();
            this.addStep(arr, { comparing: [j, high], pivot: high }, 
                `${arr[j]} ile pivot ${pivot} karşılaştırılıyor`, 10);
            
            if (arr[j] < pivot) {
                i++;
                if (i !== j) {
                    this.addStep(arr, { swapping: [i, j], pivot: high }, 
                        `${arr[i]} ve ${arr[j]} yer değiştiriliyor`, 11);
                    this.swap(arr, i, j);
                }
            }
        }
        
        this.addStep(arr, { swapping: [i + 1, high] }, 
            `Pivot ${pivot} doğru konuma yerleştiriliyor`, 14);
        this.swap(arr, i + 1, high);
        
        return i + 1;
    }
    
    getComplexity() {
        return {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)',
            space: 'O(log n)'
        };
    }
    
    getCode(language) {
        const codes = {
            javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
            python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
            java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
            cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
        };
        return codes[language];
    }
}

// ===================================
// Canvas Visualizer
// ===================================
class CanvasVisualizer {
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
    
    resize() {
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
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
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
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

// ===================================
// Data Generator
// ===================================
class DataGenerator {
    static random(size, min = 1, max = 100) {
        return Array.from({ length: size }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }
    
    static reversed(size, min = 1, max = 100) {
        const step = (max - min) / (size - 1);
        return Array.from({ length: size }, (_, i) => 
            Math.round(max - i * step)
        );
    }
    
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

// ===================================
// Animation Controller
// ===================================
class AnimationController {
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
    
    loadSteps(steps) {
        this.steps = steps;
        this.currentStepIndex = 0;
        this.state = 'idle';
        
        if (steps.length > 0) {
            this.showStep(0);
        }
    }
    
    play() {
        if (this.state === 'playing') return;
        
        if (this.state === 'finished') {
            this.reset();
        }
        
        this.state = 'playing';
        this.notifyStateChange();
        this.animate();
    }
    
    pause() {
        if (this.state !== 'playing') return;
        
        this.state = 'paused';
        this.notifyStateChange();
        
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    reset() {
        this.pause();
        this.currentStepIndex = 0;
        this.state = 'idle';
        this.notifyStateChange();
        
        if (this.steps.length > 0) {
            this.showStep(0);
        }
    }
    
    step() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            this.showStep(this.currentStepIndex);
        } else {
            this.finish();
        }
    }
    
    setSpeed(speed) {
        this.speed = Math.max(1, Math.min(5, speed));
    }
    
    getState() {
        return this.state;
    }
    
    onStep(callback) {
        this.onStepChange = callback;
    }
    
    onFinish(callback) {
        this.onComplete = callback;
    }
    
    onStateChanged(callback) {
        this.onStateChange = callback;
    }
    
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
    
    finish() {
        this.state = 'finished';
        this.notifyStateChange();
        
        if (this.onComplete) {
            this.onComplete();
        }
    }
    
    notifyStateChange() {
        if (this.onStateChange) {
            this.onStateChange(this.state);
        }
    }
    
    getDelay() {
        // Speed 1: 1000ms, Speed 5: 50ms
        const delays = [1000, 500, 250, 100, 50];
        return delays[this.speed - 1];
    }
}

// ===================================
// Code Display Manager
// ===================================
class CodeDisplayManager {
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
    
    displayCode(code, language) {
        this.codeElement.textContent = code;
        this.codeElement.className = `language-${language}`;
        this.currentLanguage = language;
        this.highlightLine(null);
    }
    
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
    
    getLanguage() {
        return this.currentLanguage;
    }
    
    setLanguage(language) {
        this.currentLanguage = language;
    }
}

// ===================================
// Main Application
// ===================================
class Application {
    constructor() {
        // Algorithm registry
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
    
    registerAlgorithms() {
        this.algorithms.set('bubble', new BubbleSort());
        this.algorithms.set('insertion', new InsertionSort());
        this.algorithms.set('selection', new SelectionSort());
        this.algorithms.set('merge', new MergeSort());
        this.algorithms.set('quick', new QuickSort());
    }
    
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
    
    generateArray() {
        this.currentArray = DataGenerator.generate(this.dataType, this.arraySize);
        this.visualizer.drawArray(this.currentArray);
        this.reset();
    }
    
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
    
    pause() {
        this.animationController.pause();
    }
    
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
    
    reset() {
        this.animationController.reset();
        this.visualizer.drawArray(this.currentArray);
        this.resetStatistics();
        this.codeDisplayManager.highlightLine(null);
    }
    
    updateAlgorithmInfo() {
        const complexity = this.currentAlgorithm.getComplexity();
        
        this.elements.currentAlgorithmTitle.textContent = this.currentAlgorithm.name;
        this.elements.bestCase.textContent = complexity.best;
        this.elements.avgCase.textContent = complexity.average;
        this.elements.worstCase.textContent = complexity.worst;
    }
    
    updateCodeDisplay() {
        const code = this.currentAlgorithm.getCode(this.currentLanguage);
        this.codeDisplayManager.displayCode(code, this.currentLanguage);
    }
    
    updateStatistics(stats) {
        this.elements.comparisonsDisplay.textContent = stats.comparisons.toString();
        this.elements.swapsDisplay.textContent = stats.swaps.toString();
        this.elements.stepsDisplay.textContent = '0';
    }
    
    resetStatistics() {
        this.elements.comparisonsDisplay.textContent = '0';
        this.elements.swapsDisplay.textContent = '0';
        this.elements.stepsDisplay.textContent = '0';
    }
    
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
    
    setActiveButton(buttons, activeButton) {
        buttons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Application();
});
