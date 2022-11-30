<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../../config/db.php');
    include_once('../../model/OrderDetail.php');

    $db = new Database();
    $connect = $db->connect();

    $order_detail = new OrderDetail($connect);
    $result = $order_detail->read();

    $order_array = [];
    $order_array['data'] = [];

    foreach($result as $row) {
        extract($row);

        $order_item = array(
            'order_id' => $order_id,
            'product_id' => $product_id,
            'quantity' => $quantity,
            'price' => $price,
            'creted_time' => $creted_time,
            'last_updated' => $last_updated
        );

        array_push($order_array['data'], $order_item);
    }

    echo json_encode($order_array, JSON_PRETTY_PRINT);
?>