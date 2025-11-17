export default function AnswerFeedback({ likes, dislikes, onLike, onDislike }) {
  return (
    <div className="flex items-center gap-3 mt-2 text-sm">
      <button
        onClick={onLike}
        className="px-2 py-1 rounded bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300"
      >
        👍 {likes}
      </button>
      <button
        onClick={onDislike}
        className="px-2 py-1 rounded bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300"
      >
        👎 {dislikes}
      </button>
    </div>
  );
}
