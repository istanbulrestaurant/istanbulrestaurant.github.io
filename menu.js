let language = "en";

document.addEventListener('DOMContentLoaded', function() {
    fetch('menu.csv')
        .then(response => response.text())
        .then(text => {
            let lines = text.split('\n');
            let menu = {};
            lines.forEach((line, index) => {
                if (index === 0) return; // skip header
                let [category, name_en,name_tr,name_me,name_ru, price, description] = line.split(',');
                if (!menu[category]) menu[category] = [];
                if (language === 'en') menu[category].push({ name_en: name_en, name: name_en, price, description });
                if (language === 'tr') menu[category].push({ name_en: name_en, name: name_tr, price, description });
                if (language === 'me') menu[category].push({ name_en: name_en, name: name_me, price, description });
                if (language === 'ru') menu[category].push({ name_en: name_en, name: name_ru, price, description });
            });
            displayMenu(menu);
        });
});

function displayMenu(menu) {
    const menuDiv = document.getElementById('menu');
    for (let category in menu) {
        let section = document.createElement('div');
        section.className = 'menu-section';
        let title = document.createElement('h2');
        title.className = 'menu-section-title';
        title.textContent = category;
        section.appendChild(title);

        menu[category].forEach(item => {
            if (!item.name) return; // skip empty lines (last line in file)
            let itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            let imagePath = 'images/' + item.name_en.replace(/\s+/g, '-') + '.png';
            let img = document.createElement('img');
            img.id = item.name;
            img.src = imagePath;
            img.alt = item.name;
            img.className = 'menu-itemimage';
            itemDiv.appendChild(img);

            // Error event listener
            img.addEventListener('error', function() {
                document.getElementById(item.name).remove()
            });
            
            itemDiv.innerHTML += `
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-price">€${item.price}</div>
                ${item.description ? `<div class="menu-item-description">${item.description}</div>` : ''}
            `;
            section.appendChild(itemDiv);
        });

        menuDiv.appendChild(section);
        
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    language = urlParams.get('lan') || 'en'; // Default to 'en' if no parameter

    const languageSelect = document.getElementById('language-select');
    languageSelect.value = language;

    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lan=' + selectedLanguage;
        window.location.href = newUrl;
    });
    
});
