/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo gallery
 *    Variables and functions
 *    Author: 
 *    Date:   

 *    Filename: photos.js
 */

// https://cdn.glitch.com/60727fd5-6722-4373-b04f-8543cf0cb884%2FIMG_05sm.jpg?1489513659213

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];
var figureCount = 3;

/* add image source values to the HTML img elements based on the specified photoOrder array    Ref:  pg 307 */
function populateFigures() {
  var filename;
  var currentFig;
  /*loop through the jpgs in the images folder and assign to a corresponding img element in the
    photoOrder array */
  for (var i = 1; i < 4; i++)	{	
    filename = "https://cdn.glitch.com/60727fd5-6722-4373-b04f-8543cf0cb884%2FIMG_0" + photoOrder[i] + "sm.jpg";
    currentFig = document.getElementsByTagName("img")[i-1];  //subtract 1 from the counter to match the array value 
    currentFig.src = filename;
  }
}

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }
}

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
  
  //now that you've created the image & figure, append them to the article in two separate steps Ref:  pg 313 Steps 2-4
  var articleE1 = document.getElementsByTagName("article")[0];   //returns elements within the article section  
  lastFigure.appendChild(lastImage);  //append the image to the figure
  articleE1.appendChild(lastFigure);  //append the figure to the article section
  
  //clone the figure/image and modify to make it the first figure  Ref:  pp 316-318
  var firstFigure = lastFigure.cloneNode(true);   //clone firstFigure node from lastFigure
  //modify the attributes for firstFigure
  firstFigure.id = "fig1";
  firstFigure.style.right = "";   //this figure will appear on the left instead of the right  -->see line 62
  firstFigure.style.left = "45px";

  articleE1.appendChild(firstFigure);

  //add the images to the src attributes for each of the new images
  document.getElementsByTagName("img")[3].src = "https://cdn.glitch.com/60727fd5-6722-4373-b04f-8543cf0cb884%2FIMG_0" + photoOrder[4] + "sm.jpg";
  document.getElementsByTagName("img")[4].src = "https://cdn.glitch.com/60727fd5-6722-4373-b04f-8543cf0cb884%2FIMG_0" + photoOrder[0] + "sm.jpg";
}

/* open center figure in separate window */
function zoomFig() {
   
}

/* create event listeners and populate image elements */
function setUpPage() {
  createEventListeners();
  populateFigures();
}

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
    
    //was the "Show more images" button clicked?  Ref:  pg 311 Step 5
    var showAllButton = document.querySelector("#fiveButton p");  //note that this accesses the button via the CSS selector
    if (showAllButton.addEventListener) {
      showAllButton.addEventListener("click", previewFive, false);
    } else if (showAllButton.attachEvent) {
      showAllButton.attachEvent("onclick", previewFive);
    }
  }

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}