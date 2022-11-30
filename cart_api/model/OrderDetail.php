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

    public function read() {
        $query = "SELECT * FROM `order_details`";
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
        $query = "SELECT * FROM `order_details` WHERE product_id = ?";
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->product_id);
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
        }
        
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();

        return $result;
    }

    public function create() {
        $query = "INSERT INTO `order_details` SET order_id=:order_id, product_id=:product_id, quantity=:quantity, price=:price, created_time=:created_time, last_updated=:last_updated";
        try {
            $stmt = $this->conn->prepare($query);
            $this->order_id = htmlspecialchars(strip_tags($this->order_id)); 
            $this->product_id = htmlspecialchars(strip_tags($this->product_id)); 
            $this->quantity = htmlspecialchars(strip_tags($this->quantity));
            $this->price = htmlspecialchars(strip_tags($this->price));
            $this->created_time = htmlspecialchars(strip_tags($this->created_time));
            $this->last_updated = htmlspecialchars(strip_tags($this->last_updated));

            $stmt->bindParam(':order_id', $this->order_id);
            $stmt->bindParam(':product_id', $this->product_id);
            $stmt->bindParam(':quantity', $this->quantity);
            $stmt->bindParam(':price', $this->price);
            $stmt->bindParam(':created_time', $this->created_time);
            $stmt->bindParam(':last_updated', $this->last_updated);
            
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
            return false;
        }

        return true;
    }

    public function update() {
        $query = "UPDATE `order_details` SET quantity=:quantity, last_updated=:last_updated WHERE product_id=:product_id AND order_id=:order_id";
        try {
            $stmt = $this->conn->prepare($query);
            $this->order_id = htmlspecialchars(strip_tags($this->order_id)); 
            $this->product_id = htmlspecialchars(strip_tags($this->product_id)); 
            $this->quantity = htmlspecialchars(strip_tags($this->quantity));
            $this->last_updated = htmlspecialchars(strip_tags($this->last_updated));
            
            $stmt->bindParam(':quantity', $this->quantity);
            $stmt->bindParam(':last_updated', $this->last_updated);
            $stmt->bindParam(':product_id', $this->product_id);
            $stmt->bindParam(':order_id', $this->order_id);
            
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
            return false;
        }

        return true;
    }

    public function delete() {
        $query = "DELETE FROM `order_details` WHERE product_id=:product_id AND order_id=:order_id";
        try {
            $stmt = $this->conn->prepare($query);
            $this->product_id = htmlspecialchars(strip_tags($this->product_id)); 
            $this->order_id = htmlspecialchars(strip_tags($this->order_id)); 
            $stmt->bindParam(':product_id', $this->product_id);
            $stmt->bindParam(':order_id', $this->order_id);
            
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Error". $e->getMessage();
            return false;
        }

        return true;
    }
}

?>