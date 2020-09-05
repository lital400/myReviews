/*
 * Lital Israel 
 * 9/4/2020
 * CIS4930 - Web Frameworks
 * Assignment 1 
*/

class Review {
    private _name: string;
    private _date: Date;
    private _comment: string;
    private _stars: number; 

    constructor(inptName: string, inptDate: Date, inptComment: string, inptStars: number){
        this._name = inptName;
        this._date = inptDate;
        this._comment = inptComment;
        this._stars = inptStars;
    }

    get name(): string { return this._name; }
    get date(): Date { return this._date; }
    get comment(): string { return this._comment; }
    get stars(): number { return this._stars; }
}


var reviewList: Review[] = [];   // array of Review objects
var num: number = 0;             // number of stars (global) 

const templateInsertLocation = document.getElementById('displayReviews') as HTMLElement;   // display user reviews here

var numOfReviews = document.getElementById('reviewnum')! as HTMLElement;   // display total # of reviews here 
numOfReviews.innerHTML = '0';
var outputAverage = document.getElementById('average')! as HTMLElement;    // display rating average here 
outputAverage.innerHTML = '0.0';


var btnSubmit1 = document.getElementById('submitReview')! as HTMLButtonElement; 

// when clicking the 'Post Review' button, this runs:
btnSubmit1.addEventListener("click", (event)=>{
    var reviewName = document.getElementById('name')! as HTMLInputElement; 
    var reviewComment = document.getElementById('comment')! as HTMLInputElement;
    var reviewStars: number = num;
    var reviewDate: Date = new Date();

    // name validation  
    let nameValidation = document.getElementById("nameErr") as HTMLElement;
    nameValidation.innerHTML = "";

    try { 
      if(reviewName.value == "")  
        throw "Please enter a name";
    }
    catch(err) {
        nameValidation.innerHTML = err;
        return;
    }

    // stars validation 
    let starValidation = document.getElementById("starErr") as HTMLElement;
    starValidation.innerHTML = "";
    
    try { 
        if(reviewStars == 0)  
          throw "Please select a star rating";
      }
      catch(err) {
        starValidation.innerHTML = err;
        return;
      }

    let review = new Review(reviewName.value, reviewDate, reviewComment.value, reviewStars);   // create a new review after validation 

    resetForm(reviewName, reviewComment);                       // reset form fields 
    addReview(review);                                          // add new review to array of reviews 
    updateAverage(reviewList, numOfReviews, outputAverage);     // calculate and display new average
    displayReviews(reviewList);                                 // append new review to the user reviews section 
});


function resetForm(name: HTMLInputElement, comment: HTMLInputElement ) {
    name.value = "";
    comment.value = "";
    num = 0;
    document.querySelector('.stars')!.setAttribute('data-rating', String(0));

    let stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('rated');
    });
}


function addReview(review: Review) {
    reviewList.push(review);
}


function updateAverage(list: Review[], numOfReviews: HTMLElement, outputAverage: HTMLElement){
    var average: number = 0;
    
    if(list.length > 0){
        list.forEach(element => {
            average += element.stars;
        });
        average = average / list.length;

        numOfReviews.innerHTML = String(list.length);
        outputAverage.innerHTML = String(average.toPrecision(2));
    }
    else{
        numOfReviews.innerHTML = '0';
        outputAverage.innerHTML = '0.0';
    }
    
    displayRating(average);  // update the product total star rating
}


function displayReviews(list: Review[]){
    let stringDate = formatDate(list[list.length-1].date);  // format the date

    let templateClone = getTemplateClone('responseTemplate'); 
    templateClone.content.getElementById('reviewName')!.innerText = list[list.length-1].name;
    templateClone.content.getElementById('reviewDate')!.innerText = stringDate;
    templateClone.content.getElementById('reviewComment')!.innerText = list[list.length-1].comment;
    templateClone.content.getElementById('reviewStars')!.innerHTML = displayUserRating(list[list.length-1].stars);

    templateInsertLocation.appendChild(templateClone.content);
}


function formatDate(date: Date) : string{
    return date.toLocaleDateString();
}


function getTemplateClone(templateID: string)
{
    return document.getElementById(templateID)?.cloneNode(true) as HTMLTemplateElement;
}


function displayRating(average: number){
    let ratings = document.querySelectorAll('.rate');
    let match: boolean = false;

    if(average == 0)
        return;

    ratings.forEach(function(element, index){
        if(match){
            element.classList.remove('rated');
        }else{
            element.classList.add('rated');
        }
        if(average >= index + 1 && average < index + 2){
            match = true;
        }
    });
}


// individual user review rating
function displayUserRating(rating: number) :string {
    let starHtml: string = "";

    if(rating == 1) {
        starHtml = `
            <span class="user-rate rated"></span>
            <span class="user-rate"></span>
            <span class="user-rate"></span>
            <span class="user-rate"></span>
            <span class="user-rate"></span>`;
    }
    else if(rating == 2) {
        starHtml = `
            <span class="user-rate rated"></span>
            <span class="user-rate rated"></span>
            <span class="user-rate"></span>
            <span class="user-rate"></span>
            <span class="user-rate"></span>`;
    }
    else if(rating == 3) {
        starHtml = `
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate"></span>
        <span class="user-rate"></span>`;
    }
    else if(rating == 4) {
        starHtml = `
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate"></span>`;
    }
    else if(rating == 5) {
        starHtml = `
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>
        <span class="user-rate rated"></span>`;
    }
    else {
        return "";
    }
    return starHtml;
}


// star rating selection
document.addEventListener('DOMContentLoaded', function(){
    let stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', setRating); 
    });
    
    let rating = +(document.querySelector('.stars')!.getAttribute('data-rating')!);
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
});


function setRating(ev: Event){
    let span = ev.currentTarget;
    let stars = document.querySelectorAll('.star');
    let match: boolean = false;

    stars.forEach(function(star, index){
        if(match){
            star.classList.remove('rated');
        }else{
            star.classList.add('rated');
        }
        // if this is the span that was clicked
        if(star === span){
            match = true;
            num = index + 1;
        }
    });
    document.querySelector('.stars')!.setAttribute('data-rating', String(num));
}

