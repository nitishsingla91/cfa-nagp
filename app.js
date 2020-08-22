import MainComponent from './js/components/main.component.js';

if('serviceWorker' in  navigator){

    window.addEventListener('load', () =>{

        navigator.serviceWorker
        .register('../sw_cached_pages.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log(`Service Worker Error: ${err}`));
    });
}


// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");


//Show today Date
const options = {weekday: "long", month:"short", day:"numeric"}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options);


clear.addEventListener("click",function(event){
    localStorage.clear();
    location.reload();

});

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});


window.customElements.define('todo-application', MainComponent);