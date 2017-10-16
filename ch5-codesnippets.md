#A
_____________________________________________________________________________
    /*create event listeners for left arrow, right arrow, and center figure element    Ref pp 297-301*/
    function createEventListeners(){  
    //note that the code below is broken up into three decision structures for the left and right arrows and central figure
      //was the leftarrow clicked?
      var leftarrow = document.getElementById("leftarrow");
      if(leftarrow.addEventListener) {
        leftarrow.addEventListener("click", leftArrow, false);
      }  else if (leftarrow.attachEvent){
        leftarrow.attachEvent("onclick", leftArrow);
      }
      //was the rightarrow clicked?
      var rightarrow = document.getElementById("rightarrow");
      if(rightarrow.addEventListener) {
        rightarrow.addEventListener("click", rightArrow, false);
      }  else if (rightarrow.attachEvent){
        rightarrow.attachEvent("onclick", rightArrow);
      }
      // was the central figure clicked?
      var mainFig = document.getElementsByTagName("img")[1];  //get the second (middle) element in the image gallery
      if(mainFig.addEventListener) {
        mainFig.addEventListener("click", zoomFig, false);
      } else if (mainFig.attachEvent)  {
        mainFig.attachEvent("onclick", zoomFig)
      }	
    }
    
    
#B
_____________________________________________________________________________

    /* add image source values to the HTML img elements based on the specified photoOrder array    Ref:  pg 307 */
    function populateFigures() {
      var filename;
      var currentFig;
      /*loop through the jpgs in the images folder and assign to a corresponding img element in the
        photoOrder array */
      for (var i = 1; i < 4; i++)	{	
        filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
        currentFig = document.getElementsByTagName("img")[i-1];  //subtract 1 from the counter to match the array value 
        currentFig.src = filename;
      }
    }

#C1
_______________________________________________________________________________
    /*add two new elements to the DOM to create a 5-image layout Ref pp 310-311  Steps 1-4 */
    function previewFive(){
      //create figure and img nodes for the fifth image
      var lastFigure = document.createElement("figure");  //set the attributes for the image holder (figure)
      lastFigure.id = "fig5";
      lastFigure.style.zIndex = "5";  //this is the 5th element in the photoOrder array
      lastFigure.style.position = "absolute";    //the image holder should always appear in the same location (not move around)
      lastFigure.style.right = "45px";
      lastFigure.style.top = "67px";

      var lastImage = document.createElement("img");  //create the image element and set width/height attribute values 
      lastImage.width = "240";
      lastImage.height = "135";
    }
    
#C2
_________________________________________________________________________________

    //was the "Show more images" button clicked?  Ref:  pg 311 Step 5
      var showAllButton = document.querySelector("#fiveButton p");  //note that this accesses the button via the CSS selector
      if (showAllButton.addEventListener) {
        showAllButton.addEventListener("click", previewFive, false);
      } else if (showAllButton.attachEvent) {
        showAllButton.attachEvent("onclick", previewFive);
      }

#D
__________________________________________________________________________________

    //now that you've created the image & figure, append them to the article in two separate steps Ref:  pg 313 Steps 2-4
	var articleE1 = document.getElementsByTagName("article")[0];   //returns elements within the article section  
	lastFigure.appendChild(lastImage);  //append the image to the figure
	articleE1.appendChild(lastFigure);  //append the figure to the article section

#E1
___________________________________________________________________________________
    //clone the figure/image and modify to make it the first figure  Ref:  pp 316-318
	var firstFigure = lastFigure.cloneNode(true);   //clone firstFigure node from lastFigure
	//modify the attributes for firstFigure
	firstFigure.id = "fig1";
	firstFigure.style.right = "";   //this figure will appear on the left instead of the right  -->see line 62
	firstFigure.style.left = "45px";
	
	articleE1.appendChild(firstFigure);
	
	//add the images to the src attributes for each of the new images
	document.getElementsByTagName("img")[3].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
	document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";

#E2
_____________________________________________________________________________________
    /* add image source values to the HTML img elements based on the specified photoOrder array    Ref:  pg 307 
       Modified with added code   Ref:  318-319 */
    function populateFigures() {
    var filename;
      var currentFig;
      /*loop through the jpgs in the images folder and assign to a corresponding img element in the
        photoOrder array */
      if(figureCount===3) {
        for (var i = 1; i < 4; i++)	{	//3 image gallery
          filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
          currentFig = document.getElementsByTagName("img")[i-1];  //subtract 1 from the counter to match the array value 
          currentFig.src = filename;
          } 
        } else{
          for (var i = 0; i < 5; i++)	{	//5 image gallery
          filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
          currentFig = document.getElementsByTagName("img")[i];  //in this case, the counter will match the array value 
          currentFig.src = filename;
          } 
      }
    }

#E3
__________________________________________________________________________________
    //Add to the end of the previewFive() function before closing bracket   Ref:  pg 319 Step 12
    figureCount = 5;    //ensures that the populateFigures() function assigns five images
    
