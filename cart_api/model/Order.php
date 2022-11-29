<?php 
class Order {
    private $conn;
    
    public $order_id;
    public $customer_id;
    public $phone;
    public $address;
    public $total;
    public $created_time;
    public $last_updated;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM `orders`";
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
        }
        
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();

        return $result;
    }

    public function show() {
        $query = "SELECT * FROM `orders` WHERE order_id = ?";
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->order_id);
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
        }
        
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();
        
        extract($result);
        $this->customer_id = $customer_id;
        $this->phone = $phone;
        $this->address = $address;
        $this->total = $total;
        $this->created_time = $created_time;
        $this->last_updated = $last_updated;

        return $result;
    }

    public function create() {
        $query = "INSERT INTO `orders` SET order_id=:order_id, customer_id=:customer_id, phone=:phone, address=:address, total=:total, created_time=:created_time, last_updated=:last_updated";
        try {
            $stmt = $this->conn->prepare($query);
            $this->order_id = htmlspecialchars(strip_tags($this->order_id)); 
            $this->customer_id = htmlspecialchars(strip_tags($this->customer_id)); 
            $this->phone = htmlspecialchars(strip_tags($this->phone));
            $this->total = htmlspecialchars(strip_tags($this->total));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->created_time = htmlspecialchars(strip_tags($this->created_time));
            $this->last_updated = htmlspecialchars(strip_tags($this->last_updated));

            $stmt->bindParam(':order_id', $this->order_id);
            $stmt->bindParam(':customer_id', $this->customer_id);
            $stmt->bindParam(':phone', $this->phone);
            $stmt->bindParam(':total', $this->total);
            $stmt->bindParam(':address', $this->address);
            $stmt->bindParam(':created_time', $this->created_time);
            $stmt->bindParam(':last_updated', $this->last_updated);
            
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
            return false;
        }

        return true;
    }
}

?>