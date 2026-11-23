// Llave del tema en LocalStorage
const THEME_KEY = "theme"
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

// Íconos del botón (luna para activar oscuro, sol para activar claro)
const THEME_ICONS = {
    dark: `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
        </svg>
    `,
    light: `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
        </svg>
    `
}

// Tema guardado o, si no existe, el del sistema operativo
function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === "light" || saved === "dark" ? saved : null
}

function getPreferredTheme() {
    return getSavedTheme() || (darkQuery.matches ? "dark" : "light")
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme
}

// El botón muestra el ícono del tema al que se va a cambiar
function updateThemeButton(button, theme) {
    const nextTheme = theme === "dark" ? "light" : "dark"
    const label = nextTheme === "dark" ? "Activar tema oscuro" : "Activar tema claro"

    button.innerHTML = THEME_ICONS[nextTheme]
    button.setAttribute("aria-label", label)
    button.setAttribute("title", label)
    button.setAttribute("aria-pressed", theme === "dark")
}

// Aplicamos el tema antes de pintar la página para evitar parpadeos
applyTheme(getPreferredTheme())

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle")
    if (!themeToggle) return

    updateThemeButton(themeToggle, getPreferredTheme())

    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.dataset.theme
        const nextTheme = current === "dark" ? "light" : "dark"

        localStorage.setItem(THEME_KEY, nextTheme)
        applyTheme(nextTheme)
        updateThemeButton(themeToggle, nextTheme)
    })

    // Si el usuario no ha elegido un tema, seguimos los cambios del sistema
    darkQuery.addEventListener("change", () => {
        if (getSavedTheme()) return

        const systemTheme = getPreferredTheme()
        applyTheme(systemTheme)
        updateThemeButton(themeToggle, systemTheme)
    })
})
