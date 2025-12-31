# 🎯 Sıralama Algoritmaları Görselleştirici

Modern, interaktif ve eğitici bir web uygulaması ile sıralama algoritmalarını görsel olarak öğrenin!

## 📋 Proje Özeti

Bu proje, temel sıralama algoritmalarının (Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort) çalışma mantığını görsel animasyonlarla anlatan, **SOLID prensiplerine** uygun olarak geliştirilmiş bir web uygulamasıdır.

## ✨ Özellikler

### 🔄 Çoklu Algoritma Desteği
- **Bubble Sort** - Basit karşılaştırmalı sıralama
- **Insertion Sort** - Ekleme ile sıralama
- **Selection Sort** - Seçerek sıralama
- **Merge Sort** - Böl ve fethet yaklaşımı
- **Quick Sort** - Hızlı pivot tabanlı sıralama

### 📊 Veri Yönetimi
- **Dizi Boyutu Ayarlama**: 5-100 eleman arası
- **Veri Tipleri**:
  - Rastgele dizi
  - Ters sıralı dizi
  - Neredeyse sıralı dizi

### 🎬 Animasyon Kontrolü
- ▶️ **Başlat**: Animasyonu oynat
- ⏸️ **Duraklat**: Animasyonu duraklat
- ⏭️ **Adım Adım**: Tek adım ilerle
- ⏹️ **Sıfırla**: Başa dön
- **Hız Kontrolü**: 5 farklı hız seviyesi

### 💻 Çoklu Dil Desteği
Algoritma kodlarını 4 farklı programlama dilinde görüntüleyin:
- JavaScript
- Python
- Java
- C++

### 📈 İstatistikler
- Karşılaştırma sayısı
- Değişim (swap) sayısı
- Toplam adım sayısı
- Zaman karmaşıklığı bilgileri (En İyi, Ortalama, En Kötü)

## 🏗️ Mimari ve SOLID Prensipleri

Bu proje, yazılım mühendisliğinin en iyi pratiklerini takip eder:

### 1️⃣ Single Responsibility Principle (Tek Sorumluluk)
Her sınıf tek bir sorumluluğa sahiptir:
- `CanvasVisualizer`: Sadece görselleştirme
- `DataGenerator`: Sadece veri üretimi
- `AnimationController`: Sadece animasyon kontrolü
- `CodeDisplayManager`: Sadece kod gösterimi

### 2️⃣ Open/Closed Principle (Açık/Kapalı)
Yeni algoritma eklemek için mevcut kodu değiştirmenize gerek yok:
```javascript
// Yeni algoritma eklemek için sadece BaseSortingAlgorithm'ı genişletin
export class HeapSort extends BaseSortingAlgorithm {
    // Implementasyon...
}
```

### 3️⃣ Liskov Substitution Principle (Liskov Yerine Koyma)
Tüm algoritma sınıfları `ISortingAlgorithm` arayüzünü tutarlı şekilde uygular.

### 4️⃣ Interface Segregation Principle (Arayüz Ayırma)
Modüller sadece ihtiyaç duydukları arayüzlere bağımlıdır:
- `ISortingAlgorithm`: Algoritma arayüzü
- `IVisualizer`: Görselleştirme arayüzü
- `IAnimationController`: Animasyon kontrolü arayüzü

### 5️⃣ Dependency Inversion Principle (Bağımlılık Ters Çevirme)
Yüksek seviyeli modüller soyutlamalara bağımlıdır:
```javascript
class Application {
    private algorithms: Map<string, ISortingAlgorithm>; // Soyutlamaya bağımlı
    private visualizer: IVisualizer; // Soyutlamaya bağımlı
}
```

## 📁 Proje Yapısı

