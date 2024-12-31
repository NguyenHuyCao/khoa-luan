<?php
require_once('../../utils/utility.php');
require_once('../../database/dbhelper.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Xử lý preflight request (nếu có)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Nhận dữ liệu JSON từ frontend
    $data = json_decode(file_get_contents('php://input'), true);
    $fullname = $data['fullname'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // Kiểm tra dữ liệu đầu vào
    if (empty($fullname) || empty($email) || empty($password) || strlen($password) < 6) {
        echo json_encode([
            "success" => false,
            "message" => "Vui lòng điền đầy đủ thông tin và mật khẩu ít nhất 6 ký tự."
        ]);
        exit;
    }

    // Kiểm tra email đã tồn tại
    $sql = "SELECT * FROM user WHERE email = '$email'";
    $userExist = executeResult($sql, true);

    if ($userExist != null) {
        echo json_encode([
            "success" => false,
            "message" => "Email đã tồn tại."
        ]);
        exit;
    }

    // Lưu thông tin người dùng vào database
    $hashedPassword = getSecurityMD5($password);
    $created_at = date('Y-m-d H:i:s');
    $sql = "INSERT INTO user (fullname, email, password, role_id, created_at, updated_at, deleted)
            VALUES ('$fullname', '$email', '$hashedPassword', 2, '$created_at', '$created_at', 0)";
    execute($sql);

    echo json_encode([
        "success" => true,
        "message" => "Đăng ký thành công."
    ]);
    exit;
}

// Nếu phương thức không hợp lệ
http_response_code(405);
echo json_encode([
    "success" => false,
    "message" => "Phương thức không được hỗ trợ."
]);
?>
