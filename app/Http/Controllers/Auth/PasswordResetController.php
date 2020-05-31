<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Http\Request;
use Mail;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|exists:users,email',
        ]);

        //invalidate old tokens
        PasswordReset::whereEmail($request->email)->delete();
        $details = User::whereEmail($request->email)->first();
        $user = $details->name .' '. $details->last_name;
        $email = $request->email;
        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);
        $token = $reset->token;
       Mail::send('emails.reset_link',compact('email', 'token','user'), function ($message) use ($email) {
                $message->from('noreplay@ed-zance.com', 'ادزانس');
                $message->to($email)->subject('استعادة كلمة المرور');
            });

        return response()->success(true);
    }

    public function verify(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
        ]);

        $check = PasswordReset::whereEmail($request->email)
        ->whereToken($request->token)
        ->first();

        if (!$check) {
            return response()->error('Email does not exist', 422);
        }

        return response()->success(true);
    }

    public function reset(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'token'    => "required|exists:password_resets,token,email,{$request->email}",
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::whereEmail($request->email)->firstOrFail();
        $user->password = bcrypt($request->password);
        $user->save();

        //delete pending resets
        PasswordReset::whereEmail($request->email)->delete();

        return response()->success(true);
    }
}
