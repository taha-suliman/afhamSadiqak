import { useState } from "react";

export default function Settings({ playerName, setPlayerName, roomId, setRoomId }) {
  const [name, setName] = useState(playerName);
  const [room, setRoom] = useState(roomId);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setPlayerName(name || "اللاعب");
    setRoomId(room.trim());
    localStorage.setItem("uf_player", name || "اللاعب");
    localStorage.setItem("uf_room", room.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => {
    if (!confirm("هل تريد إعادة التعيين؟")) return;
    setName("اللاعب");
    setRoom("");
    setPlayerName("اللاعب");
    setRoomId("");
    localStorage.clear();
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold text-slate-300">⚙️ الإعدادات</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-white/60 text-sm mb-2">اسمك في اللعبة</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: أحمد"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-400 transition-colors text-right"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">كود الغرفة (للعب مع الأصدقاء)</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="مثال: room123"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-400 transition-colors"
            dir="ltr"
          />
          <p className="text-white/30 text-xs mt-1">
            شارك نفس الكود مع أصدقائك لمشاركة الإجابات والنقاط
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={save}
          className={`flex-1 font-bold py-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-violet-500 hover:bg-violet-400 text-white"
          }`}
        >
          {saved ? "✅ تم الحفظ!" : "💾 حفظ"}
        </button>
        <button
          onClick={reset}
          className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-300 font-bold py-3 px-5 rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          🔄 إعادة
        </button>
      </div>

      {/* Firebase Setup Guide */}
      {/* <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 space-y-2">
        <p className="text-orange-300 font-bold text-sm">🔥 إعداد Firebase</p>
        <ol className="text-white/50 text-xs space-y-1 list-decimal list-inside">
          <li>روح على console.firebase.google.com</li>
          <li>أنشئ مشروع جديد وأضف Web App</li>
          <li>فعّل Realtime Database في test mode</li>
          <li>انسخ الـ config وضعه في <code className="text-orange-300">src/firebase/config.js</code></li>
          <li>نفّذ: <code className="text-orange-300">npm install firebase</code></li>
        </ol>
      </div> */}

      <div className="text-white/20 text-xs text-center">نسخة 1.0 — افهم صديقك 🎮</div>
    </div>
  );
}



