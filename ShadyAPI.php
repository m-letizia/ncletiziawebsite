<?php
require("DemoCreds.php");
echo $_POST["method"]();
function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}
function getDatabases() {
    // retrieve and sanitize posted values.
    if (isset($_POST['server'])) {
        $server = json_decode(sanitize($_POST['server']));
    }
    if (isset($_POST['username'])) {
        $username = json_decode(sanitize($_POST['username']));
    }
    if (isset($_POST['password'])) {
        $password = json_decode(sanitize($_POST['password']));
    }
    $databaseNames = array();
    $dbConn = mysqli_connect($server, $username, $password);
    $query = "SHOW DATABASES";
    $result = $dbConn->query($query);
    if ($result) {
        while ($row = $result->fetch_array()) {
            array_push($databaseNames, $row[0]);
        }
    }
    $return = new stdClass;
    $return->credentials = $server + "  " + $username + "   " + $password;
    $return->succsss = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    return $json;
}

/**
 * @return string
 */
function insertClass() {
    // retrieve and sanitize posted values.
    if (isset($_POST['Team'])) {
        $Team = json_decode(sanitize($_POST['Team']));
    }
    if (isset($_POST['first_name'])) {
        $first_name = json_decode(sanitize($_POST['first_name']));
    }
    if (isset($_POST['last_name'])) {
        $last_name = json_decode(sanitize($_POST['last_name']));
    }
    if (isset($_POST['num_wins'])) {
        $num_wins = json_decode(sanitize($_POST['num_wins']));
    }
    if (isset($_POST['num_loss'])) {
        $num_loss = json_decode(sanitize($_POST['num_loss']));
    }

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }

    $query = "INSERT INTO player_table ( Team, first_name, last_name, num_wins, num_loss) " .
        "VALUES ( " .
        "" . $Team . ", " .
        "" . $first_name . ", " .
        "" . $last_name . ", " .
        "" . $num_wins . ", " .
        "" . $num_loss . ");";

    $result = $dbConn->query($query);
    $return = new stdPlayer;
    $return->querystring = $query;
    if ($result) {
        //$return->connection = $dbConn;
        // $return->credentials = (string) (demoUsername() . demoPassword() . demoDB() . " on " . demoServer());
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}
function updatePlayer() {
    // retrieve and sanitize posted values.
    if (isset($_POST['ID'])) {
        $ID = json_decode(sanitize($_POST['ID']));
    }
    if (isset($_POST['newTeam'])) {
        $newTeam = json_decode(sanitize($_POST['newTeam']));
    }
    if (isset($_POST['newfirst_name'])) {
        $newfirst_name = json_decode(sanitize($_POST['newfirst_name']));
    }
    if (isset($_POST['newlast_name'])) {
        $newlast_name = json_decode(sanitize($_POST['newlast_name']));
    }
    if (isset($_POST['newnum_wins'])) {
        $newnum_wins = json_decode(sanitize($_POST['newnum_wins']));
    }
    if (isset($_POST['newnum_loss'])) {
        $newnum_loss = json_decode(sanitize($_POST['newnum_loss']));
    }

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "UPDATE player_table " +
        "SET Team='" + $newTeam + "'" +
        "SET first_name='" + $newfirst_name + "'" +
        "SET last_name='" + $newlast_name + "'" +
        "SET num_wins='" + $newnum_wins + "'" +
        "SET num_losse='" + $newnum_loss + "'" +
        "WHERE ID=" + $ID;
    $result = $dbConn->query($query);
    $return = new stdPlayer;
    $return->querystring = $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}

function getPlayer() {
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    $query = "SELECT * FROM player_table";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return = "";
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $player = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 7; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($player, $allColumns);
        }
    }

    $return = new StdClass();
    $return->success = true;
    $return->player = $player;
    $return->querystring = $query;
    $return->credentials =
        demoUsername() .
        demoPassword() .
        demoDB() .
        " on " .
        demoServer();
    return json_encode($return);
}