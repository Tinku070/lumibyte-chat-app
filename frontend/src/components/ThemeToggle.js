export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="px-4 py-1 rounded border dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
