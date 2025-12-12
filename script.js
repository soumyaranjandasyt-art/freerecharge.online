// Recharge plans data
const rechargePlans = {
    airtel: [
        { amount: 349, validity: '28 days', data: 'Unlimited 5G + 2GB/day' }
    ],
    jio: [
        { amount: 349, validity: '28 days', data: 'Unlimited 5G + 2GB/day' }
    ],
    vi: [
        { amount: 349, validity: '28 days', data: 'Unlimited' }
    ],
    bsnl: [
        { amount: 225, validity: '30 days', data: 'Unlimited (2.5GB/day)' }
    ]
};

// Operator names mapping
const operatorNames = {
    airtel: 'Airtel',
    jio: 'Jio',
    vi: 'Vi (Vodafone Idea)',
    bsnl: 'BSNL'
};

// Operator logos mapping
const operatorLogos = {
    airtel: 'image/Airtel-Logo-SVG_008.svg',
    jio: 'image/Jio-Logo-3.svg',
    vi: 'image/vi-mobile-icon.svg',
    bsnl: 'image/bsnl-logo-icon.svg'
};

// State names mapping
const stateNames = {
    'andhra-pradesh': 'Andhra Pradesh',
    'assam': 'Assam',
    'bihar': 'Bihar',
    'delhi': 'Delhi',
    'gujarat': 'Gujarat',
    'haryana': 'Haryana',
    'karnataka': 'Karnataka',
    'kerala': 'Kerala',
    'madhya-pradesh': 'Madhya Pradesh',
    'maharashtra': 'Maharashtra',
    'odisha': 'Odisha',
    'punjab': 'Punjab',
    'rajasthan': 'Rajasthan',
    'tamil-nadu': 'Tamil Nadu',
    'telangana': 'Telangana',
    'uttar-pradesh': 'Uttar Pradesh',
    'west-bengal': 'West Bengal'
};

// DOM Elements
const mobileInput = document.getElementById('mobileNumber');
const operatorSelect = document.getElementById('operator');
const stateSelect = document.getElementById('state');
const planGrid = document.getElementById('planGrid');
const rechargeForm = document.getElementById('rechargeForm');
const summaryCard = document.getElementById('summaryCard');
const continueBtn = document.getElementById('continueBtn');

// Mobile number validation - only numbers
mobileInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length === 10) {
        this.style.borderColor = '#10b981';
    } else {
        this.style.borderColor = '';
    }
});

// Update operator display with logo
function updateOperatorDisplay() {
    const operatorDisplay = document.getElementById('operatorDisplay');
    const selectedOption = operatorSelect.options[operatorSelect.selectedIndex];
    
    if (operatorSelect.value && selectedOption.dataset.logo) {
        operatorDisplay.innerHTML = `
            <img src="${selectedOption.dataset.logo}" alt="${selectedOption.text}" class="operator-logo-select">
            <span>${selectedOption.text}</span>
        `;
    } else {
        operatorDisplay.innerHTML = `
            <svg class="operator-placeholder-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>
            <span class="operator-placeholder">Choose your operator</span>
        `;
    }
}


// Show/hide payable amount
function showPayableAmount() {
    const payableAmount = document.getElementById('payableAmount');
    if (payableAmount) {
        payableAmount.style.display = 'block';
    }
}

function hidePayableAmount() {
    const payableAmount = document.getElementById('payableAmount');
    if (payableAmount) {
        payableAmount.style.display = 'none';
    }
}

// Generate recharge plans when operator is selected
operatorSelect.addEventListener('change', function() {
    const selectedOperator = this.value;
    updateOperatorDisplay();
    
    // SEO: Update page title and meta description
    updatePageTitle(selectedOperator);
    updateMetaDescription(selectedOperator);
    
    if (selectedOperator && rechargePlans[selectedOperator]) {
        generatePlanOptions(selectedOperator);
        hidePayableAmount(); // Hide when operator changes
    } else {
        planGrid.innerHTML = '';
        hidePayableAmount();
    }
});

