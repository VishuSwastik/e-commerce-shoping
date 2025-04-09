// Function to get users from local storage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Function to save users to local storage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const users = getUsers();
    const existingUser  = users.find(user => user.email === email);
    if (existingUser ) {
        alert('User  already exists. Please login.');
        return;
    }

    users.push({ email, password });
    saveUsers(users);
    alert('Registration successful! Please log in.');
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert('Login successful!');
        window.location.href = 'index.html'; 
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Toggle between Signup and Login forms
const container = document.querySelector(".container"),
    signUpLink = document.querySelector(".signup-link"),
    loginLink = document.querySelector(".login-link");

signUpLink.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.add("active");
});

loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.remove("active");
});