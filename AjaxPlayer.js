/**
 * Created by m-letizia on 4/14/2016.
 */
var player;

function onLoad()
{
    getPlayer(false);
    //$(".newValue").hide();
}

function ajaxInsertPlayer( Team, first_name, last_name, num_wins, num_loss)
{
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {
            team: Team,
            first_name: first_name,
            last_name: last_name,
            num_wins: num_wins,
            num_loss: num_loss
        }
    });
}

function insertPlayer()
{
    var Team, first_name, last_name, num_wins, num_loss;
    Team = JSON.stringify($('#Team option:selected').val());
    first_name = JSON.stringify($('#first_name').val());
    last_name = JSON.stringify($('#last_name').val());
    num_wins = JSON.stringify($('#num_wins').val());
    num_loss = JSON.stringify($('#num_loss').val());
    ajax = ajaxInsertPlayer("insertPlayer", Team, first_name, last_name, num_wins, num_loss);
    ajax.done(insertPlayerCallback);
    ajax.fail(function () {
        alert("Failure");
    });
    getPlayer();
}

function insertPlayerCallback(response_in)
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
        getPlayer();

    }
}

function showPlayer()
{
    var playerList = "";

    $.each(player, function (key, value)
    {
        var itemString = "";
        $.each(value, function (key, item)
        {
            itemString += item + "&nbsp &nbsp &nbsp";
        });
        playerList += itemString + '<br>';
    });

    $("#player").html(playerList);
}

function getPlayer(async)
{
    ajax = ajaxgetPlayer("getPlayer", async);
    ajax.done(getPlayerCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetPlayer(method, async)
{

    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        async: async,
        data: {method: method
        }
    });
}

function getPlayerCallback(response_in)
{
    var response = JSON.parse(response_in);
    $player = response["player"];
    if (!response['success']) {
        $("#results").html("getPlayer failed");
    } else {
        $('#Team').find('option').remove();
        showPlayer($player);
        $.each($player,
            function (key, value)
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
                    "#Team")
                    .append($('<option>',
                        {
                            value: value[0].toString(),
                            text: value[1].toString()
                        }));

            }
        )
        ;
    }
}


function updatePlayer()
{

    var Team, first_name, last_name, num_wins, num_loss;
    Team = JSON.stringify($('#Team option:selected').val());
    first_name = JSON.stringify($('#first_name').val());
    last_name = JSON.stringify($('#last_name').val());
    num_wins = JSON.stringify($('#num_wins').val());
    num_loss = JSON.stringify($('#num_loss').val());
    ajax = ajaxInsertPlayer("insertPlayer", Team, first_name, last_name, num_wins, num_loss);
    ajax = ajaxupdatePlayer("updatePlayer", Team, first_name, last_name, num_wins, num_loss);
    ajax.done(updatePlayerCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxupdatePlayer(method)
{

    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method
        }
    });
}

function updatePlayerCallback(response_in)
{
    response = JSON.parse(response_in);
    $player = response["player"];
    if (!response['success'])
    {
        $("#results").html("updatePlayer failed");
    } else
    {
        $("#results").html(response['querystring']);
        $player = getPlayer();
        showPlayer($player);
    }
}