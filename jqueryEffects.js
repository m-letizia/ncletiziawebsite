/**
 * Created by m-letizia on 3/14/2016.
 */
function HideParagraphs()
{
    $(document).ready(function () {
        $("p").hide();
    })
}

function ShowParagraphs()
{
    $(document).ready(function () {
        $("p").show();
    })
}

function HideAllTags(TagToHide)
{
    $(TagToHide).hide();
}

function ShowAllTags(TagToHide)
{
    $(TagToHide).show();
}

function HideAll()
{
    WhatToHide = document.getElementById("ItemToUse").value;
    $(WhatToHide).hide();
}

function ShowAll()
{
    WhatToShow = document.getElementById("ItemToUse").value;
    $(WhatToShow).show();
}

function boxBig()
{

    $(document).ready(function(){
        $("button").click(function(){
            $("div").animate({left: '50px',
                height: '+=50px',
                width: '+=50px'});
        });
    });

}
function tog(){
    $(document).ready(function(){
        $("button").click(function(){
            $("div").animate({
                height: 'toggle'
            });
        });
    });
}
