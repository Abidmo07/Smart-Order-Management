<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Str;

class AuthController extends Controller
{
    public function Register(Request $request){
        $data=$request->validate([
          "name"=>"required|string",
          "email"=>"required|email",
          "password"=>"required|confirmed|min:8"
        ]);
        $data["password"]=Hash::make($data["password"]);
        $user=User::create($data);
        $user->sendEmailVerificationNotification();
        return response()-> json([
            "message"=> "user registred with success.Please verify you email",
            "user"=> $user
        ],201);
    }
    public function Login(Request $request){
        $credentials=$request->validate([
            "email"=>["required","email"],
            "password"=> "required|min:8"
        ]);
        if(!Auth::attempt($credentials)){
            return response()->json([
                "message"=> "invalide credentials"
            ],401);
        }
        $user=Auth::user();
        $token=$user->createToken("Auth-token")->plainTextToken;
        return response()->json([
            "message"=> "logged in with success",
            "user"=> $user,
            "token"=> $token
        ]);
    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            "message"=> "logged out with success"
        ])->withoutCookie("Auth-token");
    }

    public function emailVerify($user_id, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json([
                'message' => 'Invalid or expired verification code.',
            ], 400);
        }

        $user = User::findOrFail($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 400);
        }

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            return response()->json([
                'message' => 'Email address successfully verified',
                'user' => $user,
            ]);
        }

        return response()->json([
            'message' => 'Email address already verified.',
        ], 400);
    }

    public function ResendEmailVerification(Request $request){
        $request->user()->sendEmailVerificationNotification();
        return response()->json([
            "message"=> "verification email resent"
        ]);

    }
    public function ForgotPassword(Request $request){
        $request->validate([
            "email"=> ["required","email"]
        ]);
        Password::sendResetLink($request->only("email"));
        return response()->json([
            "message"=> "password reset link sent "
        ]);
    }
    public function ResetPassword(Request $request){
        $request->validate([
            "email"=> ["required","email"],
            "token"=>["required"],
            "password"=> ["required","confirmed","min:8"]
        ]);
        $status=Password::reset(
            $request->only("email","password","password_confirmation","token"),
            function($user,$password){
                $user->forceFill( [
                    "password"=>Hash::make($password),
                ])->setRememberToken(\Illuminate\Support\Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );

        return $status === Password::PasswordReset

        ? response()->json(['message' => 'Password reset successfully'])
        : response()->json(['message' => 'Invalid token'], 400);

    }
}
