document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.video-story');
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let rafID = null;

    const handleMove = (x) => {
        const walk = (x - startX) * 1.5; // adjust drag speed here
        slider.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        if (rafID) cancelAnimationFrame(rafID);
        rafID = requestAnimationFrame(() => handleMove(e.pageX - slider.offsetLeft));
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
        cancelAnimationFrame(rafID);
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        if (rafID) cancelAnimationFrame(rafID);
        rafID = requestAnimationFrame(() => {
            const x = e.touches[0].pageX - slider.offsetLeft;
            handleMove(x);
        });
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('dragging');
        cancelAnimationFrame(rafID);
    });
});

window.openVideo = function (currentVid) {
    const popup = document.querySelector('.pop-up');
    const popupContainer = popup.querySelector('.popUp-container');
    const popupVideo = popup.querySelector('video');
    const newVid = currentVid.querySelector('video');

    // Temporarily set the source so we can wait for metadata
    popupVideo.src = newVid.src;

    popupVideo.onloadedmetadata = () => {
        const isLandscape = popupVideo.videoWidth > popupVideo.videoHeight;

        // Clear both orientation classes first
        popupContainer.classList.remove('portrait', 'landscape');

        // Then add the correct one
        popupContainer.classList.add(isLandscape ? 'landscape' : 'portrait');

        popup.classList.add('active');
        popupVideo.currentTime = 0;
        popupVideo.play();
    };
};


window.closeVideo = function () {
    const popup = document.querySelector('.pop-up');
    const video = popup.querySelector('video');

    video.pause();       // Stop the video
    video.currentTime = 0; // Reset playback to the start
    popup.classList.remove('active')
};

// window.openAddPost = function () {
//     document.querySelector('.pop-up.add-post').classList.add('active');
// }

// window.closeAddPost = function () {
//     document.querySelector('.pop-up.add-post').classList.remove('active');
// }

window.toggleLike = function (id) {
    const like = document.getElementById('like' + id);

    like.classList.toggle('active');
    like.classList.add('pop');

    // Remove 'pop' after animation completes
    setTimeout(() => {
        like.classList.remove('pop');
    }, 400); // Match CSS animation duration
};

let postIdCounter = 4; // make sure this is globally declared


// window.toggleNotifBox = function () {
//     const notifBox = document.querySelector('notif-box');

//     notifBox.classList.toggle('active');
//     notifBox.classList.add('pop');

//     // Remove 'pop' after animation completes
//     setTimeout(() => {
//         notifBox.classList.remove('pop');
//     }, 400); // Match CSS animation duration
// };

window.addNewPost = function () {
    const column1 = document.getElementById('column-1');
    // const column2 = document.getElementById('column-2');

    const newPost = document.createElement('div');
    newPost.className = 'post-card textImage';
    newPost.id = `post${postIdCounter}`;

    const imageCount = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const imageUrls = [
        "https://placekitten.com/300/200",
        "https://placebear.com/300/200",
        "https://placebeard.it/300x200",
        "https://placekitten.com/301/200"
    ];

    let imagesHTML = "";
    for (let i = 0; i < imageCount; i++) {
        imagesHTML += `
            <div class="image" id="image${i + 1}">
                <img src="${imageUrls[i]}" alt="Image ${i + 1}">
            </div>
        `;
    }

    newPost.innerHTML = `
        <div class="top-section">
            <div class="left">
                <div class="prof-pic"></div>
                <div class="user-info">
                    <p class="user-name">NewUser${postIdCounter}</p>
                    <p class="user-tag">@newuser${postIdCounter}</p>
                </div>
            </div>
            <div class="right">
                <i class="fa-solid fa-share"></i>
            </div>
        </div>
        <div class="paragraph-section">
            <p class="paragraph">
                This is a dynamically added post with ${imageCount} image(s).
            </p>
        </div>
        <div class="images image${imageCount}">
            ${imagesHTML}
        </div>
        <div class="interaction-section">
            <i class="fa-regular fa-heart" onclick="toggleLike()"></i>
            <i class="fa-solid fa-repeat"></i>
            <i class="fa-regular fa-comment"></i>
        </div>
    `;

    column1.appendChild(newPost)

    
    postIdCounter++;
};



// // Alternate between columns
// if (column1.children.length <= column2.children.length) {
//     column1.appendChild(newPost);
// } else {
//     column2.appendChild(newPost);
// }
function openImage(clickedImg){
    const popUp = document.querySelector('.pop-up.popImage');
    const image = clickedImg.querySelector('img');
    const poppedImage = popUp.querySelector('.poppedImage');

    poppedImage.src = image.src;
    popUp.classList.add('active');
};


function closeImage() {
    const popUp = document.querySelector('.pop-up.popImage');
    const poppedImage = popUp.querySelector('.poppedImage');

    poppedImage.src = "";
    popUp.classList.remove('active');
}

