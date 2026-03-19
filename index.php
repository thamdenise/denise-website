<?php
$built = __DIR__ . '/app.html';
if (file_exists($built)) {
    readfile($built);
    exit;
}

readfile(__DIR__ . '/index.html');
