<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request With');

    include_once('../../config/db.php');
    include_once('../../model/Order.php');

    $db = new Database();
    $connect = $db->connect();

    $order = new Order($connect);
    
    $data = json_decode(file_get_contents("php://input"));

    $order->order_id = $data->order_id;
    $order->customer_id = $data->customer_id;
    $order->phone = $data->phone;
    $order->total = $data->total;
    $order->address = $data->address;
    $order->created_time = $data->created_time;
    $order->last_updated = $data->last_updated;

    if ($order->create()) {
        echo json_encode(array('messege', 'Order created'));
    } else {
        echo json_encode(array('messege', 'Order not created', $data->order_id, $data->customer_id));
        echo $data->order_id;
    }

    echo json_encode($order_array, JSON_PRETTY_PRINT);
?>