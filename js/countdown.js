
// Function to start a 24-hour countdown
function startSharedCountdown(duration) {
   // Get remaining time from localStorage or initialize it
   var remainingTime = localStorage.getItem('remainingTime');
   var timer;

   // If there is remaining time stored, use it; otherwise, set the duration
   if (remainingTime) {
       timer = parseInt(remainingTime, 10);
   } else {
       timer = duration; // Start from the full duration if no time is stored
   }

   var hours, minutes, seconds;

   // Target all elements with the class "countdown"
   var countdownElements = document.querySelectorAll('.countdown');

   // Set up the interval function to update all countdown elements
   var intervalId = setInterval(function () {
       hours = Math.floor(timer / 3600);
       minutes = Math.floor((timer % 3600) / 60);
       seconds = Math.floor(timer % 60);

       // Format time values as two digits (e.g., 09:05:07)
       hours = hours < 10 ? "0" + hours : hours;
       minutes = minutes < 10 ? "0" + minutes : minutes;
       seconds = seconds < 10 ? "0" + seconds : seconds;

       // Update the text content of all countdown elements
       countdownElements.forEach(function (element) {
           element.textContent = hours + ":" + minutes + ":" + seconds;
       });

       // Decrement timer by 1 second
       if (--timer < 0) {
           clearInterval(intervalId); // Stop the countdown when it reaches 0
           timer = 0; // Set timer to 0
       }

       // Store the remaining time in localStorage
       localStorage.setItem('remainingTime', timer);
   }, 1000); // Update every second

   // Clear localStorage and reset timer if the page is closed
   window.addEventListener('beforeunload', function () {
       if (timer === 0) {
           localStorage.removeItem('remainingTime'); // Clear remaining time if countdown finished
       }
   });

   // Clear localStorage when the countdown ends
   if (timer === 0) {
       localStorage.removeItem('remainingTime');
   }
}

// Start the shared countdown for 24 hours (24 * 60 * 60 seconds)
startSharedCountdown(24 * 60 * 60);
