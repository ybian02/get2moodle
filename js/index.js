// Some constants for simulation.
//You can change them to get different behavior
var force = 1 / 8;
var gravity = 1 / 2;
var friction = 1 - 1 / 32;
// end

// ---
var rAF = window.requestAnimationFrame;

// For dragging
var dragging;
var touchDragging = []; // Multi touch

var documentMousePos;
var documentMouseDownPos;

var documentTouchStartPos = [];
var documentTouchPos = [];

var letters = [];
var ltrs = document.getElementsByClassName('letters');

var letterWidth = ltrs[0].offsetWidth;

function Letter(x, y, element) {
    this.x = x;
    this.y = y;

    this._x = 0;
    this._y = 0;

    this.speedX = 0;
    this.speedY = 0;

    this.accelerationX = 0;
    this.accelerationY = 0;

    this.element = element;

    this.dragging = false;

    this.draw();
}

Letter.prototype.draw = function() {
    // Redraw letter only if position has changed
    var xDiff = this.x - this._x;
    var yDiff = this.y - this._y;

    if (xDiff >= 1 || xDiff <= -1) {
        this._x = Math.round(this.x);
        this.element.style.left = (this._x).toFixed(0) + 'px';
    }

    if (yDiff >= 1 || yDiff <= -1) {
        this._y = Math.round(this.y);
        this.element.style.top = (this._y).toFixed(0) + 'px';
    }
}

for (var i = 0; i < ltrs.length; i++) {
    letters.push(new Letter(0, 0, ltrs[i]));
}

// To support ie9
if (rAF) {
    rAF(redrawRAF, document.body);
} else {
    setTimeout(redrawTimeout, 0);
}

function redrawRAF() {
    draw();
    rAF(redrawRAF, document.body);
}

// For ie9. Very simple fallback to setTimout.
function redrawTimeout() {
    setTimeout(redrawTimeout, 17);
    draw();
}

function draw() {
    for (var j = 0; j < letters.length; j++) {
        var distance1X = 0;
        var distance1Y = 0;
        var distance2X = 0;
        var distance2Y = 0;

        if (letters[j].dragging === true) {
            letters[j].x = documentMousePos.x - letters[j].holdPointX;
            letters[j].y = documentMousePos.y - letters[j].holdPointY;
        } else if (letters[j].dragging === false) {

            letters[j].accelerationX = 0;
            letters[j].accelerationY = 0;

            if (j === 0) {
                distance1X = -letters[j].x + letterWidth;
                distance1Y = -letters[j].y;

                distance2X = letters[j + 1].x - letters[j].x;
                distance2Y = letters[j + 1].y - letters[j].y;
            } else if (j === letters.length - 1) {
                distance1X = letters[j - 1].x - letters[j].x;
                distance1Y = letters[j - 1].y - letters[j].y;

                distance2X = window.innerWidth - letters[j].x - letterWidth * 2;
                distance2Y = -letters[j].y;
            } else {
                distance1X = letters[j - 1].x - letters[j].x;
                distance1Y = letters[j - 1].y - letters[j].y;

                distance2X = letters[j + 1].x - letters[j].x;
                distance2Y = letters[j + 1].y - letters[j].y;
            }

            letters[j].accelerationX = force * (distance1X + distance2X);
            letters[j].accelerationY = force * (distance1Y + distance2Y);

            letters[j].speedX += letters[j].accelerationX;
            letters[j].speedY += letters[j].accelerationY;
            letters[j].speedY += gravity;

            letters[j].speedX *= friction;
            letters[j].speedY *= friction;
        } else {

            letters[j].x = documentTouchPos[letters[j].dragging].x - letters[j].holdPointX;
            letters[j].y = documentTouchPos[letters[j].dragging].y - letters[j].holdPointY;

        }
    }
    for (var j = 0; j < letters.length; j++) {
        letters[j].x += letters[j].speedX;
        letters[j].y += letters[j].speedY;

        letters[j].draw();
    }
}

// Add mouse events listeners
for (var i = 0; i < ltrs.length; i++) {
    addEvent(ltrs[i], 'mousedown', mouseDown);
}
addEvent(document, 'mouseup', mouseUp);
addEvent(document, 'mousemove', mouseMove);
addEvent(document, 'mousedown', function(event) {
    event.preventDefault();
    event.stopPropagation();
});

function mouseDown(event) {
    for (var i = 0; i < letters.length; i++) {
        if (letters[i].element === event.target) {
            letters[i].dragging = true;
            dragging = letters[i];
            break;
        }
    }

    documentMouseDownPos = {
        x: event.pageX,
        y: event.pageY
    };

    documentMousePos = {
        x: event.pageX,
        y: event.pageY
    };

    dragging.holdPointX = event.pageX - dragging.x;
    dragging.holdPointY = event.pageY - dragging.y;

    event.preventDefault();
    event.stopPropagation();
}

function mouseUp(event) {
    if (dragging) {
        dragging.dragging = false;
        dragging = null;
    }

    event.preventDefault();
    event.stopPropagation();
}

function mouseMove(event) {
    documentMousePos = {
        x: event.pageX,
        y: event.pageY
    };

    event.preventDefault();
    event.stopPropagation();
}

// Add touch events listeners
for (var i = 0; i < ltrs.length; i++) {
    addEvent(ltrs[i], 'touchstart', touchStart);
}
addEvent(document, 'touchmove', touchMove);
addEvent(document, 'touchend', touchEnd);
addEvent(document, 'touchcancel', touchEnd);
addEvent(document, 'touchleave', touchEnd);
addEvent(document, 'touchstart', function(event) {
    event.preventDefault();
    event.stopPropagation();
});

function touchStart(event) {
    var touches = event.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        var ID = event.changedTouches[i].identifier;
        documentTouchStartPos[ID] = {
            x: touches[i].pageX,
            y: touches[i].pageY
        };
        documentTouchPos[ID] = {
            x: touches[i].pageX,
            y: touches[i].pageY
        };
        for (var j = 0; j < letters.length; j++) {
            if (letters[j].element === touches[i].target) {
                letters[j].dragging = ID.toString();
                touchDragging[ID] = letters[j];
                touchDragging[ID].holdPointX = touches[i].pageX - touchDragging[ID].x;
                touchDragging[ID].holdPointY = touches[i].pageY - touchDragging[ID].y;
            }
        }
    }

    event.preventDefault();
    event.stopPropagation();
}

function touchEnd(event) {
    var touches = event.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        var ID = event.changedTouches[i].identifier;
        if (touchDragging[ID]) {
            touchDragging[ID].dragging = false;
            touchDragging[ID] = null;
        }
    }

    event.preventDefault();
    event.stopPropagation();
}

function touchMove(event) {
    var touches = event.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        documentTouchPos[touches[i].identifier] = {
            x: touches[i].pageX,
            y: touches[i].pageY
        };
    }

    event.preventDefault();
    event.stopPropagation();
}

function addEvent(element, type, handler, useCapture) {
    element.addEventListener(type, handler, useCapture || false);
}