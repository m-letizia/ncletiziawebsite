/**
 * Created by m-letizia on 4/14/2016.
 */
function onLoad()
{
    getGardens();
    //$(".newValue").hide();
}

function ajaxInsertClass( course_name, course_number, course_room, course_start_time, course_end_time, first_name , last_name)
{
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {
            course_name: course_name,
            course_number: course_number,
            course_room: course_room,
            course_start_time: course_start_time,
            course_end_time: course_end_time,
            first_name: first_name,
            last_name: last_name
        }
    });
}

function insertClass()
{
    var course_name, course_number, course_room, course_start_time, course_end_time, first_name , last_name;
    course_name = JSON.stringify($('#course_name option:selected').val());
    course_number = JSON.stringify($('#course_number').val());
    course_room = JSON.stringify($('#course_room').val());
    course_start_time = JSON.stringify($('#course_start_time').val());
    course_end_time = JSON.stringify($('#course_end_time').val());
    first_name = JSON.stringify($('#first_name').val());
    last_name = JSON.stringify($('#last_name').val());
    ajax = ajaxInsertClass("insertClass", course_name, course_number, course_room, course_start_time, course_end_time, first_name , last_name);
    ajax.done(insertClassCallback);
    ajax.fail(function () {
        alert("Failure");
    });
    getClass();
}

function insertClassCallback(response_in)
{
    response = JSON.parse(response_in);
    if (!response['success'])
    {
        $("#results").html("");
        alert("Insert failed on query:" + '\n' + response['querystring']);
    } else
    {
        $("#results").html(response['credentials'] + '<br>' +
            response['querystring'] + '<br>' +
            response['success'] + '<br>');
        getClass();

    }
}

function showClass(gardens)
{
    var classList = "";

    $.each(classes, function (key, value)
    {
        var itemString = "";
        $.each(value, function (key, item)
        {
            itemString += item + "&nbsp &nbsp &nbsp";
        });
        classList += itemString + '<br>';
    });

    $("#results").html(classList);
}

function getClass()
{
    ajax = ajaxgetClass("getClass");
    ajax.done(getClassCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetClass(method)
{

    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method
        }
    });
}

function getClassCallback(response_in)
{
    response = JSON.parse(response_in);
    $gardens = response["class"];
    if (!response['success']) {
        $("#results").html("getClass failed");
    } else {
        $('#Parent').find('option').remove();
        showClass($class);
        $.each($class,
            function (key, classes)
                /*
                 * - key is the zero based position in the array
                 * - value is the entire row in the table
                 * - we want the value returned from selecting to be the
                 *   garden id -- position 0 in the row
                 * - we want the value that is displayed in the select
                 *   control to be the name of the garden -- zero based
                 *   position 2 in the row  Therefore:
                 */ {
                $(
                    "#course_name")
                    .append($('<option>',
                        {
                            value: classes[0].toString(),
                            text: classes

                                [2].toString()
                        }));

            }
        )
        ;
    }
}


function updateGarden()
{
    course_name = JSON.stringify($('#course_name option:selected').val());
    course_number = JSON.stringify($('#course_number').val());
    course_room = JSON.stringify($('#course_room').val());
    course_start_time = JSON.stringify($('#course_start_time').val());
    course_end_time = JSON.stringify($('#course_end_time').val());
    first_name = JSON.stringify($('#first_name').val());
    last_name = JSON.stringify($('#last_name').val());
    ajax = ajaxInsertClass("insertClass", course_name, course_number, course_room, course_start_time, course_end_time, first_name , last_name);



    var course_name, course_number, course_room, course_start_time, course_end_time, first_name , last_name, newcourse_name, newcourse_number, newcourse_room, newcourse_start_time, newcourse_end_time, newfirst_name , newlast_name;
    course_name = JSON.stringify($('#course_name option:selected').val());
    course_number = JSON.stringify($('#course_number').val());
    course_room = JSON.stringify($('#course_room').val());
    course_start_time = JSON.stringify($('#course_start_time').val());
    course_end_time = JSON.stringify($('#course_end_time').val());
    first_name = JSON.stringify($('#first_name').val());
    last_name = JSON.stringify($('#last_name').val());

    ajax = ajaxupdateClass("updateClass", course_name, course_number, course_room, course_start_time, course_end_time, first_name , last_name);
    ajax.done(updateClassCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxupdateClass(method)
{

    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method
        }
    });
}

function updateGardenCallback(response_in)
{
    response = JSON.parse(response_in);
    $class = response["class"];
    if (!response['success'])
    {
        $("#results").html("updateClass failed");
    } else
    {
        $("#results").html(response['querystring']);
        $class = getClass();
        showClass($class);
    }
}