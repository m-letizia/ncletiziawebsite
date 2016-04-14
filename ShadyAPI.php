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
function insertClass() {
    // retrieve and sanitize posted values.
    if (isset($_POST['course_name'])) {
        $course_name = json_decode(sanitize($_POST['course_name']));
    }
    if (isset($_POST['course_number'])) {
        $course_number = json_decode(sanitize($_POST['course_number']));
    }
    if (isset($_POST['course_room'])) {
        $course_room = json_decode(sanitize($_POST['course_room']));
    }
    if (isset($_POST['course_start_time'])) {
        $course_start_time = json_decode(sanitize($_POST['course_start_time']));
    }
    if (isset($_POST['course_end_time'])) {
        $course_end_time = json_decode(sanitize($_POST['course_end_time']));
    }
    if (isset($_POST['first_name'])) {
        $first_name = json_decode(sanitize($_POST['first_name']));
    }
    if (isset($_POST['last_name'])) {
        $last_name = json_decode(sanitize($_POST['last_name']));
    }
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO course_name ( course_name, course_number, course_room ) " .
        "VALUES ( " .
        "" . $course_name . ", " .
        "'" . $course_number . "', " .
        "" . $course_room . ");";

    $query = "INSERT INTO course_time ( course_start_time, course_end_time ) " .
        "VALUES ( " .
        "" . $course_start_time . ", " .
        "" . $course_end_time . ");";


    $query = "INSERT INTO professor (first_name, last_name ) " .
        "VALUES ( " .
        "" . $course_start_time . ", " .
        "" . $course_end_time . ");";

    $result = $dbConn->query($query);
    $return = new stdClass;
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
function updateClass() {
    // retrieve and sanitize posted values.
    if (isset($_POST['ID'])) {
        $ID = json_decode(sanitize($_POST['ID']));
    }
    if (isset($_POST['newcourse_name'])) {
        $newParentID = json_decode(sanitize($_POST['newcourse_name']));
    }
    if (isset($_POST['newcourse_number'])) {
        $newName = json_decode(sanitize($_POST['newcourse_number']));
    }
    if (isset($_POST['newcourse_room'])) {
        $newWidth = json_decode(sanitize($_POST['newcourse_room']));
    }
    if (isset($_POST['newcourse_start_time'])) {
        $newLength = json_decode(sanitize($_POST['newcourse_start_time']));
    }
    if (isset($_POST['newcourse_end_time'])) {
        $newXPos = json_decode(sanitize($_POST['newcourse_end_time']));
    }
    if (isset($_POST['newfirst_name'])) {
        $newYPos = json_decode(sanitize($_POST['newfirst_name']));
    }
    if (isset($_POST['newlast_name'])) {
        $newYPos = json_decode(sanitize($_POST['newlast_name']));
    }
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "UPDATE RectGarden " +
        "SET course_name='" + $newcourse_name + "'" +
        "SET course_number='" + $newcourse_number + "'" +
        "SET course_room='" + $newcourse_room + "'" +
        "SET course_start_time='" + $newcourse_start_time + "'" +
        "SET course_end_time='" + $newcourse_end_time + "'" +
        "SET first_name='" + $newfirst_name + "'" +
        "SET last_name='" + $newlast_name + "'" +
        "WHERE ID=" + $ID;
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}

function getClass() {
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    $query = "SELECT * FROM course_name";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $class = array();
    if ($result) {
        while ($class = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 7; $i++) {
                array_push($allColumns, $class[$i]);
            }
            array_push($class, $allColumns);
        }
    }

    $return = new StdClass();
    $return->success = true;
    $return->class = $class;
    $return->querystring = $query;
    $return->credentials =
        demoUsername() .
        demoPassword() .
        demoDB() .
        " on " .
        demoServer();
    return json_encode($return);
}