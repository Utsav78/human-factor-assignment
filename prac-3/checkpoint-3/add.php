<!DOCTYPE html>
<html lang="en">
<head>
    <title>Practical 3: Add</title>
    <meta charset="UTF-8">
    <meta name="author" content="Utsav Budathoki">
    <link rel="stylesheet" href="styles/style.css">
    <script src="scripts/script.js" defer></script>
</head>
<body>
    <?php require_once "inc/menu.inc.php"; ?>
    <h1>Add a new task</h1>
    <form action="add-task.php" method="POST">
        <input type="text" id="task-name" name="task-name" placeholder="Enter the task name" required>
        <input type="submit" value="Add Task">
    </form>
</body>
</html>