document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch the JSON data
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            const bodyId = document.body.id;

            // 2. Populate Home Page
            if (bodyId === 'page-home') {
                document.getElementById('home-title').textContent = data.home.title;
                
                const subtitleContainer = document.getElementById('home-subtitle');
                data.home.subtitleLines.forEach(line => {
                    const p = document.createElement('div');
                    p.textContent = line;
                    subtitleContainer.appendChild(p);
                });

                // ---> HERE IS YOUR NEW TITLE LINE <---
                document.getElementById('cta-title').textContent = data.home.cta.title;

                document.getElementById('btn-gallery').textContent = data.home.cta.galleryLabel;
                document.getElementById('btn-poems').textContent = data.home.cta.poemsLabel;
            }

            // 3. Populate Gallery Page
            if (bodyId === 'page-gallery') {
                document.getElementById('gallery-title').textContent = data.gallery.title;
                
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

            // 4. Populate Poems Page
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
        })
        .catch(error => console.error('Error loading content:', error));
});