<!DOCTYPE html>
<html ng-app="app" route-html>
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
      <meta name="Keywords" lang="ar" content="">
      <meta name="Description" content=""> 
      <meta name="theme-color" content="#593F7F">
      <meta name="google-site-verification" content="gpxKHgM65V6negN2oXKpcwvFMzMeTVUQVq59IcP4tvU" />
      <link rel="stylesheet" href="{!! elixir('css/vendor.css') !!}">
      <link rel="stylesheet" href="{!! elixir('css/app.css') !!}">
      <!-- Facebook Card -->
      <meta property="og:title" content="قم بالتواصل مع زملائك ومدرسيك من خلال شبكة ادزانس للتواصل.">
      <meta property="og:type" content="article">
      <meta property="og:url" content="http://www.ed-zance.com/">
      <meta property="og:image" content="http://www.ed-zance.com/img/edzance-logo/edzanec-logo.jpg">
      <meta property="og:site_name" content="ادزنس">
      <meta property="og:description" content="تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات الامتحانات , شارك زملائك آرائك ونقاشاتك وتطلعاتك .">
    <title ng-bind="$root.pageTitle + $root.addOne"></title>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> 
    <script> (adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-2067358913948217", enable_page_level_ads: true });
    </script>
    <script>
     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
       ga('create', 'UA-89554119-1', 'auto');
       ga('send', 'pageview');
      </script>
      <base href="/">
  </head>
  <body route-body>
    <div class="wrapper">
      <div ui-view="layout"></div>
      <script src="firebasejs/firebase.js"></script>
      <script src="firebasejs/firebase-app.js"></script>
      <script src="firebasejs/firebase-auth.js"></script>
      <script src="firebasejs/firebase-database.js"></script>
      <script src="firebasejs/firebase-messaging.js"></script>
      <script src="firebase-messaging-sw.js"></script>
      <!-- Leave out Storage -->
      <script src="firebasejs/firebase-storage.js"></script>
      <!-- <script src='//maps.googleapis.com/maps/api/js?key=AIzaSyBqUJtZw37KkShYAVd39dde3tS1uoSqMNE'></script> -->
      <!-- <script src='//maps.googleapis.com/maps/api/js?sensor=false'></script> -->

      <!-- <script type="text/javascript" src="js/map.js"></script> -->
      <script src="moment-with-locales.min.js"></script>
      <script src="{!! elixir('js/vendor.js') !!}"></script>
      <script src="{!! elixir('js/partials.js') !!}"></script>
      <script src="ar-sa.js"></script>
      <script src="js/jquery.liveurl.js"></script>
      <script src="{!! elixir('js/app.js') !!}"></script>
      <script src="js/jquery-2.1.1.min.js"></script>
      <script src="js/readmore.min.js"></script>
      <!-- div class="control-sidebar-bg"></div>-->
      <script src="vendors/light-gallery/lightGallery.min.js"></script> 
      <!-- <script src="vendors/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js"></script> -->
      <script type='text/javascript' src="js/crypto/aes.js"></script>
      <script type='text/javascript' src="js/crypto/mdo-angular-cryptography.js"></script>
      <script type='text/javascript' src="js/emojionearea.js"></script>

      <script>
          // Initialize the Firebase SDK
            var config = {
              apiKey: "AIzaSyBlqPwHbiD5xJ4Ni2XJR8PY59Pp6YIT-fo",
              authDomain: "test1-f73d3.firebaseapp.com",
              databaseURL: "https://test1-f73d3.firebaseio.com",
              projectId: "test1-f73d3",
              storageBucket: "test1-f73d3.appspot.com",
              messagingSenderId: "840194169268"
            };
            firebase.initializeApp(config);
          // Initialize Firebase
          // var config = {
          //   apiKey: "AIzaSyDekhKS98L0D41CswtFkYSHxZKtEzeQqs8",
          //   authDomain: "edzance-142f7.firebaseapp.com",
          //   databaseURL: "https://edzance-142f7.firebaseio.com",
          //   storageBucket: "edzance-142f7.appspot.com",
          //   messagingSenderId: "3337121523"
          // };
          // firebase.initializeApp(config);
      </script> 

    </div>  
  </body>
</html>
