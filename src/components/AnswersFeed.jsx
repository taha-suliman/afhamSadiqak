import { useAnswers } from "../firebase/hooks";

export default function AnswersFeed({ roomId }) {
  const answers = useAnswers(roomId);

  if (!roomId) return null;

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <p className="text-white/50 text-sm">إجابات المجموعة — مباشر</p>
      </div>
      {answers.length === 0 ? (
        <p className="text-white/20 text-sm text-center py-4">في انتظار إجابات...</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {answers.slice(0, 10).map((a) => (
            <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-sm font-medium">{a.playerName}</span>
                <span className="text-white/30 text-xs">{a.gameType}</span>
              </div>
              <p className="text-white/40 text-xs mt-0.5 truncate">{a.question}</p>
              <p className="text-white font-medium mt-1">{a.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}