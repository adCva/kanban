<?php

declare(strict_types=1);

class Database {
    private string $server = "localhost";
    private string $dbname = "kanbar";
    private string $user = "root";
    private string $pwd = "";

    public function __construct() {
        try {
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pwd);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(\Esception $e) {
            echo "Database connection error: " . $e->getMessage();
        }
    }
}