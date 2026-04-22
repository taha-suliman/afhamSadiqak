# 🎮 افهم صديقك — دليل الإعداد

## 🚀 تشغيل المشروع

```bash
npm install
npm install firebase          # مهم جداً!
npm run dev
```

---

## 🔥 ربط Firebase خطوة بخطوة

### الخطوة 1 — أنشئ مشروع Firebase
1. افتح [console.firebase.google.com](https://console.firebase.google.com)
2. اضغط **"Add project"** / أضف مشروعاً
3. اكتب اسم المشروع مثل `understand-friend`
4. تقدر تعطّل Google Analytics لو مش محتاجها
5. اضغط **"Create project"**

---

### الخطوة 2 — أضف تطبيق ويب
1. من الصفحة الرئيسية للمشروع اضغط على أيقونة **`</>`** (Web)
2. اكتب اسم التطبيق مثل `understand-friend-web`
3. ✅ فعّل **"Also set up Firebase Hosting"** لو عايز تستضيف عليه
4. اضغط **"Register app"**
5. **انسخ الـ `firebaseConfig`** اللي هيظهر — هتحتاجه في الخطوة 4

---

### الخطوة 3 — فعّل Realtime Database
1. من القائمة الجانبية: **Build → Realtime Database**
2. اضغط **"Create Database"**
3. اختر موقع قريب (مثلاً `europe-west1`)
4. اختر **"Start in test mode"** (للتطوير)
5. اضغط **"Enable"**

> ⚠️ **Test mode** يسمح للجميع بالقراءة والكتابة لمدة 30 يوم.
> في الإنتاج غيّر Rules لـ:
> ```json
> {
>   "rules": {
>     "rooms": {
>       "$roomId": {
>         ".read": true,
>         ".write": true
>       }
>     }
>   }
> }
> ```

---

### الخطوة 4 — ضع الـ Config في مشروعك

افتح ملف `src/firebase/config.js` واستبدل الـ placeholder بـ config بتاعك:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",               // من Firebase Console
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app-default-rtdb.firebaseio.com",  // مهم!
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

> 💡 تلاقي الـ config في Firebase Console: **Project Settings → General → Your apps**

---

## 🏠 نظام الغرف

اللعبة تعتمد على **Room ID** — كود مشترك بين الأصدقاء:

```
اللاعب 1 → يدخل كود: "myroom2025"
اللاعب 2 → يدخل نفس الكود: "myroom2025"

النتيجة: إجاباتهم وتصنيفاتهم تظهر عند بعض فوراً ✅
```

**كيف يشتغل في الكود:**
```
Firebase Realtime Database
└── rooms/
    └── myroom2025/
        ├── answers/           ← كل الإجابات
        │   ├── -abc123: { playerName, question, answer, ... }
        │   └── -def456: { ... }
        └── scores/            ← نقاط اللاعبين
            ├── أحمد: { score: 50 }
            └── فاطمة: { score: 30 }
```

---

## 📦 هيكل المشروع

```
src/
├── App.jsx                    # المكون الرئيسي
├── main.jsx                   # نقطة الدخول
├── index.css                  # Tailwind + خط عربي
├── firebase/
│   ├── config.js              # ⚠️ ضع هنا config بتاعك
│   └── hooks.js               # دوال Firebase (read/write)
├── components/
│   ├── TrueFalseGame.jsx      # لعبة صح أم خطأ
│   ├── FillBlankGame.jsx      # لعبة أكمل الجملة
│   ├── GuessNumberGame.jsx    # لعبة خمن الرقم
│   ├── SpeedGame.jsx          # تحدي السرعة
│   ├── Leaderboard.jsx        # التصنيفات (حية)
│   ├── Achievements.jsx       # الإنجازات
│   ├── AnswersFeed.jsx        # بث إجابات المجموعة
│   └── Settings.jsx           # الإعدادات + دليل Firebase
└── data/
    └── gameData.js            # بيانات الأسئلة
```

---

## 🚢 النشر على GitHub Pages

```bash
npm run build
npm run deploy
```

تأكد إن `vite.config.js` فيه `base: '/tahaSuliman.com/'` صح.

---

## 🛠️ متغيرات البيئة (اختياري)

بدل ما تحط الـ config مباشرة في الملف، ممكن تستخدم `.env`:

```env
# .env.local
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_DATABASE_URL=https://...
VITE_FIREBASE_PROJECT_ID=your-project
```

وفي `config.js`:
```js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};
```

> ✅ أضف `.env.local` لـ `.gitignore` حتى لا تظهر مفاتيحك علنياً