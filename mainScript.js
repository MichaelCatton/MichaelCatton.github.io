// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function () {
    myFunction()
};

function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var currentIndex = -1; // Initialize current index
var images = document.querySelectorAll('.w3-round'); // Select all images

function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("billedeModal").style.display = "block"; // Updated to match your modal's ID
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    onClick(images[currentIndex]); // Show the new image
}

// Listen for arrow key presses to navigate the images
document.addEventListener('keydown', function (event) {
    if (modal.style.display == "block") { // Only navigate if modal is open
        if (event.key === 'ArrowRight') {
            changeImage(1); // Next image
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1); // Previous image
        }
    }
});

$(function() {
    $(".carousel").on("slide.bs.carousel", function(e) {
        var prev = $(this)
            .find(".active")
            .index();
        var next = $(e.relatedTarget).index();
        var video = $("#video-player")[0];
        var videoSlide = $("#video-player")
            .closest(".carousel-item")
            .index();
        if (next === videoSlide) {
            if (video.tagName == "IFRAME") {
                player.playVideo();
            } else {
                createVideo(video);
            }
        } else {
            if (typeof player !== "undefined") {
                player.pauseVideo();
            }
        }
    });
});

function createVideo(video) {
    var youtubeScriptId = "youtube-api";
    var youtubeScript = document.getElementById(youtubeScriptId);
    var videoId = video.getAttribute("data-video-id");

    if (youtubeScript === null) {
        var tag = document.createElement("script");
        var firstScript = document.getElementsByTagName("script")[0];

        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = youtubeScriptId;
        firstScript.parentNode.insertBefore(tag, firstScript);
    }

    window.onYouTubeIframeAPIReady = function() {
        window.player = new window.YT.Player(video, {
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                modestbranding: 1,
                rel: 0
            }
        });
    };
}

$(document).ready(function () {
    var $carousel = $('.carousel');

    $carousel.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
    });

    var $prevBtn = $('.slick-prev');
    var $nextBtn = $('.slick-next');

    $prevBtn.click(function () {
        $carousel.slick('slickPrev');
    });

    $nextBtn.click(function () {
        $carousel.slick('slickNext');
    });

    $carousel.on('afterChange', function (event, slick, currentSlide) {
        $prevBtn.toggleClass('slick-disabled', currentSlide === 0);
        $nextBtn.toggleClass('slick-disabled', currentSlide === slick.slideCount - 1);
    });

    var maxCardHeight = 0;
    $('.card').each(function () {
        var cardHeight = $(this).outerHeight();
        if (cardHeight > maxCardHeight) {
            maxCardHeight = cardHeight;
        }
    });
    $('.card').outerHeight(maxCardHeight);
});
