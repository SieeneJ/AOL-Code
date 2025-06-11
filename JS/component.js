document.addEventListener("DOMContentLoaded", () => {
    const notifBox = document.querySelector('.notif-box');
    const notifCount = document.querySelector('.notif-count');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    renderCalendar(currentMonth, currentYear);

    function updateNotif() {
        const audio = new Audio('./Assets/navbar/notif.wav');
        audio.volume = 1;
        audio.preload = 'auto';
        const currentCount = parseInt(notifCount.textContent) || 0;
        const newCount = currentCount + 1;
        notifCount.textContent = newCount;

        audio.play();
        notifBox.classList.add('active');
        notifCount.classList.add('active');
        notifCount.classList.add('pop');

        setTimeout(() => {
            notifCount.classList.remove('pop');
        }, 300);
    }

    setInterval(updateNotif, 20000); // Every 20 seconds
});

window.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('mediaFiles');
    const uploadButton = document.getElementById('imageUploadButton');
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });
});

let selectedRating = 0;

function starRating(rating) {
    const stars = document.querySelectorAll('.rating-stars .star');

    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove("far");
            star.classList.add("fas");
        } else {
            star.classList.remove("fas");
            star.classList.add("far");
        }
    });
}

function resetStarRating() {
    const stars = document.querySelectorAll('.rating-stars .star');
    stars.forEach((star) => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
}

window.toggleNotifBox = function () {
    const notifBox = document.querySelector('notif-box');

    notifBox.classList.toggle('active');
    notifBox.classList.add('pop');

    // Remove 'pop' after animation completes
    setTimeout(() => {
        notifBox.classList.remove('pop');
    }, 400); // Match CSS animation duration
};

window.openAddPost = function () {
    document.querySelector('.pop-up.add-post').classList.add('active');
}

window.closeAddPost = function () {
    document.querySelector('.pop-up.add-post').classList.remove('active');
    resetStarRating();
}

// let postCounter = 1; // Keep track of post IDs
let currentRating = 0; // Set this in starRating()

function starRating(value) {
    currentRating = value;
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.remove('fa-solid');
        star.classList.add(index < value ? 'fa-solid' : 'fa-regular');
    });
}

function checkLineCount() {
    const original = document.getElementById('postDescription');

    const clone = document.createElement('div');
    const text = original.value || original.innerText || original.textContent;
    clone.textContent = text;

    const style = window.getComputedStyle(original);
    clone.style.font = style.font;
    clone.style.lineHeight = style.lineHeight;
    clone.style.whiteSpace = 'pre-wrap';
    clone.style.wordWrap = 'break-word';
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.width = `${original.clientWidth}px`;

    document.body.appendChild(clone);

    let lineHeight = parseFloat(style.lineHeight);
    if (isNaN(lineHeight)) {
        lineHeight = parseFloat(style.fontSize) * 1.2;
    }

    const scrollHeight = clone.scrollHeight;
    document.body.removeChild(clone);

    const lineCount = Math.round(scrollHeight / lineHeight);
    console.log(`Estimated lines: ${lineCount}`);
    return lineCount;
}

function submitNewPost() {
    const title = document.getElementById('postTitle').value.trim();
    const description = document.getElementById('postDescription').value.trim();
    const files = document.getElementById('mediaFiles').files;

    if (!title || !description) {
        alert("Please fill out the title and description.");
        return;
    }


    postCounter = getLastID();
    const postId = `post-${postCounter}`;
    const viewCountId = `view-count${postCounter}`;
    const paragraphId = `post-paragraph-${postCounter}`;
    const likeId = `like${postCounter}`;

    // Create image elements from files
    let imagesHTML = '';
    for (let i = 0; i < Math.min(files.length, 4); i++) {
        const fileURL = URL.createObjectURL(files[i]);
        imagesHTML += `
            <div class="image" onclick="openImage(this)">
                <img src="${fileURL}" alt="uploaded image">
            </div>
        `;
    }

    let ratingHTML = '';
    if (currentRating > 0) {
        ratingHTML = [...Array(5)].map((_, i) =>
            `<div class="${i < currentRating ? 'fa-solid' : 'fa-regular'} fa-star"></div>`
        ).join('')
    };

    let readMoreHTML = '';
    if (checkLineCount() > 4) {
        readMoreHTML = '<span class="read-more" onclick="toggleReadMore(this)">Read more</span>'
    }

    const now = new Date()
    const postDate = now.getDate();
    const postMonth = now.getMonth()+1;
    const postYear = now.getFullYear();
    const hourPosted = now.getHours();
    const minutePosted = now.getMinutes();
    const postedTime =  `${postDate}-${postMonth}-${postYear} ${hourPosted}:${minutePosted}`;


    const postHTML = `
            <div class="post-card" id="${postId}">
                <div class="half" id="half-1">
                    <div class="description-container">
                        <div class="post-description">
                            <h2 class="title">${title}</h2>
                            <div class="status">
                                <div class="views">
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                    <p class="view-count" id="${viewCountId}">0 views</p>
                                </div>
                                <div class="post-time">
                                    <i class="fa-regular fa-clock"></i>
                                    <p class="time">${postedTime}</p>
                                </div>
                            </div>
                        </div>
                        <div class="location-section">
                            <div class="restaurants-info">
                                <p class="restaurant-name">Name of restaurant</p>
                                <p class="restaurant-address">Restaurant address</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="half" id="half-2">
                    <div class="images image${Math.min(4, files.length)}">
                        ${imagesHTML}
                    </div>
                    <div class="top-section">
                        <div class="left">
                            <div class="prof-pic"></div>
                            <div class="user-info">
                                <p class="user-name">You</p>
                                <p class="user-tag">@you</p>
                            </div>
                        </div>
                        <div class="right">
                            <i class="fa-solid fa-share"></i>
                        </div>
                    </div>
                    <div class="rating-section">
                        ${ratingHTML}
                    </div>
                    <div class="paragraph-section">
                        <p class="paragraph" id="${paragraphId}">${description}</p>
                        ${readMoreHTML}
                    </div>
                    <div class="interaction-section">
                        <i class="fa-regular fa-heart" id="${likeId}" onclick="toggleLike(${postCounter})"></i>
                        <i class="fa-solid fa-repeat"></i>
                        <i class="fa-regular fa-comment"></i>
                    </div>
                </div>
            </div>
    `;

    const postContainer = document.querySelector('.column');
    postContainer.insertAdjacentHTML('beforeend', postHTML);

    // Clear form
    document.getElementById('postTitle').value = '';
    document.getElementById('postDescription').value = '';
    document.getElementById('mediaFiles').value = '';
    currentRating = 0;
    starRating(0);

    // Close popup
    closeAddPost();
}


function getLastID() {
    const posts = document.querySelectorAll('.post-card');
    let lastID = 1;

    posts.forEach(post => {
        lastID++;
    })

    return lastID;
}