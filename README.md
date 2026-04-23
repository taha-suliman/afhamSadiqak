# 🎮 افهم صحبك

لعبة أسئلة جماعية لحظية — React 19 + Firebase 12 + Tailwind v4

## 🚀 تشغيل المشروع محلياً

```bash
npm install
npm run dev
```

ثم افتح: `http://localhost:5173`

## 🔥 إعداد Firebase (مرة واحدة)

### 1. Authentication
Firebase Console → Authentication → Sign-in method → فعّل **Google**

### 2. Realtime Database Rules
Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "rooms": {
      "$roomCode": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

## 🌐 Deploy على GitHub Pages

```bash
npm run build
npm run deploy
```

اللعبة هتكون على: `https://taha-suliman.github.io/afhamSadiqak`

## ⚠️ مهم لـ GitHub Pages + Firebase Auth

في Firebase Console → Authentication → Settings → Authorized domains
أضف: `taha-suliman.github.io`

## 📦 التقنيات

| التقنية | الإصدار |
|---------|---------|
| React | 19 |
| Vite | 7 |
| Tailwind CSS | 4 (via @tailwindcss/vite) |
| Firebase | 12 |
| React Router DOM | 7 |

## 🎮 كيفية اللعب

1. سجّل دخولك بحساب جوجل
2. أنشئ غرفة أو انضم بالكود
3. شارك الكود مع أصدقائك
4. الحكم يطرح الأسئلة ويمنح النقاط
5. الفائز صاحب أعلى نقاط!
