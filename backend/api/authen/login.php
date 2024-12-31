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
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // Kiểm tra dữ liệu đầu vào
    if (empty($email) || empty($password)) {
        echo json_encode([
            "success" => false,
            "message" => "Vui lòng nhập email và mật khẩu."
        ]);
        exit;
    }

    // Mã hóa mật khẩu
    $hashedPassword = getSecurityMD5($password);

    // Kiểm tra thông tin người dùng trong database
    $sql = "SELECT * FROM user WHERE email = '$email' AND password = '$hashedPassword' AND deleted = 0";
    $user = executeResult($sql, true);

    if ($user == null) {
        echo json_encode([
            "success" => false,
            "message" => "Email hoặc mật khẩu không đúng."
        ]);
        exit;
    }

    // Tạo token và lưu vào database
    $token = getSecurityMD5($user['email'] . time());
    $created_at = date('Y-m-d H:i:s');
    $sql = "INSERT INTO tokens (user_id, token, created_at) VALUES ('{$user['id']}', '$token', '$created_at')";
    execute($sql);

    // Trả về phản hồi JSON
    echo json_encode([
        "success" => true,
        "message" => "Đăng nhập thành công.",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "fullname" => $user['fullname'],
            "email" => $user['email']
        ]
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
