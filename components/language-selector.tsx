"use client"

import { useState } from "react"

export function LanguageSelector() {
  const [language, setLanguage] = useState("en")

  return (
    <div className="language-selector">
      <button className={`language-button ${language === "en" ? "active" : ""}`} onClick={() => setLanguage("en")}>
        EN
      </button>
      <button className={`language-button ${language === "bg" ? "active" : ""}`} onClick={() => setLanguage("bg")}>
        BG
      </button>
      <button className={`language-button ${language === "ro" ? "active" : ""}`} onClick={() => setLanguage("ro")}>
        RO
      </button>
    </div>
  )
}
