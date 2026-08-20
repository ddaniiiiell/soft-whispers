document.addEventListener("DOMContentLoaded", () => {
  const themes = ["green", "blue", "purple"];
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("archive-theme");
  const initialTheme = themes.includes(savedTheme) ? savedTheme : "green";

  function applyTheme(theme, savePreference = true) {
    if (theme === "green") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }

    if (savePreference) {
      localStorage.setItem("archive-theme", theme);
    }

    if (themeBtn) {
      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
      themeBtn.dataset.currentTheme = theme;
      themeBtn.setAttribute(
        "aria-label",
        `Current theme: ${theme}. Change to ${nextTheme}.`,
      );
      themeBtn.title = `Current theme: ${theme}. Change to ${nextTheme}.`;
    }
  }

  applyTheme(initialTheme, false);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const currentTheme = themeBtn.dataset.currentTheme || "green";
      const nextTheme =
        themes[(themes.indexOf(currentTheme) + 1) % themes.length];
      applyTheme(nextTheme);
    });
  }

  fetch("content.json")
    .then((response) => response.json())
    .then((data) => {
      const bodyId = document.body.id;

      function renderLetterEntries(entries, container, entryType) {
        entries.forEach((entry) => {
          const block = document.createElement("article");
          block.className = `${entryType}-entry`;

          const date = document.createElement("div");
          date.className = `${entryType}-date`;
          date.textContent = entry.date;
          block.appendChild(date);

          const letter = document.createElement("div");
          letter.className = `${entryType}-text`;

          if (entry.greeting) {
            const greeting = document.createElement("p");
            greeting.textContent = entry.greeting;
            letter.appendChild(greeting);
          }

          entry.paragraphs.forEach((paragraphText) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = paragraphText;
            letter.appendChild(paragraph);
          });

          if (entry.signoff?.length) {
            const signoff = document.createElement("div");
            signoff.className = "letter-signoff";
            entry.signoff.forEach((lineText) => {
              const line = document.createElement("span");
              line.textContent = lineText;
              signoff.appendChild(line);
            });
            letter.appendChild(signoff);
          }

          block.appendChild(letter);
          container.appendChild(block);
        });
      }

      if (bodyId === "page-home") {
        document.getElementById("home-title").textContent = data.home.title;

        const subtitleContainer = document.getElementById("home-subtitle");
        data.home.subtitleLines.forEach((line) => {
          const p = document.createElement("div");
          p.textContent = line;
          subtitleContainer.appendChild(p);
        });

        document.getElementById("cta-title").textContent = data.home.cta.title;
        document.getElementById("btn-gallery").textContent =
          data.home.cta.galleryLabel;
        document.getElementById("btn-poems").textContent =
          data.home.cta.poemsLabel;
        document.getElementById("btn-birthday").textContent =
          data.home.cta.birthdayLabel;

        const btnAnniversary = document.getElementById("btn-anniversary");
        btnAnniversary.textContent = data.home.cta.anniversaryLabel;
        btnAnniversary.addEventListener("click", (e) => {
          e.preventDefault();
          /*------
          passcode
          ------*/
          const passcode = prompt("it's time already?");
          if (passcode !== null && passcode.toLowerCase() === "cocoanut") {
            window.location.href = "anniversary.html";
          } else if (passcode !== null) {
            alert("nuh uh not yet");
          }
        });

        const dustContainer = document.createElement("div");
        dustContainer.id = "dust-container";
        document.body.appendChild(dustContainer);
        for (let i = 0; i < 35; i++) {
          const mote = document.createElement("div");
          mote.className = "dust-mote";
          const size = Math.random() * 12 + 12;
          mote.style.fontSize = `${size}px`;
          mote.style.left = `${Math.random() * 100}vw`;
          mote.style.top = `${Math.random() * -100}vh`;
          const fallDuration = Math.random() * 15 + 12; // 12s to 27s
          const swayDuration = Math.random() * 4 + 3; // 3s to 7s
          const delay = Math.random() * -25; // Starts them at different times

          mote.style.animation = `drift ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out infinite alternate`;

          dustContainer.appendChild(mote);
        }
      }
      if (bodyId === "page-gallery") {
        document.getElementById("gallery-title").textContent =
          data.gallery.title;
        document.getElementById("gallery-subtitle").innerHTML =
          data.gallery.subtitle;

        const grid = document.getElementById("gallery-grid");

        data.gallery.items.forEach((item) => {
          const wrapper = document.createElement("div");
          wrapper.className = "gallery-item";
          const coverText = item.coverText || "Click to reveal";

          wrapper.innerHTML = `
                        <div class="gallery-photo-frame">
                            <div class="gallery-overlay">
                                <span class="overlay-text">${coverText}</span>
                            </div>
                            <img src="${item.src}" loading="lazy">
                        </div>
                        <div class="gallery-caption">${item.caption}</div>
                    `;

          const frame = wrapper.querySelector(".gallery-photo-frame");
          const overlay = wrapper.querySelector(".gallery-overlay");

          frame.addEventListener(
            "click",
            () => {
              overlay.classList.add("is-revealed");
            },
            { once: true },
          );

          grid.appendChild(wrapper);
        });
      }
      if (bodyId === "page-poems") {
        document.getElementById("poems-title").textContent = data.poems.title;
        const container = document.getElementById("poems-container");

        data.poems.items.forEach((item) => {
          const block = document.createElement("div");
          block.className = "poem-block";
          const toggle = document.createElement("div");
          toggle.className = "poem-toggle";
          toggle.innerHTML = `
                        <h2 class="poem-title">${item.title}</h2>
                        <span class="poem-toggle-icon">+</span>
                    `;
          const wrapper = document.createElement("div");
          wrapper.className = "poem-body-wrapper";
          const body = document.createElement("div");
          body.className = "poem-body";

          wrapper.appendChild(body);
          block.appendChild(toggle);
          block.appendChild(wrapper);
          container.appendChild(block);
          let hasTyped = false;

          toggle.addEventListener("click", () => {
            const isOpen = wrapper.classList.contains("open");
            const icon = toggle.querySelector(".poem-toggle-icon");

            if (isOpen) {
              wrapper.classList.remove("open");
              icon.style.transform = "rotate(0deg)";
            } else {
              wrapper.classList.add("open");
              icon.style.transform = "rotate(45deg)"; // Rotates the + into an x!
              if (!hasTyped) {
                hasTyped = true;
                typeWriter(item.lines, body);
              }
            }
          });
        });
        function typeWriter(linesArray, containerElement) {
          containerElement.innerHTML = ""; // Clear out any placeholder
  
          let lineIndex = 0;
          let charIndex = 0;
          let currentLineElement = null;

    function clearTypingCursors() {
      containerElement.querySelectorAll(".typing-cursor").forEach((line) => {
        line.classList.remove("typing-cursor");
      });
    }

          function typeNextChar() {
            if (charIndex === 0) {
        clearTypingCursors();
              currentLineElement = document.createElement("div");
              currentLineElement.className = "poem-line";
        currentLineElement.classList.add("typing-cursor");
              containerElement.appendChild(currentLineElement);
            }

            const currentString = linesArray[lineIndex];

            if (charIndex < currentString.length) {
              currentLineElement.textContent += currentString.charAt(charIndex);
              charIndex++;
              setTimeout(typeNextChar, 40); // 40ms per letter (adjust to make it faster/slower)
            } else {
              lineIndex++;
              charIndex = 0;

    if (lineIndex < linesArray.length) {
      setTimeout(typeNextChar, 500); // 500ms pause between lines
    }

    if (lineIndex >= linesArray.length) {
      clearTypingCursors();
    }
            }
          }
          typeNextChar();
        }
      }
      if (bodyId === "page-birthday") {
        document.getElementById("birthday-title").textContent =
          data.birthday.title;
        const container = document.getElementById("birthday-container");
        renderLetterEntries(data.birthday.entries, container, "birthday");
      }
      if (bodyId === "page-anniversary") {
        document.getElementById("anniversary-title").textContent =
          data.anniversary.title;
        const container = document.getElementById("anniversary-container");
        renderLetterEntries(data.anniversary.entries, container, "anniversary");
      }
    })
    .catch((error) => console.error("Error loading content:", error));
});
