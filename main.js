// Data
const tips = [
  { tipid: '1', tip: 5 },
  { tipid: '2', tip: 10 },
  { tipid: '3', tip: 15 },
  { tipid: '4', tip: 25 },
  { tipid: '5', tip: 50 },
];

const aboutsArr = [
  {
    name: 'Calculator',
    description: 'Switch to basic calculator mode for simple arithmetic.',
    summon: 'Summon',
  },
  {
    name: 'Rectangle Area',
    description: 'Calculate area of a rectangle by entering width and height.',
    summon: 'Summon',
  },
];

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initCalculator();
  initMenu();
});

// Calculator functionality
function initCalculator() {
  const checkDiv = document.querySelector('#checkid');
  if (!checkDiv) return;
  
  // Build tip buttons
  let htmlg = '';
  tips.forEach(tip => {
    htmlg += `<button class="buttons1" data-tipid="${tip.tip}">${tip.tip}%</button>`;
  });
  checkDiv.innerHTML = htmlg + '<input type="number" class="inputpro1" placeholder="Custom" min="0" max="100">';

  // DOM elements
  const resetBtn = document.querySelector('#buttonjs');
  const billInput = document.querySelector('#inputjs1');
  const peopleInput = document.querySelector('#inputjs2');
  const customInput = document.querySelector('.inputpro1');
  const clearTipBtn = document.querySelector('#xb-js');
  const tipAmountDisplay = document.querySelector('#num');
  const totalDisplay = document.querySelector('#num2');
  const billError = document.querySelector('#span1js');
  const peopleError = document.querySelector('#span2js');

  if (!resetBtn || !billInput || !peopleInput || !customInput || !clearTipBtn || 
      !tipAmountDisplay || !totalDisplay || !billError || !peopleError) {
    console.error('Some DOM elements are missing');
    return;
  }

  let selectedTipPercent = 0;
  let lastClickedButton = null;

  // Main calculation and display update
  function updateTotals() {
    // Clear all errors first
    billInput.classList.remove('input-error');
    peopleInput.classList.remove('input-error');
    billError.textContent = '';
    peopleError.textContent = '';

    const billValue = billInput.value.trim();
    const peopleValue = peopleInput.value.trim();
    const bill = parseFloat(billValue);
    const people = parseInt(peopleValue, 10);

    let hasError = false;

    // Validate bill - only if user has typed something
    if (billValue !== '') {
      if (isNaN(bill) || bill <= 0) {
        billInput.classList.add('input-error');
        billError.textContent = "Can't be zero";
        hasError = true;
      }
    }

    // Validate people - only if user has typed something
    if (peopleValue !== '') {
      if (isNaN(people) || people < 1) {
        peopleInput.classList.add('input-error');
        peopleError.textContent = "Can't be zero";
        hasError = true;
      }
    }

    // Calculate only if all valid
    if (!hasError && billValue !== '' && peopleValue !== '' && selectedTipPercent > 0) {
      const tipAmountPerPerson = (bill * (selectedTipPercent / 100)) / people;
      const totalPerPerson = (bill / people) + tipAmountPerPerson;

      if (isFinite(tipAmountPerPerson) && isFinite(totalPerPerson)) {
        tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
        totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
      }
    } else {
      tipAmountDisplay.textContent = '$0.00';
      totalDisplay.textContent = '$0.00';
    }

    // Show/hide clear tip button
    if (selectedTipPercent > 0) {
      clearTipBtn.classList.add('show');
    } else {
      clearTipBtn.classList.remove('show');
    }
  }

  // Clear tip selection
  function clearTipSelection() {
    if (lastClickedButton) {
      lastClickedButton.classList.remove('active');
      lastClickedButton = null;
    }
    selectedTipPercent = 0;
    customInput.value = '';
    clearTipBtn.classList.remove('show');
  }

  // Tip buttons (event delegation)
  checkDiv.addEventListener('click', function(e) {
    const btn = e.target.closest('.buttons1');
    if (!btn) return;
    
    const tipValue = parseInt(btn.dataset.tipid, 10);
    if (lastClickedButton) {
      lastClickedButton.classList.remove('active');
    }
    btn.classList.add('active');
    lastClickedButton = btn;
    selectedTipPercent = tipValue;
    customInput.value = '';
    updateTotals();
  });

  // Custom tip input
  customInput.addEventListener('input', function() {
    const customValue = parseFloat(customInput.value);
    
    if (!isNaN(customValue) && customValue >= 1 && customValue <= 100) {
      if (lastClickedButton) {
        lastClickedButton.classList.remove('active');
        lastClickedButton = null;
      }
      selectedTipPercent = customValue;
    } else if (customInput.value.trim() !== '') {
      alert('Please enter a tip between 1% and 100%');
      customInput.value = '';
      selectedTipPercent = 0;
    } else {
      if (!lastClickedButton) {
        selectedTipPercent = 0;
      }
    }
    updateTotals();
  });

  // Clear tip button
  clearTipBtn.addEventListener('click', function() {
    clearTipSelection();
    updateTotals();
  });

  // Input fields
  billInput.addEventListener('input', updateTotals);
  peopleInput.addEventListener('input', updateTotals);

  // Reset button
  resetBtn.addEventListener('click', function() {
    billInput.value = '';
    peopleInput.value = '';
    clearTipSelection();
    billInput.classList.remove('input-error');
    peopleInput.classList.remove('input-error');
    billError.textContent = '';
    peopleError.textContent = '';
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
  });
}

// Menu functionality
function initMenu() {
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

  // Toggle menu
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    headerSon.classList.toggle('open');
  });

  // Accordion behavior
  headerSon.addEventListener('click', function(e) {
    const row = e.target.closest('.clicking');
    if (row) {
      const parentDiv = row.nextElementSibling;
      if (!parentDiv || !parentDiv.classList.contains('div2')) return;

      const isActive = parentDiv.classList.contains('active');
      
      // Close all others
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
      
      // Toggle clicked
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
    
    // Summon button
    if (e.target.classList.contains('summon1')) {
      e.stopPropagation();
      const sectionName = e.target.closest('.main-div1')?.querySelector('.about-name')?.textContent;
      alert(`Summoned: ${sectionName}`);
    }
  });
}