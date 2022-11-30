<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request With');

    include_once('../../config/db.php');
    include_once('../../model/OrderDetail.php');

    $db = new Database();
    $connect = $db->connect();

    $order = new OrderDetail($connect);
    
    $data = json_decode(file_get_contents("php://input"));

    $order->order_id = $data->order_id;
    $order->product_id = $data->product_id;
    $order->quantity = $data->quantity;
    $order->price = $data->price;
    $order->created_time = $data->created_time;
    $order->last_updated = $data->last_updated;

    if ($order->create()) {
        echo json_encode(array('messege', 'Order detail created'));
    } else {
        echo json_encode(array('messege', 'Order detail not created'));
    }

    echo json_encode($order_array, JSON_PRETTY_PRINT);
?>