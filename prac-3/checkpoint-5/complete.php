<?php
if (isset($_GET['id'])) {
    require_once "inc/dbconn.inc.php";

    $sql = "UPDATE Task SET completed=1, updated=now() WHERE id=?;";
    $statement = mysqli_stmt_init($conn);

    if (mysqli_stmt_prepare($statement, $sql)) {
        // Bind the task id parameter
        mysqli_stmt_bind_param($statement, 'i', $_GET['id']);

        if (mysqli_stmt_execute($statement)) {
            // Redirect to index.php if successful
            header("location: index.php");
        } else {
            // Output the error if the update fails
            echo "Error: " . mysqli_error($conn);
        }
    }
    mysqli_close($conn);
}
?>