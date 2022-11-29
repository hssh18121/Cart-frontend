<?php
class OrderDetail {
    private $conn;

    public $order_id;
    public $product_id;
    public $quantity;
    public $price;
    public $creted_time;
    public $last_updated;

    public function __construct($db) {
        $this->conn = $db;
    }
}


?>