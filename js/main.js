
function filterImages ()
{
  // filtering images

  const list = document.querySelectorAll('.filter-option');
  const gImage = document.querySelectorAll('.g-image');

  for (let i = 0; i < list.length; i++)
  {
    list[i].addEventListener('click', function ()
    {
      for (let j = 0; j < list.length; j++)
      {
        list[j].classList.remove('active');
      }

      this.classList.add('active');

      let dataFilter = this.getAttribute('data-filter');

      for (let k = 0; k < gImage.length; k++)
      {
        gImage[k].classList.remove('active');
        gImage[k].classList.add('hide');

        if (gImage[k].getAttribute('data-item') == dataFilter || dataFilter == "all")
        {

          gImage[k].classList.remove('hide');
          gImage[k].classList.add('active');
        }
      }

    })
  }

// filtering images 
};



















  function setupGalleryMedia(){

  //getting all required elements
  const gallery = document.querySelectorAll(".g-image"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector(".imge"),
    previewVideo = previewBox.querySelector(".videoo"),
    closeIcon = previewBox.querySelector(".box-icon"),
    currentImg = previewBox.querySelector(".current-img"),
    totalImg = previewBox.querySelector(".total-img"),
    shadow = document.querySelector(".box-shadow");

  window.onload = () =>
  {
    for (let i = 0; i < gallery.length; i++)
    {
      totalImg.textContent = gallery.length; //passing total img length to totalImg variable
      let newIndex = i; //passing i value to newIndex variable
      let clickedImgIndex; //creating new variable

      gallery[i].onclick = () =>
      {
        clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
        function preview()
        {
          currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
          let imageURL;

          if (gallery[newIndex].querySelector(".imge"))
          {
            imageURL = gallery[newIndex].querySelector(".imge").src;
            previewImg.src = imageURL;
            previewImg.style.display = "block";
            previewVideo.style.display = "none";
          }
          else if (gallery[newIndex].querySelector(".videoo"))
          {
            imageURL = gallery[newIndex].querySelector(".videoo").src;
            previewVideo.src = imageURL;
            previewVideo.style.display = "block";
            previewImg.style.display = "none";
          }
        
        }
        preview(); //calling above function

        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");
        if (newIndex == 0)
        { //if index value is equal to 0 then hide prevBtn
          prevBtn.style.display = "none";
        }
        if (newIndex >= gallery.length - 1)
        { //if index value is greater and equal to gallery length by -1 then hide nextBtn
          nextBtn.style.display = "none";
        }
        prevBtn.onclick = () =>
        {
          newIndex--; //decrement index
          if (newIndex == 0)
          {
            preview();
            prevBtn.style.display = "none";
          } else
          {
            preview();
            nextBtn.style.display = "block";
          }
        }
        nextBtn.onclick = () =>
        {
          newIndex++; //increment index
          if (newIndex >= gallery.length - 1)
          {
            preview();
            nextBtn.style.display = "none";
          } else
          {
            preview();
            prevBtn.style.display = "block";
          }
        }
        document.querySelector("body").style.overflow = "hidden";
        previewBox.classList.add("show");
        shadow.style.display = "block";
        closeIcon.onclick = () =>
        {
          newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
          prevBtn.style.display = "block";
          nextBtn.style.display = "block";
          previewBox.classList.remove("show");
          shadow.style.display = "none";
          document.querySelector("body").style.overflow = "scroll";
        }
      }

    }
  }

  };
















function setupVideoPlayer()
{

  // video player section
  const videoPlayer = document.querySelector('.video-player')
  const video = videoPlayer.querySelector('.video')
  const playButton = videoPlayer.querySelector('.play-button')

  //Play and Pause button
  playButton.addEventListener('click', (e) =>
  {
    if (video.paused)
    {
      video.play()
      e.target.textContent = '❚ ❚'
    } else
    {
      video.pause()
      e.target.textContent = '►'
    }
  })
// video player section


};


function setupCarousel(){
  // projects carousel section 

  const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

  let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

  const showHideIcons = () =>
  {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
  }

  arrowIcons.forEach(icon =>
  {
    icon.addEventListener("click", () =>
    {
      let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
      // if clicked icon is left, reduce width value from the carousel scroll left else add to it
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
  });

  const autoSlide = () =>
  {
    // if there is no image left to scroll then return from here
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft)
    { // if user is scrolling to the right
      return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }

  const dragStart = (e) =>
  {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  }

  const dragging = (e) =>
  {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  }

  const dragStop = () =>
  {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);

  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);

  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);


};


function setupCounter(){

  // Get the counter elements
  const counters = document.querySelectorAll('.count');

  // Set the target values for each counter
  const targetValues = [120, 80, 12, 19];

  // Function to animate the counters
  function animateCounters()
  {
    counters.forEach((counter, index) =>
    {
      const target = targetValues[index];
      const count = parseInt(counter.textContent);
      const increment = (target / 5000); // Adjust this value for a slower animation

      if (count < target)
      {
        counter.textContent = Math.ceil(count + increment);
        setTimeout(animateCounters, 500); // Increase this value for a slower animation
      } else
      {
        counter.textContent = target;
      }
    });
  }

  // Trigger the counter animation
  animateCounters();


// projects carousel section


};

function setupSwiper ()
{

  // swiper section testimonial
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // swiper section testimonial

};

function setupGalleryProjects()
{

  //getting all required elements
  const gallery = document.querySelectorAll(".g-image"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector(".imge"),
    closeIcon = previewBox.querySelector(".box-icon"),
    currentImg = previewBox.querySelector(".current-img"),
    totalImg = previewBox.querySelector(".total-img"),
    shadow = document.querySelector(".box-shadow");

  window.onload = () =>
  {
    for (let i = 0; i < gallery.length; i++)
    {
      totalImg.textContent = gallery.length; //passing total img length to totalImg variable
      let newIndex = i; //passing i value to newIndex variable
      let clickedImgIndex; //creating new variable

      gallery[i].onclick = () =>
      {
        clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
        function preview()
        {
          currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
          let imageURL = gallery[newIndex].querySelector(".imge").src; //getting user clicked img url
          previewImg.src = imageURL; //passing user clicked img url in previewImg src
        }
        preview(); //calling above function

        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");
        if (newIndex == 0)
        { //if index value is equal to 0 then hide prevBtn
          prevBtn.style.display = "none";
        }
        if (newIndex >= gallery.length - 1)
        { //if index value is greater and equal to gallery length by -1 then hide nextBtn
          nextBtn.style.display = "none";
        }
        prevBtn.onclick = () =>
        {
          newIndex--; //decrement index
          if (newIndex == 0)
          {
            preview();
            prevBtn.style.display = "none";
          } else
          {
            preview();
            nextBtn.style.display = "block";
          }
        }
        nextBtn.onclick = () =>
        {
          newIndex++; //increment index
          if (newIndex >= gallery.length - 1)
          {
            preview();
            nextBtn.style.display = "none";
          } else
          {
            preview();
            prevBtn.style.display = "block";
          }
        }
        document.querySelector("body").style.overflow = "hidden";
        previewBox.classList.add("show");
        shadow.style.display = "block";
        closeIcon.onclick = () =>
        {
          newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
          prevBtn.style.display = "block";
          nextBtn.style.display = "block";
          previewBox.classList.remove("show");
          shadow.style.display = "none";
          document.querySelector("body").style.overflow = "scroll";
        }
      }

    }
  }

};