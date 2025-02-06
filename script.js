// Create Account with Password
function createAccount() {
    let newUsername = document.getElementById('newUsername').value.trim();
    let confirmUsername = document.getElementById('confirmUsername').value.trim();
    let newPassword = document.getElementById('newPassword').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (newUsername === '' || confirmUsername === '' || newPassword === '' || confirmPassword === '') {
        alert("All fields are required!");
        return;
    }

    if (newUsername !== confirmUsername) {
        alert("Usernames do not match!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;c
    }

    if (localStorage.getItem(newUsername)) {
        alert("Username already exists!");
        return;
    }

    // Create user data
    let userData = {
        username: newUsername,
        password: newPassword,
        balance: 1500,  // Default balance
        debt: 0
    };

    localStorage.setItem(newUsername, JSON.stringify(userData));
    alert("Account created successfully!");
    window.location.href = "index.html"; // Redirect to login
}

// Login with Password
function login() {
    let loginUsername = document.getElementById('loginUsername').value.trim();
    let loginPassword = document.getElementById('loginPassword').value.trim();

    if (loginUsername === '' || loginPassword === '') {
        alert("Please enter both username and password.");
        return;
    }

    let storedData = localStorage.getItem(loginUsername);
    if (!storedData) {
        alert("Account does not exist.");
        return;
    }

    let userData = JSON.parse(storedData);
    if (userData.password !== loginPassword) {
        alert("Incorrect password.");
        return;
    }

    localStorage.setItem('loggedInUser', loginUsername);  // Set active session
    window.location.href = "dashboard.html";  // Redirect to dashboard
}

// Load Dashboard Data
function loadDashboard() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You are not logged in!");
        window.location.href = "index.html";
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInUser));
    document.getElementById('username').innerText = userData.username;
    document.getElementById('balance').innerText = userData.balance;
    document.getElementById('debt').innerText = userData.debt;
}

// Load Balance Page
function loadBalancePage() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You are not logged in!");
        window.location.href = "index.html";
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInUser));
    document.getElementById('balance').innerText = userData.balance;
}

// Deposit
function deposit() {
    let amount = parseFloat(document.getElementById('amountBalance').value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let loggedInUser = localStorage.getItem('loggedInUser');
    let userData = JSON.parse(localStorage.getItem(loggedInUser));

    userData.balance += amount;
    localStorage.setItem(loggedInUser, JSON.stringify(userData));
    loadBalancePage(); // Refresh balance page
}

// Withdraw
function withdraw() {
    let amount = parseFloat(document.getElementById('amountBalance').value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let loggedInUser = localStorage.getItem('loggedInUser');
    let userData = JSON.parse(localStorage.getItem(loggedInUser));

    if (userData.balance < amount) {
        alert("Insufficient funds.");
        return;
    }

    userData.balance -= amount;
    localStorage.setItem(loggedInUser, JSON.stringify(userData));
    loadBalancePage(); // Refresh balance page
}

// Load Debt Page
function loadDebtPage() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You are not logged in!");
        window.location.href = "index.html";
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInUser));
    document.getElementById('debt').innerText = userData.debt;
}

