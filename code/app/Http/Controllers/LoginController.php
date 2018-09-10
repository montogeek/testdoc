<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Http\Request;
use App\User;

class LoginController extends Controller
{
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function login(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $response = $this->attemptLogin($email, $password);

        return response($response);
    }

    protected function attemptLogin($email, $password)
    {
        $user = User::where('email', $email)->first();

        if ($user !== null) {
            return $this->proxy('password', [
                'username' => $email,
                'password' => $password
            ]);
        }

        throw new UnauthorizedHttpException('', 'Not authorized');

    }

    protected function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'grant_type' => $grantType,
            'client_id' => env('PASSWORD_CLIENT_ID'),
            'client_secret' => env('PASSWORD_CLIENT_SECRET')
        ]);

        $request = Request::create('/oauth/token', 'POST', $data);
        $response = app()->handle($request);

        if ($response->isSuccessful()) {
            $responseData = json_decode($response->getContent());

            Cookie::queue('refreshToken', $responseData->refresh_token, 864000, null, null, false, true);

            return [
                'access_token' => $responseData->access_token,
                'expires_in' => $responseData->expires_in
            ];
        }

        throw new UnauthorizedHttpException('', 'Not authorized');
    }

    public function refresh(Request $request)
    {

    }

    public function logout()
    {

    }
}
