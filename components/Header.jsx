import useTheme from "../hooks/useTheme";

export default function Header() {
  const [isDark, setIsDark] = useTheme();
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            document.body.classList.toggle("dark");
            localStorage.setItem("isDark", !isDark);
            setIsDark(JSON.parse(localStorage.getItem("isDark")));
          }}
        >
          <i className={`fa solid fa-${isDark ? "moon" : "sun"}`}></i>
          &nbsp;&nbsp;Dark Mode
        </p>
      </div>
    </header>
  );
}
