class Review {
    constructor(inptName, inptComment, inptStars) {
        this._name = "";
        this._comment = "";
        this._name = inptName;
        this._comment = inptComment;
        this._stars = inptStars;
    }
    get name() { return this._name; }
    get comment() { return this._comment; }
    get stars() { return this._stars; }
}
var reviewList = []; // array of Review objects
const templateInsertLocation = document.getElementById('displayReviews');
var numOfReviews = document.getElementById('reviewnum');
numOfReviews.innerHTML = '0';
var outputAverage = document.getElementById('average');
outputAverage.innerHTML = '0.0';
var btnSubmit1 = document.getElementById('submitReview');
// when clicking the submit button, this runs:
btnSubmit1.addEventListener("click", (event) => {
    var reviewName = document.getElementById('name');
    var reviewComment = document.getElementById('comment');
    var reviewStars = document.getElementById('stars'); // ******* ENSURE start are selected - submit with no start = error *******
    let review = new Review(reviewName.value, reviewComment.value, +reviewStars.value);
    // var test = document.getElementById('displayReviews')! as HTMLElement; 
    // test.innerHTML = reviewList[0].name;
    addReview(review);
    updateAverage(reviewList);
    displayReviews(reviewList); // display in a certain place -> getElementById('displayReviews') and replace it with the display (AJAX?)
});
function addReview(review) {
    reviewList.push(review);
}
function displayReviews(list) {
    let templateClone = getTemplateClone('responseTemplate');
    templateClone.content.getElementById('reviewName').innerText = list[list.length - 1].name;
    templateClone.content.getElementById('reviewComment').innerText = list[list.length - 1].comment;
    templateClone.content.getElementById('reviewStars').innerText = String(list[list.length - 1].stars);
    templateInsertLocation.appendChild(templateClone.content);
    // var display = document.getElementById('displayReviews')! as HTMLElement; 
    // display.insertAdjacentHTML('beforeend', `Name: ${list[list.length-1].name}
    //                                         Comment: ${list[list.length-1].comment}
    //                                         Stars: ${list[list.length-1].stars} </br>`);
    // display.innerText += `Name: ${list[list.length-1].name}
    //                     Comment: ${list[list.length-1].comment}
    //                     Stars: ${list[list.length-1].stars} </br>`;
    // list.forEach(e => {
    //     display.innerHTML += `Name: ${e.name}
    //             Comment: ${e.comment}
    //             Stars: ${e.stars} </br>`;
    // });
}
function getTemplateClone(templateID) {
    var _a;
    return (_a = document.getElementById(templateID)) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
}
function updateAverage(list) {
    var numOfReviews = document.getElementById('reviewnum');
    var outputAverage = document.getElementById('average');
    var average = 0;
    if (list.length > 0) {
        list.forEach(element => {
            average += element.stars;
        });
        average = average / list.length;
        numOfReviews.innerHTML = String(list.length);
        outputAverage.innerHTML = String(average);
    }
    else {
        numOfReviews.innerHTML = '0';
        outputAverage.innerHTML = '0.0';
    }
}
// ----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    let stars = document.querySelectorAll('.star');
    stars.forEach(function (star) {
        star.addEventListener('click', setRating);
    });
    let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
});
function setRating(ev) {
    let span = ev.currentTarget;
    let stars = document.querySelectorAll('.star');
    let match = false;
    let num = 0;
    stars.forEach(function (star, index) {
        if (match) {
            star.classList.remove('rated');
        }
        else {
            star.classList.add('rated');
        }
        //are we currently looking at the span that was clicked
        if (star === span) {
            match = true;
            num = index + 1;
        }
    });
    document.querySelector('.stars').setAttribute('data-rating', String(num));
}
