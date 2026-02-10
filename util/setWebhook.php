<?php

//$telegramSecretHeader = 'X-Telegram-Bot-Api-Secret-Token';

$url = 'https://api.telegram.org/bot7860418614:AAGB4X7hMygGdNADYB3kDXdjf1ipHMfEiXo/';

$certificate = new CURLFile('t-self-signed-public.pem');

$data = [
    'url' => 'https://167.71.52.59/api/v1/process-update/',
    'certificate' => $certificate,
    'ip_address' => '167.71.52.59',
    'allowed_updates' => ['message'],
    'drop_pending_updates' => true,
    'secret_token' => 'uGIugo988998HYUG1LSjoapf123'
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

$response = curl_exec($ch);

if (curl_error($ch)) {
    echo 'cURL error: ' . curl_error($ch);
}

curl_close($ch);

echo $response;