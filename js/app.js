document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            const bodyId = document.body.id;

            // 1. Populate Home Page
            if (bodyId === 'page-home') {
                document.getElementById('home-title').textContent = data.home.title;
                
                const subtitleContainer = document.getElementById('home-subtitle');
                data.home.subtitleLines.forEach(line => {
                    const p = document.createElement('div');
                    p.textContent = line;
                    subtitleContainer.appendChild(p);
                });

                document.getElementById('cta-title').textContent = data.home.cta.title;
                document.getElementById('btn-gallery').textContent = data.home.cta.galleryLabel;
                document.getElementById('btn-poems').textContent = data.home.cta.poemsLabel;
                document.getElementById('btn-birthday').textContent = data.home.cta.birthdayLabel;
                
                const btnAnniversary = document.getElementById('btn-anniversary');
                btnAnniversary.textContent = data.home.cta.anniversaryLabel;
                btnAnniversary.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    const passcode = prompt("enter the passcode!");
                    if (passcode !== null && passcode.toLowerCase() === "lavender") {
                        window.location.href = "anniversary.html";
                    } else if (passcode !== null) {
                        alert("nuh uh not yet");
                    }
                });

                // --- NEW: Dust Motes Generator ---
                const dustContainer = document.createElement('div');
                dustContainer.id = 'dust-container';
                document.body.appendChild(dustContainer);

                // Create 35 floating particles
                for (let i = 0; i < 35; i++) { 
                    const mote = document.createElement('div');
                    mote.className = 'dust-mote';
                    
                    // Randomize size (between 2px and 6px)
                    const size = Math.random() * 4 + 2; 
                    mote.style.width = `${size}px`;
                    mote.style.height = `${size}px`;
                    
                    // Randomize starting position across the screen
                    mote.style.left = `${Math.random() * 100}vw`;
                    mote.style.top = `${Math.random() * -100}vh`; 
                    
                    // Randomize how fast they fall and sway
                    const fallDuration = Math.random() * 15 + 12; // 12s to 27s
                    const swayDuration = Math.random() * 4 + 3;   // 3s to 7s
                    const delay = Math.random() * -25; // Starts them at different times so they don't fall in a single clump
                    
                    mote.style.animation = `drift ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out infinite alternate`;
                    
                    dustContainer.appendChild(mote);
                }
            }

            // 2. Populate Gallery Page (Lightbox Removed)
            if (bodyId === 'page-gallery') {
                document.getElementById('gallery-title').textContent = data.gallery.title;
                document.getElementById('gallery-subtitle').textContent = data.gallery.subtitle;

                const grid = document.getElementById('gallery-grid');

                data.gallery.items.forEach(item => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'gallery-item';
                    wrapper.innerHTML = `
                        <img src="${item.src}" alt="${item.alt}" loading="lazy">
                        <div class="gallery-caption">${item.caption}</div>
                    `;
                    grid.appendChild(wrapper);
                });
            }

            // 3. Populate Poems Page
            if (bodyId === 'page-poems') {
                document.getElementById('poems-title').textContent = data.poems.title;
                const container = document.getElementById('poems-container');
                data.poems.items.forEach(item => {
                    const block = document.createElement('div');
                    block.className = 'poem-block';
                    let linesHtml = item.lines.map(line => `<span class="poem-line">${line}</span>`).join('');
                    block.innerHTML = `
                        <h2 class="poem-title">${item.title}</h2>
                        <div class="poem-body">${linesHtml}</div>
                    `;
                    container.appendChild(block);
                });
            }
            
            // 4. Populate Birthday Page
            if (bodyId === 'page-birthday') {
                document.getElementById('birthday-title').textContent = data.birthday.title;
                const container = document.getElementById('birthday-container');
                data.birthday.entries.forEach(entry => {
                    const block = document.createElement('div');
                    block.className = 'birthday-entry';
                    block.innerHTML = `
                        <div class="birthday-date">${entry.date}</div>
                        <div class="birthday-text">${entry.text}</div>
                    `;
                    container.appendChild(block);
                });
            }

            // 5. Populate Anniversary Page
            if (bodyId === 'page-anniversary') {
                document.getElementById('anniversary-title').textContent = data.anniversary.title;
                const container = document.getElementById('anniversary-container');
                data.anniversary.entries.forEach(entry => {
                    const block = document.createElement('div');
                    block.className = 'anniversary-entry';
                    block.innerHTML = `
                        <div class="anniversary-date">${entry.date}</div>
                        <div class="anniversary-text">${entry.text}</div>
                    `;
                    container.appendChild(block);
                });
            }
        })
        .catch(error => console.error('Error loading content:', error));
});