// Generate plan options
function generatePlanOptions(operator) {
    planGrid.innerHTML = '';
    const plans = rechargePlans[operator];
    
    plans.forEach((plan, index) => {
        const planOption = document.createElement('label');
        planOption.className = 'plan-option';
        planOption.innerHTML = `
            <input type="radio" name="rechargePlan" value="${plan.amount}" required>
            <div class="plan-badge">Popular Plan</div>
            <div class="plan-amount">₹${plan.amount}</div>
            <div class="plan-validity">${plan.validity}</div>
            <div class="plan-data">${plan.data}</div>
        `;
        
        // Add click handler for visual feedback
        planOption.addEventListener('click', function() {
            // Remove selected class from all plans
            document.querySelectorAll('.plan-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked plan
            this.classList.add('selected');
            // Show payable amount
            showPayableAmount();
        });
        
        planGrid.appendChild(planOption);
    });
}

// Form submission
rechargeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const mobileNumber = mobileInput.value;
    const operator = operatorSelect.value;
    const state = stateSelect.value;
    const selectedPlan = document.querySelector('input[name="rechargePlan"]:checked');
    
    // Validation
    if (!mobileNumber || mobileNumber.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        mobileInput.focus();
        return;
    }
    
    if (!operator) {
        alert('Please select an operator');
        operatorSelect.focus();
        return;
    }
    
    if (!state) {
        alert('Please select a state');
        stateSelect.focus();
        return;
    }
    
    if (!selectedPlan) {
        alert('Please select a recharge plan');
        return;
    }
    
    // Show loading state
    continueBtn.disabled = true;
    continueBtn.innerHTML = '<span>Processing...</span>';
    
    // Simulate API call delay
    setTimeout(() => {
        // Display payment page
        showPaymentPage(mobileNumber, operator, state, selectedPlan.value);
        
        // Reset button
        continueBtn.disabled = false;
        continueBtn.innerHTML = '<span>Continue to Payment</span><svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    }, 1000);
});

// Timer variables
let paymentTimer;
let timeLeft = 300; // 5 minutes in seconds

// Show payment page
function showPaymentPage(mobile, operator, state, planAmount) {
    const plans = rechargePlans[operator];
    const selectedPlanData = plans.find(p => p.amount === parseInt(planAmount));
    
    // Update payment details
    document.getElementById('paymentMobile').textContent = mobile;
    
    // Update operator with logo
    const paymentOperatorEl = document.getElementById('paymentOperator');
    paymentOperatorEl.innerHTML = `
        <img src="${operatorLogos[operator]}" alt="${operatorNames[operator]}" class="operator-logo-payment">
        <span>${operatorNames[operator]}</span>
    `;
    
    document.getElementById('paymentState').textContent = stateNames[state];
    document.getElementById('paymentPlan').textContent = `₹${planAmount} - ${selectedPlanData.validity} (${selectedPlanData.data})`;
    document.getElementById('paymentAmount').textContent = '₹5';
    
    // Hide form and show payment page
    rechargeForm.closest('.recharge-card').style.display = 'none';
    document.getElementById('paymentCard').style.display = 'block';
    
    // Start timer
    startPaymentTimer();
    
    // Scroll to payment page
    document.getElementById('paymentCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Start payment timer
function startPaymentTimer() {
    timeLeft = 300; // Reset to 5 minutes
    updateTimerDisplay();
    
    paymentTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(paymentTimer);
            handleTimerExpiry();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerValue = document.getElementById('timerValue');
    if (timerValue) {
        timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Change color when time is running out
        if (timeLeft <= 60) {
            timerValue.style.color = '#ef4444';
            timerValue.parentElement.parentElement.classList.add('timer-warning');
        } else {
            timerValue.style.color = '';
            timerValue.parentElement.parentElement.classList.remove('timer-warning');
        }
    }
}

// Handle timer expiry
function handleTimerExpiry() {
    alert('Payment time expired. Please try again.');
    resetForm();
}

// Reset form function (called from payment page)
function resetForm() {
    // Clear timer
    if (paymentTimer) {
        clearInterval(paymentTimer);
    }
    timeLeft = 300;
    
    rechargeForm.reset();
    planGrid.innerHTML = '';
    mobileInput.style.borderColor = '';
    hidePayableAmount();
    updateOperatorDisplay();
    
    // Hide payment page and show form
    document.getElementById('paymentCard').style.display = 'none';
    rechargeForm.closest('.recharge-card').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus on mobile input
    setTimeout(() => {
        mobileInput.focus();
    }, 300);
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// SEO: Update page title based on operator selection
function updatePageTitle(operator) {
    const operatorNames = {
        'airtel': 'Airtel',
        'jio': 'Jio',
        'vi': 'Vi',
        'bsnl': 'BSNL'
    };
    
    if (operator && operatorNames[operator]) {
        document.title = `${operatorNames[operator]} Mobile Recharge at ₹5 | Free Recharge`;
    } else {
        document.title = 'Mobile Recharge at ₹5 Only | Instant Prepaid Recharge for All Operators';
    }
}

// SEO: Update meta description based on operator
function updateMetaDescription(operator) {
    const operatorNames = {
        'airtel': 'Airtel',
        'jio': 'Jio',
        'vi': 'Vi',
        'bsnl': 'BSNL'
    };
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && operator && operatorNames[operator]) {
        metaDesc.content = `Get instant ${operatorNames[operator]} mobile recharge at just ₹5. Fast, secure & reliable prepaid recharge service with 99.9% success rate. Recharge now!`;
    }
}

// Running Banner Functionality
function generateRandomMobileNumber() {
    // Generate last 5 digits (random)
    const last5Digits = Math.floor(10000 + Math.random() * 90000);
    // Mask first 5 digits with asterisks
    return `+91*****${last5Digits}`;
}

function generateBannerItems() {
    const operators = [
        { name: 'Airtel', plan: '₹349', logo: operatorLogos.airtel, key: 'airtel' },
        { name: 'Jio', plan: '₹349', logo: operatorLogos.jio, key: 'jio' },
        { name: 'Vi', plan: '₹349', logo: operatorLogos.vi, key: 'vi' },
        { name: 'BSNL', plan: '₹225', logo: operatorLogos.bsnl, key: 'bsnl' }
    ];
    
    const bannerContent = document.getElementById('bannerContent');
    if (!bannerContent) return;
    
    // Generate multiple items for seamless infinite scrolling
    // Duplicate items to create seamless loop
    let itemsHTML = '';
    const itemCount = 30; // Increased for smoother scrolling
    
    for (let i = 0; i < itemCount; i++) {
        const mobileNumber = generateRandomMobileNumber();
        const operator = operators[Math.floor(Math.random() * operators.length)];
        
        itemsHTML += `
            <div class="banner-item">
                <img src="${operator.logo}" alt="${operator.name}" class="operator-logo-banner">
                <span class="mobile-number">${mobileNumber}</span>
                <span>recharged</span>
                <span class="operator">${operator.name}</span>
                <span class="plan-amount">${operator.plan}</span>
                <span class="success-text">✓ Successful</span>
            </div>
        `;
    }
    
    // Duplicate the content for seamless infinite loop
    bannerContent.innerHTML = itemsHTML + itemsHTML;
}

// Share Popup Functionality
let shareCount = 0;
const REQUIRED_SHARES = 5; // Display requirement
const ACTUAL_REQUIRED_SHARES = 1; // Actual unlock requirement (1 share)

// Check unlock status - popup always shows, user must share every time
function checkUnlockStatus() {
    // Always show popup first
    const sharePopup = document.getElementById('sharePopup');
    if (sharePopup) {
        sharePopup.style.display = 'flex';
    }
    
    // Reset share count to 0 every time (user must share every visit)
    shareCount = 0;
    localStorage.setItem('shareCount', '0');
    updateShareUI();
}

// Update share UI
function updateShareUI() {
    const shareCountEl = document.getElementById('shareCount');
    const progressBar = document.getElementById('progressBar');
    
    if (shareCountEl) {
        // Show minimum of shareCount or REQUIRED_SHARES for display
        const displayCount = Math.min(shareCount, REQUIRED_SHARES);
        shareCountEl.textContent = displayCount;
    }
    
    if (progressBar) {
        // Show 100% progress after first share, but display as if 5 shares needed
        const percentage = shareCount >= ACTUAL_REQUIRED_SHARES ? 100 : (shareCount / REQUIRED_SHARES) * 100;
        progressBar.style.width = percentage + '%';
    }
}

// Increment share count and unlock
function incrementShare() {
    shareCount++;
    localStorage.setItem('shareCount', shareCount);
    updateShareUI();
    
    // Unlock immediately after first share (but UI shows 5 required)
    if (shareCount >= ACTUAL_REQUIRED_SHARES) {
        // Small delay to show the share action
        setTimeout(() => {
            unlockSite();
        }, 500);
    }
}

// Unlock site
function unlockSite() {
    const sharePopup = document.getElementById('sharePopup');
    const mainContent = document.getElementById('mainContent');
    
    if (sharePopup) {
        sharePopup.style.display = 'none';
    }
    
    if (mainContent) {
        mainContent.style.display = 'block';
    }
}

// Share functions
function shareToWhatsApp() {
    const text = encodeURIComponent('🎁 Get Free Mobile Recharge! Check out this amazing offer: ' + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    incrementShare();
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    incrementShare();
}

function shareToTwitter() {
    const text = encodeURIComponent('🎁 Get Free Mobile Recharge! Check out this amazing offer!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    incrementShare();
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
        incrementShare();
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
        incrementShare();
    });
}

// Initialize banner when page loads
// Live Recharge Counter - Synchronized across all tabs in real-time
let rechargeCount = 50000;
const BASE_COUNT = 50000; // Starting base for all users
const STORAGE_KEY = 'globalRechargeCount';
const TIME_KEY = 'rechargeCountTime';
const SYNC_KEY = 'rechargeCountSync';

function calculateCurrentCount() {
    // Get the initial timestamp (when first visitor came)
    let initialTime = localStorage.getItem(TIME_KEY);
    const now = Date.now();
    
    if (!initialTime) {
        // First visit ever - set initial time
        initialTime = now;
        localStorage.setItem(TIME_KEY, initialTime);
    }
    
    // Calculate time passed since first visit (in seconds)
    const secondsPassed = Math.floor((now - parseInt(initialTime)) / 1000);
    
    // Simulate growth: ~3 recharges per second on average
    const estimatedGrowth = Math.floor(secondsPassed * 3);
    
    // Get saved base offset (same for all tabs on same device)
    let baseOffset = localStorage.getItem('rechargeBaseOffset');
    if (!baseOffset) {
        baseOffset = Math.floor(Math.random() * 5000);
        localStorage.setItem('rechargeBaseOffset', baseOffset);
    }
    
    // Calculate current count (same formula in all tabs)
    const calculatedCount = BASE_COUNT + parseInt(baseOffset) + estimatedGrowth;
    
    // Get last saved count to ensure we never go backwards
    const savedCount = localStorage.getItem(STORAGE_KEY);
    if (savedCount && parseInt(savedCount) > calculatedCount) {
        return parseInt(savedCount);
    }
    
    return calculatedCount;
}

function initializeRechargeCount() {
    rechargeCount = calculateCurrentCount();
    localStorage.setItem(STORAGE_KEY, rechargeCount);
    updateRechargeCountDisplay();
}

function updateRechargeCountDisplay() {
    const countElement = document.getElementById('rechargeCount');
    if (countElement) {
        // Add animation class
        countElement.style.transform = 'scale(1.2)';
        countElement.style.transition = 'transform 0.3s ease';
        
        // Update number with comma formatting
        countElement.textContent = rechargeCount.toLocaleString();
        
        // Reset animation
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 300);
    }
}

function incrementRechargeCount() {
    // Recalculate based on current time to stay synchronized
    const newCount = calculateCurrentCount();
    
    // Add a small random increment (1-3) to simulate activity
    const increment = Math.floor(Math.random() * 3) + 1;
    rechargeCount = newCount + increment;
    
    // Save to localStorage and trigger sync across tabs
    localStorage.setItem(STORAGE_KEY, rechargeCount);
    localStorage.setItem(SYNC_KEY, Date.now()); // Trigger storage event
    
    // Update display
    updateRechargeCountDisplay();
}

// Sync across tabs when localStorage changes
window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY || e.key === SYNC_KEY) {
        // Another tab updated the count - sync this tab
        const savedCount = localStorage.getItem(STORAGE_KEY);
        if (savedCount) {
            rechargeCount = parseInt(savedCount);
            updateRechargeCountDisplay();
        }
    }
});

function startRechargeCounter() {
    // Initialize counter
    initializeRechargeCount();
    
    // Increment randomly every 2-6 seconds (faster to simulate global activity)
    function scheduleNextIncrement() {
        const delay = Math.floor(Math.random() * 4000) + 2000; // 2-6 seconds
        setTimeout(() => {
            incrementRechargeCount();
            scheduleNextIncrement();
        }, delay);
    }
    
    scheduleNextIncrement();
    
    // Periodic sync to keep all tabs aligned (every 5 seconds)
    setInterval(() => {
        const savedCount = localStorage.getItem(STORAGE_KEY);
        if (savedCount && parseInt(savedCount) !== rechargeCount) {
            rechargeCount = parseInt(savedCount);
            updateRechargeCountDisplay();
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Check unlock status first
    checkUnlockStatus();
    
    // Initialize operator display
    updateOperatorDisplay();
    
    // Initialize banner
    generateBannerItems();
    
    // Start recharge counter
    startRechargeCounter();
    
    // Update banner content periodically for variety
    setInterval(generateBannerItems, 60000); // Update every minute
});

