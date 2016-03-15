/**
 * Created by m-letizia on 3/14/2016.
 */
$(document).ready(function() {

    $(document).mousemove(function(e) {

        //create img elements having pointer.png in their src
        // download it from
        // http://sites.google.com/site/dharmmotyar/Home/pointer.png
        pointer = $('<img>').attr({'src':'http://i.imgur.com/UIsbYeb.png?1'});

        //and append them to document
        $(document.body).append(pointer);

        //show them at mouse position & fade out slowly
        pointer.css({
            'position':'absolute',
            top: e.pageY +2 ,    //offsets
            left: e.pageX +2   //offsets
        }).fadeOut(1500);
    });
});