// Increase Debt
function increaseDebt() {
    let amount = parseFloat(document.getElementById('amountDebt').value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let loggedInUser = localStorage.getItem('loggedInUser');
    let userData = JSON.parse(localStorage.getItem(loggedInUser));

    userData.debt += amount;
    localStorage.setItem(loggedInUser, JSON.stringify(userData));
    loadDebtPage(); // Refresh debt page
}

// Decrease Debt
function decreaseDebt() {
    let amount = parseFloat(document.getElementById('amountDebt').value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let loggedInUser = localStorage.getItem('loggedInUser');
    let userData = JSON.parse(localStorage.getItem(loggedInUser));

    if (userData.debt < amount) {
        alert("Debt is less than the amount to decrease.");
        return;
    }

    userData.debt -= amount;
    localStorage.setItem(loggedInUser, JSON.stringify(userData));
    loadDebtPage(); // Refresh debt page
}

// Navigate to Balance Page
function navigateToBalance() {
    window.location.href = "balance.html";
}

// Navigate to Debt Page
function navigateToDebt() {
    window.location.href = "debt.html";
}

// Navigate to Properties Page
function navigateToProperties() {
    window.location.href = "properties.html";
}

// Go Back to Dashboard
function goBack() {
    window.location.href = "dashboard.html";
}

// Logout
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}
// Store property values in localStorage
function loadPropertiesPage() {
    // Get stored values for properties, if any
    for (let i = 1; i <= 8; i++) {
        let value = localStorage.getItem(`property${i}`) || 0; // Default value is 0
        document.getElementById(`button${i}`).innerText = value;
    }
}

// Update property based on toggle state
function updateProperty(buttonId) {
    let toggleSwitch = document.getElementById('toggleSwitch').checked; // true = increase, false = decrease
    let currentValue = parseInt(document.getElementById(`button${buttonId}`).innerText);
    
    if (toggleSwitch) {
        currentValue++; // Increase value
    } else {
        // Ensure the value does not go below 0
        if (currentValue > 0) {
            currentValue--; // Decrease value
        }
    }

    // Update button's text with the new value
    document.getElementById(`button${buttonId}`).innerText = currentValue;

    // Store the new value in localStorage
    localStorage.setItem(`property${buttonId}`, currentValue);
}

// Go back to the Dashboard page
function goBack() {
    window.location.href = "dashboard.html";
}
// Set default values in local storage if not already set
if (!localStorage.getItem('properties')) {
    localStorage.setItem('properties', JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0])); // 8 properties with initial value 0
}

// Get the current values from local storage
let properties = JSON.parse(localStorage.getItem('properties'));
let isIncreasing = true; // Default: increase

// Get the property buttons and the switch
const buttons = document.querySelectorAll('.color-button');
const switchInput = document.querySelector('#toggle-switch');

// Initialize button display
updateButtons();

// Event listener for toggle switch
switchInput.addEventListener('change', function () {
    isIncreasing = switchInput.checked; // Check if it's checked (increase) or not (decrease)
});

// Event listeners for property buttons
buttons.forEach((button, index) => {
    button.addEventListener('click', function () {
        if (isIncreasing) {
            properties[index] = properties[index] + 1; // Increase the value
        } else {
            if (properties[index] > 0) { // Prevent negative numbers
                properties[index] = properties[index] - 1; // Decrease the value
            }
        }
        updateButtons(); // Update the button text
        localStorage.setItem('properties', JSON.stringify(properties)); // Save the new values in localStorage
    });
});

// Function to update the button texts to reflect current values
function updateButtons() {
    buttons.forEach((button, index) => {
        button.innerHTML = properties[index]; // Set button text to the current value
        button.style.backgroundColor = getColorByIndex(index); // Set button color
    });
}

// Function to get the background color based on the index
function getColorByIndex(index) {
    const colors = [
        "#913C99", "#35A1F9", "#8C3EAC", "#EE8728", 
        "#DD392D", "#F5F349", "#28AD2D", "#663294"
    ];
    return colors[index] || "#000"; // Default to black if something goes wrong
}
// Initialize buildings data in local storage if not set
if (!localStorage.getItem('buildings')) {
    localStorage.setItem('buildings', JSON.stringify({ hotels: 0, houses: 0 }));
}

// Retrieve existing data
let buildings = JSON.parse(localStorage.getItem('buildings'));

// Select elements
const hotelsButton = document.getElementById('hotels');
const housesButton = document.getElementById('houses');
const toggleSwitch = document.getElementById('toggle-switch');

// Ensure buttons exist before adding event listeners
if (hotelsButton && housesButton) {
    // Update button text initially
    updateBuildingButtons();

    // Add event listeners
    hotelsButton.addEventListener('click', function () {
        updateBuildingCount('hotels');
    });

    housesButton.addEventListener('click', function () {
        updateBuildingCount('houses');
    });
}

// Function to update count based on toggle
function updateBuildingCount(type) {
    let isIncreasing = toggleSwitch.checked;

    if (isIncreasing) {
        buildings[type] += 1;
    } else if (buildings[type] > 0) {
        buildings[type] -= 1;
    }

    // Save new values
    localStorage.setItem('buildings', JSON.stringify(buildings));
    updateBuildingButtons();
}

// Function to update button labels
function updateBuildingButtons() {
    if (hotelsButton) hotelsButton.textContent = `ئوتێل: ${buildings.hotels}`;
    if (housesButton) housesButton.textContent = `خانوو: ${buildings.houses}`;
}