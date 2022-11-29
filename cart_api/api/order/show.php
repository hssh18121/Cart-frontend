<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../../config/db.php');
    include_once('../../model/Order.php');

    $db = new Database();
    $connect = $db->connect();

    $order = new Order($connect);
    $order->order_id = isset($_GET['order_id']) ? $_GET['order_id'] : die();

    $result = $order->show();

        $order_item = array(
            'order_id' => $order->order_id,
            'customer_id' => $order->customer_id,
            'phone' => $order->phone,
            'address' => $order->address,
            'total' => $order->total,
            'created_time' => $order->created_time,
            'last_updated' => $order->last_updated
        );

    echo json_encode($order_item, JSON_PRETTY_PRINT);
?>