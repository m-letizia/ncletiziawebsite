/**
 * Created by m-letizia on 3/14/2016.
 */


function dream(){
    //calculating random color of dream
    //did not come up with this equation haha
    //The code in js is from http://motyar.blogspot.com/2010/03/dream-night-animation-with-jquery.html

    var color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';

    //calculating random X position
    var x = Math.floor(Math.random()*$(window).width());

    //calculating random Y position
    var y = Math.floor(Math.random()*$(window).height());

    //creating the dream and hide
    drawingpix = $('<span>').attr({class: 'drawingpix'}).hide();

    //appending it to body
    $(document.body).append(drawingpix);

    //styling dream.. filling colors.. positioning.. showing.. growing..fading
    drawingpix.css({

    }).show().animate({
        height:'500px',
        width:'500px',
        'border-radius':'500px',
        '-moz-border-radius': '500px',
        '-webkit-border-radius': '500px',
        opacity: 0.1,
        top: y-250,    //offsets
        left: x-250
    }, 3000).fadeOut(2000);

    //Every dream's end starts a new dream
    window.setTimeout('dream()',200);
}

$(document).ready(function() {
    //calling the first dream
    dream();
});
