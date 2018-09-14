<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
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


    public function refresh(Request $request)
    {
        return response($this->attemptRefresh());
    }

    protected function attemptRefresh()
    {

        $refreshToken = Cookie::get('refreshToken');

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();

        $refreshToken = DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        Cookie::queue(Cookie::forget('refreshToken'));

        return response()->json([], 200);
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
}