```
btk/
├── index.html              # Ana HTML dosyası
├── styles.css              # Tasarım sistemi ve stiller
├── core.js                 # Arayüzler ve temel sınıflar
├── algorithms.js           # Sıralama algoritmaları
├── visualizer.js           # Canvas görselleştirici ve veri üretici
├── controllers.js          # Animasyon ve kod gösterim kontrolcüleri
├── app.js                  # Ana uygulama orkestratörü
└── README.md              # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Modern bir web tarayıcısı (Chrome, Firefox, Edge, Safari)
- Python 3.x (HTTP sunucusu için)

### Adımlar

1. **Projeyi klonlayın veya indirin**
```bash
cd btk
```

2. **HTTP sunucusu başlatın**
```bash
python -m http.server 8000
```

3. **Tarayıcıda açın**
```
http://localhost:8000
```

### Alternatif Sunucu Seçenekleri

**Node.js ile:**
```bash
npx http-server -p 8000
```

**PHP ile:**
```bash
php -S localhost:8000
```

## 🎨 Kullanım

1. **Algoritma Seçin**: Sol panelden bir sıralama algoritması seçin
2. **Veri Oluşturun**: Dizi boyutunu ve tipini ayarlayıp "Yeni Dizi Oluştur" butonuna tıklayın
3. **Animasyonu Başlatın**: Play (▶️) butonuna basarak sıralamayı izleyin
4. **Hızı Ayarlayın**: Animasyon hızını tercihlerinize göre değiştirin
5. **Kodu İnceleyin**: Farklı programlama dillerinde algoritma kodunu görüntüleyin
6. **Adım Adım İlerleyin**: Step (⏭️) butonu ile her adımı detaylı inceleyin

## 🎯 Eğitim Amaçları

Bu uygulama şunları öğrenmenize yardımcı olur:

- ✅ Sıralama algoritmalarının çalışma mantığı
- ✅ Algoritmaların zaman karmaşıklığı analizi
- ✅ Farklı veri setlerinde algoritma performansları
- ✅ SOLID tasarım prensipleri
- ✅ Modern JavaScript/TypeScript geliştirme
- ✅ Canvas API kullanımı
- ✅ Animasyon ve görselleştirme teknikleri

## 🎨 Tasarım Özellikleri

- **Modern Dark Theme**: Göz yormayan karanlık tema
- **Glassmorphism**: Cam efektli modern tasarım
- **Smooth Animations**: Akıcı geçişler ve animasyonlar
- **Responsive Design**: Tüm ekran boyutlarında çalışır
- **Color-Coded Visualization**: Renk kodlu görselleştirme
  - 🟡 Sarı: Karşılaştırılan elemanlar
  - 🔴 Kırmızı: Yer değiştiren elemanlar
  - 🟢 Yeşil: Sıralanmış elemanlar
  - 🟣 Mor: Pivot elemanı
  - 🔵 Mavi: Aktif eleman

## 🔧 Teknik Detaylar

### Teknolojiler
- **HTML5**: Semantik yapı
- **CSS3**: Modern tasarım sistemi
- **JavaScript (ES6+)**: Modüler mimari
- **Canvas API**: Görselleştirme

### Tarayıcı Desteği
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performans
- 60 FPS animasyon hedefi
- Optimize edilmiş canvas rendering
- Efficient step generation
- Memory-conscious design

## 📚 Algoritma Karmaşıklıkları

| Algoritma | En İyi | Ortalama | En Kötü | Alan |
|-----------|--------|----------|---------|------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

## 🚀 Gelecek Geliştirmeler

- [ ] Heap Sort algoritması
- [ ] Radix Sort algoritması
- [ ] Ses efektleri
- [ ] Karşılaştırma modu (iki algoritma yan yana)
- [ ] Özel veri girişi
- [ ] Animasyon kaydı ve paylaşma
- [ ] Daha fazla programlama dili desteği
- [ ] Algoritma açıklamaları ve notlar

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir ve özgürce kullanılabilir.

## 👨‍💻 Geliştirici Notları

### Yeni Algoritma Ekleme

1. `algorithms.js` dosyasında `BaseSortingAlgorithm`'ı genişletin:
```javascript
export class NewSort extends BaseSortingAlgorithm {
    name = 'New Sort';
    
    sort(array) {
        // Implementasyon
    }
    
    getComplexity() {
        // Karmaşıklık bilgileri
    }
    
    getCode(language) {
        // Kod örnekleri
    }
}
```

2. `app.js` dosyasında algoritmanızı kaydedin:
```javascript
private registerAlgorithms(): void {
    // ...
    this.algorithms.set('new', new NewSort());
}
```

3. `index.html` dosyasına buton ekleyin:
```html
<button class="algorithm-btn" data-algorithm="new">
    <span class="btn-icon">🆕</span>
    <span class="btn-text">New Sort</span>
</button>
```

## 🙏 Teşekkürler

Bu proje, algoritmaları öğrenmek isteyen herkes için geliştirilmiştir. Keyifli öğrenmeler!

---

**Not**: Uygulama localhost üzerinde çalışmalıdır çünkü ES6 modülleri file:// protokolü ile çalışmaz.
