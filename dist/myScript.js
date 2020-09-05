"use strict";
var Review = /** @class */ (function () {
    function Review(inptName, inptDate, inptComment, inptStars) {
        this._name = inptName;
        this._date = inptDate;
        this._comment = inptComment;
        this._stars = inptStars;
    }
    Object.defineProperty(Review.prototype, "name", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "date", {
        get: function () { return this._date; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "comment", {
        get: function () { return this._comment; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "stars", {
        get: function () { return this._stars; },
        enumerable: false,
        configurable: true
    });
    return Review;
}());
var reviewList = []; // array of Review objects
var num = 0; // number of stars (global) 
var templateInsertLocation = document.getElementById('displayReviews'); // display user reviews here
var numOfReviews = document.getElementById('reviewnum'); // display total # of reviews here 
numOfReviews.innerHTML = '0';
var outputAverage = document.getElementById('average'); // display rating average here 
outputAverage.innerHTML = '0.0';
var btnSubmit1 = document.getElementById('submitReview');
// when clicking the 'Post Review' button, this runs:
btnSubmit1.addEventListener("click", function (event) {
    var reviewName = document.getElementById('name');
    var reviewComment = document.getElementById('comment');
    var reviewStars = num;
    var reviewDate = new Date();
    // name validation  
    var nameValidation = document.getElementById("nameErr");
    nameValidation.innerHTML = "";
    try {
        if (reviewName.value == "")
            throw "Please enter a name";
    }
    catch (err) {
        nameValidation.innerHTML = err;
        return;
    }
    // stars validation 
    var starValidation = document.getElementById("starErr");
    starValidation.innerHTML = "";
    try {
        if (reviewStars == 0)
            throw "Please select a star rating";
    }
    catch (err) {
        starValidation.innerHTML = err;
        return;
    }
    var review = new Review(reviewName.value, reviewDate, reviewComment.value, reviewStars); // create a new review after validation 
    resetForm(reviewName, reviewComment); // reset form fields 
    addReview(review); // add new review to array of reviews 
    updateAverage(reviewList, numOfReviews, outputAverage); // calculate and display new average
    displayReviews(reviewList); // append new review to the user reviews section 
});
function resetForm(name, comment) {
    name.value = "";
    comment.value = "";
    num = 0;
    document.querySelector('.stars').setAttribute('data-rating', String(0));
    var stars = document.querySelectorAll('.star');
    stars.forEach(function (star) {
        star.classList.remove('rated');
    });
}
function addReview(review) {
    reviewList.push(review);
}
function updateAverage(list, numOfReviews, outputAverage) {
    var average = 0;
    if (list.length > 0) {
        list.forEach(function (element) {
            average += element.stars;
        });
        average = average / list.length;
        numOfReviews.innerHTML = String(list.length);
        outputAverage.innerHTML = String(average.toPrecision(2));
    }
    else {
        numOfReviews.innerHTML = '0';
        outputAverage.innerHTML = '0.0';
    }
    displayRating(average); // update the product total star rating
}
function displayReviews(list) {
    var stringDate = formatDate(list[list.length - 1].date); // format the date
    var templateClone = getTemplateClone('responseTemplate');
    templateClone.content.getElementById('reviewName').innerText = list[list.length - 1].name;
    templateClone.content.getElementById('reviewDate').innerText = stringDate;
    templateClone.content.getElementById('reviewComment').innerText = list[list.length - 1].comment;
    templateClone.content.getElementById('reviewStars').innerHTML = displayUserRating(list[list.length - 1].stars);
    templateInsertLocation.appendChild(templateClone.content);
}
function formatDate(date) {
    return date.toLocaleDateString();
}
function getTemplateClone(templateID) {
    var _a;
    return (_a = document.getElementById(templateID)) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
}
function displayRating(average) {
    var ratings = document.querySelectorAll('.rate');
    var match = false;
    if (average == 0)
        return;
    ratings.forEach(function (element, index) {
        if (match) {
            element.classList.remove('rated');
        }
        else {
            element.classList.add('rated');
        }
        if (average >= index + 1 && average < index + 2) {
            match = true;
        }
    });
}
// individual user review rating
function displayUserRating(rating) {
    var starHtml = "";
    if (rating == 1) {
        starHtml = "\n            <span class=\"user-rate rated\"></span>\n            <span class=\"user-rate\"></span>\n            <span class=\"user-rate\"></span>\n            <span class=\"user-rate\"></span>\n            <span class=\"user-rate\"></span>";
    }
    else if (rating == 2) {
        starHtml = "\n            <span class=\"user-rate rated\"></span>\n            <span class=\"user-rate rated\"></span>\n            <span class=\"user-rate\"></span>\n            <span class=\"user-rate\"></span>\n            <span class=\"user-rate\"></span>";
    }
    else if (rating == 3) {
        starHtml = "\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate\"></span>\n        <span class=\"user-rate\"></span>";
    }
    else if (rating == 4) {
        starHtml = "\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate\"></span>";
    }
    else if (rating == 5) {
        starHtml = "\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>\n        <span class=\"user-rate rated\"></span>";
    }
    else {
        return "";
    }
    return starHtml;
}
// star rating selection
document.addEventListener('DOMContentLoaded', function () {
    var stars = document.querySelectorAll('.star');
    stars.forEach(function (star) {
        star.addEventListener('click', setRating);
    });
    var rating = +(document.querySelector('.stars').getAttribute('data-rating'));
    var target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
});
function setRating(ev) {
    var span = ev.currentTarget;
    var stars = document.querySelectorAll('.star');
    var match = false;
    stars.forEach(function (star, index) {
        if (match) {
            star.classList.remove('rated');
        }
        else {
            star.classList.add('rated');
        }
        // if this is the span that was clicked
        if (star === span) {
            match = true;
            num = index + 1;
        }
    });
    document.querySelector('.stars').setAttribute('data-rating', String(num));
}
//# sourceMappingURL=myScript.js.map