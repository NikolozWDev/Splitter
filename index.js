import { tips } from "./data/selecttips.js";

export function index() {
  // Build tip buttons from data
  const checkDiv = document.querySelector('#checkid');
  if (!checkDiv) return;
  
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

  // Check if all elements exist
  if (!resetBtn || !billInput || !peopleInput || !customInput || !clearTipBtn || 
      !tipAmountDisplay || !totalDisplay || !billError || !peopleError) {
    console.error('Some DOM elements are missing');
    return;
  }

  let selectedTipPercent = 0;
  let lastClickedButton = null;

  // Utility: validate inputs and return parsed values
  function getValidInputs() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value, 10);
    return {
      bill: isNaN(bill) || bill < 0 ? null : bill,
      people: isNaN(people) || people < 1 ? null : people
    };
  }

  // Show field errors
  function setFieldError(input, errorSpan, message) {
    if (message) {
      input.classList.add('input-error');
      input.classList.remove('input-valid');
      errorSpan.textContent = message;
    } else {
      input.classList.remove('input-error');
      input.classList.add('input-valid');
      errorSpan.textContent = '';
    }
  }

  // Main calculation and display update
  function updateTotals() {
    const { bill, people } = getValidInputs();

    // Handle bill validation
    if (billInput.value.trim() === '' || bill === null || bill <= 0) {
      setFieldError(billInput, billError, "Can't be zero");
    } else {
      setFieldError(billInput, billError, '');
    }

    // Handle people validation
    if (peopleInput.value.trim() === '' || people === null || people < 1) {
      setFieldError(peopleInput, peopleError, "Can't be zero");
    } else {
      setFieldError(peopleInput, peopleError, '');
    }

    // Reset button state
    const hasValidData = bill !== null && bill > 0 && people !== null && people > 0;
    resetBtn.disabled = !hasValidData;

    // Perform calculation if all valid and tip selected
    if (bill !== null && bill > 0 && people !== null && people > 0 && selectedTipPercent > 0) {
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

  // Reset tip selection UI
  function clearTipSelection() {
    if (lastClickedButton) {
      lastClickedButton.classList.remove('active');
      lastClickedButton = null;
    }
    selectedTipPercent = 0;
    customInput.value = '';
    clearTipBtn.classList.remove('show');
  }

  // Event: Tip percentage buttons (use event delegation)
  checkDiv.addEventListener('click', (e) => {
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

  // Event: Custom tip input
  customInput.addEventListener('input', () => {
    let customValue = parseFloat(customInput.value);
    if (!isNaN(customValue) && customValue >= 1 && customValue <= 100) {
      if (lastClickedButton) {
        lastClickedButton.classList.remove('active');
        lastClickedButton = null;
      }
      selectedTipPercent = customValue;
    } else if (customInput.value.trim() !== '') {
      // Invalid custom value
      alert('Please enter a tip between 1% and 100%');
      customInput.value = '';
      selectedTipPercent = 0;
    } else {
      // Empty custom input
      if (!lastClickedButton) {
        selectedTipPercent = 0;
      }
    }
    updateTotals();
  });

  // Event: Clear tip button (X)
  clearTipBtn.addEventListener('click', () => {
    clearTipSelection();
    updateTotals();
  });

  // Event: Input fields change
  billInput.addEventListener('input', updateTotals);
  peopleInput.addEventListener('input', updateTotals);

  // Event: Reset button
  resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    clearTipSelection();
    setFieldError(billInput, billError, '');
    setFieldError(peopleInput, peopleError, '');
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    resetBtn.disabled = true;
  });

  // Initial state
  updateTotals();
}