(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Animate language bars
  const bars = document.querySelectorAll(".bar > span[data-width]");
  if (bars.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.style.transition = "width .9s ease";
          el.style.width = el.getAttribute("data-width") || "0%";
          io.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );
    bars.forEach((b) => io.observe(b));
  }

  // Copy email
  const copyBtn = document.querySelector("[data-copy-email]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-copy-email");
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Kopierat ✓";
        setTimeout(() => (copyBtn.textContent = "Kopiera"), 1400);
      } catch {
        alert("Kunde inte kopiera. Markera och kopiera manuellt.");
      }
    });
  }

  // Theme toggle (saved)
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const saved = localStorage.getItem("cv_theme");
  if (saved === "dark") document.body.classList.add("dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "cv_theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  // Print button
  const printBtn = document.querySelector("[data-print]");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      document.querySelectorAll(".bar > span[data-width]").forEach((el) => {
        el.style.width = el.getAttribute("data-width") || "0%";
      });
      setTimeout(() => window.print(), 150);
    });
  }
})();
