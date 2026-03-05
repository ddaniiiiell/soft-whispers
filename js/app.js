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
                    const passcode = prompt("Please enter the passcode to view the anniversary page:");
                    if (passcode !== null && passcode.toLowerCase() === "lavender") {
                        window.location.href = "anniversary.html";
                    } else if (passcode !== null) {
                        alert("Incorrect passcode. The archive remains closed.");
                    }
                });
            }

            // 2. Populate Gallery Page
            if (bodyId === 'page-gallery') {
                document.getElementById('gallery-title').textContent = data.gallery.title;
                
                // NEW: Inject the subtitle
                document.getElementById('gallery-subtitle').textContent = data.gallery.subtitle;

                const grid = document.getElementById('gallery-grid');
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                const lightboxCaption = document.getElementById('lightbox-caption');

                data.gallery.items.forEach(item => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'gallery-item';
                    wrapper.innerHTML = `
                        <img src="${item.src}" alt="${item.alt}" loading="lazy">
                        <div class="gallery-caption">${item.caption}</div>
                    `;
                    
                    wrapper.querySelector('img').addEventListener('click', () => {
                        lightboxImg.src = item.src;
                        lightboxImg.alt = item.alt;
                        lightboxCaption.textContent = item.caption;
                        lightbox.classList.add('active');
                    });

                    grid.appendChild(wrapper);
                });

                lightbox.addEventListener('click', (e) => {
                    if (e.target !== lightboxImg) lightbox.classList.remove('active');
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                        lightbox.classList.remove('active');
                    }
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