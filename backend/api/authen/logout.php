<?php
require_once('../../utils/utility.php');
require_once('../../database/dbhelper.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Xử lý preflight request (nếu có)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Phương thức không được hỗ trợ."
    ]);
    exit;
}

// Lấy thông tin người dùng từ token
session_start();
$user = getUserToken();

if ($user != null) {
    // Lấy token từ cookie
    $token = getCookie('token');

    // Xóa token trong database
    $sql = "DELETE FROM tokens WHERE user_id = '{$user['id']}' AND token = '$token'";
    execute($sql);

    // Xóa token trong cookie
    setcookie('token', '', time() - 3600, '/');

    // Hủy session
    session_destroy();

    // Trả về phản hồi JSON
    echo json_encode([
        "success" => true,
        "message" => "Đăng xuất thành công."
    ]);
    exit;
}

// Nếu không tìm thấy người dùng
echo json_encode([
    "success" => false,
    "message" => "Người dùng chưa đăng nhập."
]);
?>
