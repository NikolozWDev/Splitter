import { aboutsArr } from "./data/modes.js";

export function about() {
  const headerSon = document.querySelector('.header-son');
  const hamburger = document.querySelector('.hamburger');
  
  if (!headerSon || !hamburger) {
    console.error('Header elements not found');
    return;
  }

  // Build menu HTML
  let htmlg2 = '';
  aboutsArr.forEach(item => {
    htmlg2 += `
      <div class="main-div1">
        <div class="div1 clicking" data-section="${item.name}">
          <p class="about-name">${item.name}</p>
          <span class="arrow">▸</span>
        </div>
        <div class="div2">
          <p class="summon1-text">${item.description}</p>
          <button class="summon1">${item.summon}</button>
        </div>
      </div>
    `;
  });
  headerSon.innerHTML = htmlg2;

  // Toggle menu open/close
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    headerSon.classList.toggle('open');
  });

  // Accordion behavior using event delegation
  headerSon.addEventListener('click', (e) => {
    const row = e.target.closest('.clicking');
    if (row) {
      const parentDiv = row.nextElementSibling;
      if (!parentDiv || !parentDiv.classList.contains('div2')) return;

      // Toggle current
      const isActive = parentDiv.classList.contains('active');
      
      // Close all other open divs
      headerSon.querySelectorAll('.div2.active').forEach(div => {
        if (div !== parentDiv) {
          div.classList.remove('active');
          const prevRow = div.previousElementSibling;
          if (prevRow) {
            const arrow = prevRow.querySelector('.arrow');
            if (arrow) arrow.textContent = '▸';
          }
        }
      });
      
      // Toggle clicked one
      if (isActive) {
        parentDiv.classList.remove('active');
        const arrow = row.querySelector('.arrow');
        if (arrow) arrow.textContent = '▸';
      } else {
        parentDiv.classList.add('active');
        const arrow = row.querySelector('.arrow');
        if (arrow) arrow.textContent = '▾';
      }
    }
    
    // Handle summon button clicks
    if (e.target.classList.contains('summon1')) {
      e.stopPropagation();
      const sectionName = e.target.closest('.main-div1')?.querySelector('.about-name')?.textContent;
      alert(`Summoned: ${sectionName}`);
    }
  });
}