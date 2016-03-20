/*****************************************************************************/
// This source code is a simple demonstration of how to process 2D movement.
//
// The goal of this code is to be the starting point when it comes to teaching
// the basics of 2D movement using trigonometry to update a players rotation.
//
// Player:
//     x:        the player x position on the screen
//     y:        the player y position on the screen
//     angle:    the player rotation angle in radians
//     speed:    the speed factor that increases when pressing the shift key
//     angSpeed: how much the angle changes when pressing left or right keys
//     update:   method to change the values acording to what keys are pressed
//     draw:     method to render the player in its new position on the canvas
/*****************************************************************************/

var KEY_ARROW_UP = false;
var KEY_ARROW_DOWN = false;
var KEY_ARROW_LEFT = false;
var KEY_ARROW_RIGHT = false;
var KEY_SHIFT = false;
var canvas;
var context;
var player;

/*****************************************************************************/
// PLAYER CLASS
/*****************************************************************************/
var Player = function () {
    this.x;
    this.y;
    this.speed;
    this.angle;
    this.angSpeed = 0.04;

    this.update = function () {
        if (KEY_ARROW_UP) {
            this.x = this.x + Math.cos(this.angle) * this.speed;
            this.y = this.y + Math.sin(this.angle) * this.speed;
        }
        if (KEY_ARROW_DOWN) {
            this.x = this.x - Math.cos(this.angle) * this.speed;
            this.y = this.y - Math.sin(this.angle) * this.speed;
        }
        if (KEY_ARROW_LEFT) {
            this.angle = this.angle - this.angSpeed;
        }
        if (KEY_ARROW_RIGHT) {
            this.angle = this.angle + this.angSpeed;
        }

        this.speed = (KEY_SHIFT) ? 2 : 1;
    }

    this.draw = function () {
        context.beginPath();
        context.rect(this.x - 4, this.y - 4, 8, 8);
        context.fillStyle = 'white';
        context.lineWidth = 1;
        context.strokeStyle = '#777';
        context.moveTo(this.x, this.y);
        context.lineTo(Math.cos(this.angle) * 20 + this.x, Math.sin(this.angle) * 20 + this.y);
        context.stroke();
        context.fill();
    }
}

/*****************************************************************************/
// TRIGGER FUNCTIONS FOR KEY DOWN AND KEY UP
/*****************************************************************************/
function onKeyDown(evt) {
    switch (evt.keyCode) {
        case 39: KEY_ARROW_RIGHT = true; break;
        case 37: KEY_ARROW_LEFT  = true; break;
        case 38: KEY_ARROW_UP    = true; break;
        case 40: KEY_ARROW_DOWN  = true; break;
        case 16: KEY_SHIFT       = true; break;
    }
}

function onKeyUp(evt) {
    switch (evt.keyCode) {
        case 39: KEY_ARROW_RIGHT = false; break;
        case 37: KEY_ARROW_LEFT  = false; break;
        case 38: KEY_ARROW_UP    = false; break;
        case 40: KEY_ARROW_DOWN  = false; break;
        case 16: KEY_SHIFT       = false; break;
    }
}

/*****************************************************************************/
// DEGREE AND RADIAN ANGLE CONVERSION
/*****************************************************************************/
function deg2rad(angleInDegrees) {
    return angleInDegrees * (Math.PI / 180);
}

function rad2deg(angleInRadians) {
    return angleInRadians * (180 / Math.PI);
}

/*****************************************************************************/
// UPDATE TEXT PANEL WITH PLAYER PROPERTIES
/*****************************************************************************/
function displayPanelInfo() {
    // configure radians to be always positive and in the range 0 and 2*PI
    var printableRadians = player.angle % (Math.PI * 2);
    printableRadians += (printableRadians < 0) ? (Math.PI * 2) : 0;

    // configure degrees to be always positive and in the range 0 and 360
    var printableDegrees = rad2deg(player.angle) % 360;
    printableDegrees += (printableDegrees < 0) ? 360 : 0;

    // build message with player current information
    var message = 'player { <br/>';
    message += '&nbsp;&nbsp;&nbsp;&nbsp;x: ' + parseInt(player.x, 10) + ', <br/> ';
    message += '&nbsp;&nbsp;&nbsp;&nbsp;y: ' + parseInt(player.y, 10) + ', <br/> ';
    message += '&nbsp;&nbsp;&nbsp;&nbsp;degrees: ' + printableDegrees.toFixed(2) + '&deg;<br/>';
    message += '&nbsp;&nbsp;&nbsp;&nbsp;radians: ' + (printableRadians / Math.PI).toFixed(2) + '&pi;<br/>';
    message += '}';

    // updates html element with the new message
    $('#panel').html(message);
}

/*****************************************************************************/
// ANIMATION LOOP
/*****************************************************************************/
function mainAnimationLoop() {
    // clear canvas every frame
    context.fillStyle = "black";
    context.clearRect(0, 0, canvas.width, canvas.height);

    // update player attributes
    player.update();

    // redraw player on canvas
    player.draw();

    // updates panel with new player values
    displayPanelInfo();

    // recall animation frame loop
    window.requestAnimationFrame(mainAnimationLoop);
}

/**********************************************/
// ON LOAD
/**********************************************/
document.addEventListener("DOMContentLoaded", function(event) {
    canvas = document.getElementById('canvas-map');
    context = canvas.getContext("2d");

    // create the player object
    player = new Player();
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.angle = 0;

    // key event listeners
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    // start animation frame loop
    window.requestAnimationFrame(mainAnimationLoop);

    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || function(a) {
            window.setTimeout(a, 1000 / 60);
        }
    }();
});