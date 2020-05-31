liveUrlClass.$inject = ['$rootScope']
function liveUrlClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 2, 
        link: function(scope, elements, attr) {
           if($rootScope.liveUrlFlag == false){
                $rootScope.liveUrlFlag = true;
                elements.on('paste', function (e) {
                    scope.live_title = '';
                    scope.live_description = '';
                    scope.live_url = '';
                    scope.live_image = '';
                    $rootScope.posturl = '';
                    $rootScope.posttitle = '';
                    $rootScope.postdescription ='';
                    $rootScope.postimage = '';
            		var curImages = new Array();
                    scope.closeUrl = true
                    elements.liveUrl({
                        loadStart : function(){
                            $rootScope.post_disable = true;
                            $('.liveurl-loader').show();
                        },
                        loadEnd : function(){
                            $('.liveurl-loader').hide();

                           $rootScope.post_disable = false;
                        },
                        success : function(data) 
                        {                       
                            console.log(data) 
                            //impor
                           $rootScope.posttitle = data.title;
                           $rootScope.postdescription = data.description;
                           $rootScope.posturl = data.url;
                           
                            var output = $('.liveurl');
                            output.find('.title').text(data.title);
                            output.find('.description').text(data.description);
                            output.find('.url').text(data.url);
                            output.find('.image').empty();

                            output.find('.close').one('click', function() 
                            {
                                $rootScope.liveUrlFlag = false;
                                scope.closeUrl = false
                                var liveUrl     = $(this).parent();
                                liveUrl.hide('fast');
                                liveUrl.find('.video').html('').hide();
                                liveUrl.find('.image').html('');
                                liveUrl.find('.controls .prev').addClass('inactive');
                                liveUrl.find('.controls .next').addClass('inactive');

                                liveUrl.find('.thumbnail').hide();
                                liveUrl.find('.image').hide();
                                $('textarea').trigger('clear');
                                curImages = new Array();
                                scope.showlive=0;
                                scope.live_title = '';
                                scope.live_description = '';
                                scope.live_url = '';
                                scope.live_image = '';
                                $rootScope.posturl = '';
                                $rootScope.posttitle = '';
                                $rootScope.postdescription ='';
                                $rootScope.postimage = '';
                            });
                            output.show('fast');
                            // if (data.video != null) {

                            // angular.element('nav').scope().$root.postvideo=data.video.file ;
                            // var ratioW        = data.video.width  /350;
                            //     data.video.width  = 350;
                            //     data.video.height = data.video.height / ratioW;

                            //     var video = 
                            //     '<object width="' + data.video.width  + '" height="' + data.video.height  + '">' +
                            //         '<param name="movie"' +
                            //               'value="' + data.video.file  + '"></param>' +
                            //         '<param name="allowScriptAccess" value="always"></param>' +
                            //         '<embed src="' + data.video.file  + '"' +
                            //               'type="application/x-shockwave-flash"' +
                            //               'allowscriptaccess="always"' +
                            //               'width="' + data.video.width  + '" height="' + data.video.height  + '"></embed>' +
                            //     '</object>';
                            //     output.find('.video').html(video).show();        
                            // }
                        },
                        addImage : function(image)
                        {   
                            var output  = $('.liveurl');
                            var jqImage = $(image);
                            jqImage.attr('alt', 'Preview');
                            
                            if ((image.width / image.height)  > 7 
                            ||  (image.height / image.width)  > 4 ) {
                                // we dont want extra large images...
                                return false;
                            } 

                            curImages.push(jqImage.attr('src'));
                            output.find('.image').append(jqImage);
                            //console.log(jqImage[0].src);
                            //impor
                            $("#postbody").attr("url-image", jqImage[0].src);
                            $rootScope.postimage = jqImage[0].src;
                           
                            if (curImages.length == 1) {
                                // first image...
                                
                                output.find('.thumbnail .current').text('1');
                                output.find('.thumbnail').show();
                                output.find('.image').show();
                                jqImage.addClass('active');
                                
                            }
                            
                            if (curImages.length == 2) {
                                output.find('.controls .next').removeClass('inactive');
                            }
                            
                            output.find('.thumbnail .max').text(curImages.length);
                        }
                    });
                
            });
            }
        }
    }
}
export const liveUrlClassComponent = liveUrlClass
