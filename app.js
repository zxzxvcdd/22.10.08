






(function(){



    initialize();

    const $loginSection = document.querySelector("#note > .loginSection");
    if ($loginSection != null) {
      eventLogin();
      
    }



  
    // hover to show dropdown menu
    eventDropDown();
  
    // add event listener for each iconsㅋ
    eventListenerIcon("fa-address-card");
    eventListenerIcon("fa-credit-card");
    eventListenerIcon("fa-bell");
    eventListenerIcon("fa-hand-point-up");
    eventListenerIcon("fa-heart");
    eventListenerIcon("fa-hospital");
    eventListenerIcon("fa-square-check");
  
    ShowMeThePage();
    ShowMeTheTable();






    



})();


