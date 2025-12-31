import { BaseSortingAlgorithm } from './core.js';

// ===================================
// Bubble Sort Implementation
// ===================================
export class BubbleSort extends BaseSortingAlgorithm {
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
export class InsertionSort extends BaseSortingAlgorithm {
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
export class SelectionSort extends BaseSortingAlgorithm {
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
export class MergeSort extends BaseSortingAlgorithm {
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
export class QuickSort extends BaseSortingAlgorithm {
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
