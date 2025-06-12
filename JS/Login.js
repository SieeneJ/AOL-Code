document.addEventListener("DOMContentLoaded", () => {
    const showForm = document.getElementById('showForm');
    const toggleOverlay = document.getElementById('toggleOverlay');
    const closeForm = document.getElementById('closeForm');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    showForm.addEventListener('click', () => {
        toggleOverlay.classList.add('active');
        registerForm.reset();
        registerForm.registerUsername.focus();
    });

    closeForm.addEventListener('click', () => {
        toggleOverlay.classList.remove('active');
        showForm.focus();
    });

    registerForm.addEventListener('click', (e) => {
        if(e.target === registerForm){
            closeForm.click();
        }
    });

   function saveCredentials(username, password) {
     let users = JSON.parse(localStorage.getItem('users')) || {};
     users[username] = password;
     localStorage.setItem('users', JSON.stringify(users));
   }

   function checkCredentials(username, password) {
     let users = JSON.parse(localStorage.getItem('users')) || {};
     return users[username] === password;
   }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = registerForm.registerUsername.value.trim();
        const password = registerForm.registerPassword.value.trim();

        if(username === '' || password === ''){
            alert('Please fill in all fields.');
            return;
        }

        saveCredentials(username, password);
        alert('Registration successful! You can now login.');
        closeForm.click();
        registerForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = loginForm.loginUsername.value.trim();
        const password = loginForm.loginPassword.value.trim();

        if(username === '' || password === ''){
            alert('Please fill in all fields.');
            return;
        }

        if(checkCredentials(username, password)){
            alert('Login successful! Welcome, ' + username + '.');
            loginForm.reset();
            window.location.href = 'HomePage.html'
        }
        else{
            alert('Invalid username or password.');
        }

    })
});