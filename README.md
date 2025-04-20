# 🗺️ Konum Yönetim Uygulaması

Bu proje, kullanıcıların harita üzerinde konum ekleyip bu konumları listeleyebildiği, düzenleyebildiği ve en yakın noktadan başlayarak rota oluşturabildiği bir konum yönetim uygulamasıdır.

## 🚀 Teknolojiler

- [Next.js]
- [Chakra UI]
- [TypeScript]
- [Redux Toolkit]
- [React-Leaflet & Leaflet] Harita bileşenleri için

---

## 📱 Özellikler

### 🧭 Konum Ekleme

- Harita üzerinden konum seçimi (enlem & boylam)
- Konuma isim verme
- Renk seçici ile marker rengi belirleme
- Veriler backend olmadan, tarayıcı belleğinde saklanır (local state)

### 📋 Konum Listeleme

- Kaydedilen tüm konumların listesi
- Marker ikonları, kullanıcı tarafından seçilen renge göre gösterilir
- Marker’a tıklanarak detaylı konum bilgisi görüntülenir
- Konum düzenleme sayfasına yönlendirme

### 🛠️ Konum Düzenleme

- Kayıtlı konum bilgileri güncellenebilir

### 🗺️ Rota Oluşturma

- Harita üzerinde kaydedilen konumlar gösterilir
- Marker renkleri kullanıcının seçimlerine göre görüntülenir
- Tıklanıldığında konum detayları açılır
- Kullanıcının mevcut konumuna göre en yakın noktadan rota başlar (kuş bakışı hesaplama için haversine formülü kullanıldı)

---

bash
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