document.querySelectorAll('.post-card').forEach(card => {
    const imageContainer = card.querySelector('.images');
    const images = imageContainer.querySelectorAll('.image');

    const count = images.length;
    imageContainer.classList.remove('image1', 'image2', 'image3', 'image4');
    if (count > 0 && count <= 4) {
        imageContainer.classList.add(`image${count}`);
    }
});

function toggleReadMore(elem) {
    const paragraph = elem.previousElementSibling;

    if (paragraph.classList.contains('expanded')) {
        paragraph.classList.remove('expanded');
        elem.innerText = 'Read more';
    } else {
        paragraph.classList.add('expanded');
        elem.innerText = 'Read less';
    }
}

function generateTextImagePost(username, tag, paragraphText, imageUrls = []) {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card', 'textImage');

    const imageElements = imageUrls.slice(0, 4).map((url, i) => `
        <div class="image" id="image${i + 1}">
            <img src="${url}" alt="">
        </div>`).join('');

    postCard.innerHTML = `
        <div class="top-section">
            <div class="left">
                <div class="prof-pic"></div>
                <div class="user-info">
                    <p class="user-name">${username}</p>
                    <p class="user-tag">@${tag}</p>
                </div>
            </div>
            <div class="right"><i class="fa-solid fa-share"></i></div>
        </div>
        <div class="paragraph-section">
            <p class="paragraph">${paragraphText}</p>
        </div>
        <div class="images image${imageUrls.length}">
            ${imageElements}
        </div>
        <div class="interaction-section">
            <i class="fa-regular fa-heart" onclick="toggleLike()"></i>
            <i class="fa-solid fa-repeat"></i>
            <i class="fa-regular fa-comment"></i>
        </div>`;
    
    document.getElementById('column-1').appendChild(postCard);
}

function generateTextOnlyPost(username, tag, title, paragraphText, views = 0, readTime = "1 min") {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card', 'textOnly');

    postCard.innerHTML = `
        <div class="top-section">
            <div class="left">
                <div class="prof-pic"></div>
                <div class="user-info">
                    <p class="user-name">${username}</p>
                    <p class="user-tag">@${tag}</p>
                </div>
            </div>
            <div class="right"><i class="fa-solid fa-share"></i></div>
        </div>
        <div class="post-description">
            <h2 class="title">${title}</h2>
            <div class="status">
                <div class="views"><i class="fa fa-eye"></i><p class="view-count">${views} views</p></div>
                <div class="read-time"><i class="fa-regular fa-clock"></i><p class="time">${readTime}</p></div>
            </div>
        </div>
        <div class="paragraph-section">
            <p class="paragraph">${paragraphText}</p>
            <span class="read-more" onclick="toggleReadMore(this)">Read more</span>
        </div>
        <div class="interaction-section">
            <i class="fa-regular fa-heart" onclick="toggleLike()"></i>
            <i class="fa-solid fa-repeat"></i>
            <i class="fa-regular fa-comment"></i>
        </div>`;

    document.getElementById('column-1').appendChild(postCard);
}

function generateRatingPost(username, tag, restaurantName, address, ratingText, numericRating, review) {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card', 'rating');

    postCard.innerHTML = `
        <div class="half" id="half-1">
            <div class="top-section">
                <div class="left">
                    <div class="prof-pic"></div>
                    <div class="user-info">
                        <p class="user-name">${username}</p>
                        <p class="user-tag">@${tag}</p>
                    </div>
                </div>
                <div class="right"><i class="fa-solid fa-share"></i></div>
            </div>
            <div class="rating-section">
                <div class="restaurants-info">
                    <div class="left">
                        <p class="restaurant-name">${restaurantName}</p>
                        <p class="restaurant-address">${address}</p>
                    </div>
                    <div class="right">
                        <p class="rating-num">${numericRating}</p>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                <div class="stars-option">
                    ${[...Array(5)].map(() => `<i class="fa-regular fa-star"></i>`).join('')}
                </div>
            </div>
        </div>
        <div class="half" id="half-2">
            <div class="paragraph-section">
                <p class="paragraph">"${review}"</p>
            </div>
            <div class="interaction-section">
                <i class="fa-regular fa-heart" onclick="toggleLike()"></i>
                <i class="fa-solid fa-repeat"></i>
                <i class="fa-regular fa-comment"></i>
            </div>
        </div>`;

    document.getElementById('column-2').appendChild(postCard);
}

// document.addEventListener("input", function (event) {
//     if (event.target.classList.contains("inputText")) {
//         autoResizeTextarea(event.target);
//     }
// });

// function autoResizeTextarea(textarea) {
//     textarea.style.height = "auto"; // Reset height
//     textarea.style.height = (textarea.scrollHeight) + "px"; // Set new height
// }