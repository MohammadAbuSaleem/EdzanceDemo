<table cellspacing="0" cellpadding="0" width="100%;" border="0" style="border-collapse:collapse;padding:8px" dir=rtl>
    <tbody>
        <tr>
            <td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff;padding: 0 12px;">
                <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse">
                    <tbody>
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse">
                                    <tbody>
                                        <tr>
                                            <td height="16" style="line-height:16px" colspan="3">&nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="32" align="right" valign="middle" style="height:32;line-height:0px">
                                                    <img src="{{ URL::to('/') }}/img/logo.png" height="32" style="border:0">
                                            </td>
                                        </tr>
                                        <tr style="border-bottom:solid 1px #e5e5e5">
                                            <td height="16" style="line-height:16px" colspan="3">&nbsp;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse">
                                    <tbody>
                                        <tr>
                                            <td height="15" style="line-height:15px">
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="{{ URL::to('/#/reset-password/'. $email . '/' . $token) }}" style="color:#593F7F;text-decoration:none;font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px">تغيير كلمة المرور
                                                </a>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td height="5" style="line-height:5px">
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                                    اهلا بك فى موقع ادزانس
                                                </span>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td height="5" style="line-height:5px">
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                                    عزيزى المستخدم {{$user}}،
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="10" style="line-height:10px">&nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                                  لقد طلبت تغيير كلمة المرور الخاصة بك, لتغيير كلمة المرورالرجاء الضغط على الزر الموجود
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;margin-top: 15px;">
                                    <tbody>
                                        <tr>
                                            <td><span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                                <a href="{{ URL::to('/#/reset-password/'. $email . '/' . $token) }}" style ="color: #ffffff; background-color: #593F7F; padding: 10px 20px; text-decoration: none; font-size: 17px; line-height: 1.3333333; border: 1px solid #321b51;">
                                               تغيير كلمة المرور
                                                </a>
                                            </span></td>
                                        </tr>
                                        <tr>
                                            <td height="25" style="line-height:25px">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:14px;line-height:19px;color:#898f9c">
                                                سوف تنتهى صلاحية هذا الرابط بعد 6 ساعات، تأكد ان تستخدمه على الفور.
                                            </span></td>
                                        </tr>
                                         <tr>
                                            <td height="10" style="line-height:10px">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse">
                                    <tbody>
                                        <tr style="border-top:solid 1px #e5e5e5">
                                            <td height="16" style="line-height:16px">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="font-size:11px;color:#aaaaaa;line-height:16px">تم إرسال هذه الرسالة إلى ‏‎ <a href="mailto:{{$email}}" style="color:#593F7F;text-decoration:none" target="_blank">{{$email}}</a>كما طلبت.</td>
                                        </tr>
                                          <tr>
                                            <td height="14" style="line-height:14px">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>