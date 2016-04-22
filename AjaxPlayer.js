

/**
 * Created by m-letizia on 4/14/2016.
 */


var players;

function onLoad()
{
    console.log("Calling getPlayers()");
    getPlayers();
    console.log("Calling getTeams()");
    getTeams();
    //$(".newValue").hide();
}

function ajaxInsertPlayer( method, team, first_name, last_name, num_wins, num_loss)
{
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {
            method: method,
            team: team,
            first_name: first_name,
            last_name: last_name,
            num_wins: num_wins,
            num_loss: num_loss
        }
    });
}

function insertPlayer()
{
    alert("insertPlayer function entered");
    var team, first_name, last_name, num_wins, num_loss;
    team = JSON.stringify($('#team option:selected').val());
    alert("Merp");
    console.log("team:" + team);
    first_name = JSON.stringify($('#first_name').val());
    console.log("first_name:" + first_name);
    last_name = JSON.stringify($('#last_name').val());
    console.log("last_name:" + last_name);
    num_wins = JSON.stringify($('#num_wins').val());
    console.log("num_wins:" + num_wins);
    num_loss = JSON.stringify($('#num_loss').val());
    console.log("num_loss:" + num_loss);
    ajax = ajaxInsertPlayer("insertPlayer", team, first_name, last_name, num_wins, num_loss);
    ajax.done(insertPlayerCallback);
    ajax.fail(function () {
        alert("Failure!");
    });
    getPlayers();
}

function insertPlayerCallback(response_in)
{
    var response = JSON.parse(response_in);
    if (!response['success'])
    {
        $("#results").html("");
        alert("Insert failed on query:" + '\n' + response['querystring']);
    } else
    {
        $("#results").html(response['credentials'] + '<br>' +
            response['querystring'] + '<br>' +
            response['success'] + '<br>');
        getPlayers();

    }
}

//function showPlayer() {
//    console.log("Hello world!");
//}

function showPlayers(players)
{
    var playerList = "";

    $.each(players, function (key, value)
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

function getPlayers()
{
    console.log("Calling ajaxMethodGET()");
    ajax = ajaxMethodGET("getPlayers");
    ajax.done(function(response_in) {
        var response = JSON.parse(response_in);
        var players = response["players"];
        if (!response['success']) {
            $("#results").html("getPlayer failed");
        } else {
            $('#player').find('option').remove();
            showPlayers(players);
            $.each(players,
                function (key, value)
                {
                    $(
                        "#team")
                        .append($('<option>',
                            {
                                value: value[0].toString(),
                                text: value[1].toString()
                            }));
                }
            )
            ;
        }
    });
    ajax.fail(function (response_in) {
        alert(response_in);
    });
}

function getPlayersCallback(response_in)
{
    //alert("in ajaxMethodGET()" + "   "  + response_in);
    var response = JSON.parse(response_in);
    players = response["players"];
    if (!response['success']) {
        $("#results").html("getPlayer failed");
    } else {
        $('#team').find('option').remove();
        showPlayers(players);
    }
}

function getTeams()
{
    //alert("in get Player()");
    ajax = ajaxMethodGET("getTeams");
    ajax.done(getTeamsCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxMethodGET(method)
{
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST', // just ignore it
        data: {method: method}
    });
}

function ajaxMethodPOST(method, async)
{
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        async: async,
        data: {method: method}
    });
}

function getTeamsCallback(response_in)
{
    console.log("getTeamsCallback content: " + "   "  + response_in);
    var response = JSON.parse(response_in);
    var teams = response['teams'];
    if (!response['success']) {
        $("#results").html("getTeams failed");
    } else {
        $('#team').find('option').remove();
        showPlayers(teams);
        $.each(teams,
            function (key, value)
                 {
                $(
                    "#team")
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

    var team, first_name, last_name, num_wins, num_loss;
    team = JSON.stringify($('#team option:selected').val());
    first_name = JSON.stringify($('#first_name').val());
    last_name = JSON.stringify($('#last_name').val());
    num_wins = JSON.stringify($('#num_wins').val());
    num_loss = JSON.stringify($('#num_loss').val());
    ajax = ajaxInsertPlayer("insertPlayer", team, first_name, last_name, num_wins, num_loss);
    ajax = ajaxupdatePlayer("updatePlayer", team, first_name, last_name, num_wins, num_loss);
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
        data: {method: method}
    });
}

function updatePlayerCallback(response_in)
{
    response = JSON.parse(response_in);
    $players = response["players"];
    if (!response['success'])
    {
        $("#results").html("updatePlayer failed");
    } else
    {
        $("#results").html(response['querystring']);
        $players = getPlayers();
        showPlayer($players);
    }
}





