<html>
  <head>
    <title> ادزانس</title>
   <style>
       @font-face {
	    font-family: Janna;
		    src: url(Bahij_Janna-Regular.ttf);
		}
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: table;
        font-weight: 100;
        font-family: 'Janna';
        direction: rtl;
        background: #fff;
      }

     .container {
        text-align: center;
        display: table-cell;
        vertical-align: middle;
      	padding-left: 12px;
		    padding-right: 12px;
      }

     .title {
        font-size: 24px;
    	line-height: 28px;
      }

     .quote {
        font-size: 16px;
		line-height: 28px;
		margin: 20px 0;
      }
  	 .img-404 {
	   	max-width: 300px;
		  width: 100%;
     }
     .back-link {
     	margin-top: 40px;
     	margin-bottom: 30px;
     }
     .back-link a {
 	   	 color: #ffffff;
	    background-color: #593f7f;
	    padding: 10px 20px;
	    text-decoration: none;
	    font-size: 17px;
	    line-height: 1.3333333;
	    border-radius: 2px;
     }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
      		<h2 class="title">نعتذر! الصفحة المطلوبة غير متوفرة ...</h2>
      		<h3 class="quote">الصفحة التي طلبتها غير موجودة حالياً, قد تكون كتبت الرابط بطريقة خاطئة</h3>
    	<div class="title"><img src="{{URL::to('/')}}/img/404.png" class="img-404" /></div>
    	<div class="back-link">
	    	<a href="{{URL::to('/')}}">
	    		الصفحة الرئيسية
	    	</a>
    	</div>
      </div>
    </div>
  </body>
</html>