#F   Replaces append Child method in previewFive() function
___________________________________________________________________________________

    //now that you've created the image & figure, append them to the article in two separate steps Ref:  pg 313 Steps 2-4
      //modified to use the insertBefore method to insert the figures in the correct element sequence   Ref:  pg 322
      var articleE1 = document.getElementsByTagName("article")[0];   //returns elements within the article section  
      lastFigure.appendChild(lastImage);  //append the image to the figure
      articleE1.insertBefore(lastFigure, document.getElementById("rightarrow"));  //insert before the right arrow element

      //clone the figure/image and modify to make it the first figure  Ref:  pp 316-318
      var firstFigure = lastFigure.cloneNode(true);   //clone firstFigure node from lastFigure
      //modify the attributes for firstFigure
      firstFigure.id = "fig1";
      firstFigure.style.right = "";   //this figure will appear on the left instead of the right  -->see line 62
      firstFigure.style.left = "45px";

      articleE1.insertBefore(firstFigure, document.getElementById("fig2"));  //insert before fig2

      //add the images to the src attributes for each of the new images
      document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
      document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
      
#G1
____________________________________________________________________________________

    //use the removeChild() method to remove the extra images and return to a 3-image format  Ref:  pg 324
      var numberButton = document.querySelector("#fiveButton p");  //store the original values for future use if needed
      numberButton.innerHTML = "Show fewer images";  //dynamically change the button text
      if (numberButton.addEventListener) {
        numberButton.removeEventListener("click", previewFive, false);  
        numberButton.addEventListener("click", previewThree, false);   //remove the added images
      } else if (numberButton.atttachEvent) {
        numberButton.detachEvent("onclick", previewFive);
        numberButton.attachEvent("onclick", previewThree);
      }

#G2
_____________________________________________________________________________________

    //function to switch from a 5-image to a 3-image gallery format   Ref:  pg 325
    function previewThree(){
      /*these two variables hold the first element in the gallery and the button values
        in case the user decides to change back to the 5-image format */
      var articleE1 = document.getElementsByTagName("article")[0];
      var numberButton = document.querySelector("#fiveButton p");
      /*removes the first and last figure/image elements
        note that these values are not stored in computer memeory*/
      articleE1.removeChild(document.getElementById("fig1"));
      articleE1.removeChild(document.getElementById("fig5"));
      /*set the new button text value and switch eventListeners*/
      figureCount = 3;
      numberButton.innerHTML = "Show more images";
      if (numberButton.addEventListener) {
        numberButton.removeEventListener("Click", previewThree, false);
        numberButton.addEventListener("click", previewFive, false);
      } else if (numberButton.attachEvent) {
        numberButton.detachEvent("onclick", previewThree);
        numberButton.attachEvent("onclick", previewFive);
      }
    }
    
#H
______________________________________________________________________________________

    //opens a new window tab to display a full-sized image  ref:  pp 333-334
    var zoomWindow = window.open("zoom.html", "zoomwin", "width-960, height=600");
    zoomWindow.focus();
    
#I1 (replaces existing code in the zoom.js file)
_______________________________________________________________________________________

    /* global variables */
    var photoOrderArray = window.opener.photoOrder;
    var figFilename = "https://cdn.glitch.com/60727fd5-6722-4373-b04f-8543cf0cb884%2FIMG_0" + photoOrderArray[2] + ".jpg";


    /* populate img element and create event listener */
    function pageSetup() {
       document.getElementsByTagName("img")[0].src = figFilename; // assign filename to img element
       createEventListener();
    }


    //close the zoomWin tab  Ref:  pp 336 Step 2-3
    function closeWin(){
      window.close();
    }

    /*create an event listener for the close function  Ref:  pg 336
    Note that this does not conflict with CreateEventListeners (plural) above */
    /*create the event listener for the close button   Ref:  Step 4 pg 336*/
    function createEventListener(){
      var closeWindowDiv = document.getElementsByTagName("p")[0];
      if(closeWindowDiv.addEventListener) {
        closeWindowDiv.addEventListener("click", closeWin, false);
      } else if (closeWindowDiv.attachEvent){
        closeWindowDiv.attachEvent("onclick", closeWin);
      }
    }
    /* Populate img element and create event listener – Ref:  337
         Note that, in this case, we are using the large images for the “zoom” view*/
    function pageSetup() {
       document.getElementsByTagName("img")[0].src = figFilename; // assign filename to img element
       createEventListener();
    }
    
#I2
____________________________________________________________________________________
    app.get("zoom.html", function (request, response) {
      response.sendFile(__dirname + '/public/zoom.html');
    });

#J1
____________________________________________________________________________________

    var autoAdvance = setInterval(rightArrow, 5000) //automatically "clicks" the right arrow button every 5 seconds
    
#J2
_____________________________________________________________________________________

    clearInterval(autoAdvance)  //allows the user to manually advance pictures using the left arrow—Ref:  Step 2 pg 339
    
#J3
_____________________________________________________________________________________

    /* new rightArrow function to clear the automatic advance  Ref:  steps 4-6 pp 340-341*/
    function rightArrow(){
      clearInterval(autoAdvance);
      rightAdvance();
    }

    /* shift all images one figure to the left, and change values in photoOrder array to match  */
    function rightAdvance() {
       for (var i = 0; i < 5; i++) {
          if ((photoOrder[i] + 1) === 6) {
             photoOrder[i] = 1;
          } else {
             photoOrder[i] += 1;
          }
          populateFigures();
       }
    }
    
#J4 (replaces the original declaration in global variables)
______________________________________________________________________________________________

    var autoAdvance = setInterval(rightAdvance, 5000) //automatically "clicks" the right arrow button every 5 seconds


