deleteBoxClass.$inject = ['$rootScope']
function deleteBoxClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
            elements.click(function() {
                $(".dropdown").removeClass("open");
            });
             elements.on("click", function(){
             	//console.log(attr);
		       var postId = $(this).attr('data-post-id');
		       var postkey = $(this).attr('data-post-key');
		        var postindex = $(this).attr('data-post-index');
		       var postType = $(this).attr('data-post-type');

		       //var postType2 = $(this).attr('comment-index');
		       var postType2 = $(this).closest("comment-repeat").attr('comment-index');
		       console.log(postType2);
		       console.log(postType);
		        switch(postType) {
		               case 'files':  
						var postlocation ='virtualclass-files'; 
		               break;
	                  case 'homework':  
						var postlocation ='virtualclass-homework'; 
		               break;
	                  case 'exam':  
						var postlocation ='virtualclass-exam'; 
		               break;
	                  case 'post':  
						var postlocation =$("post-repeat").attr('req-parent'); 
		               break;
	                    case 'classpost':  
						var postlocation =$("post-repeat").attr('req-parent'); 
		               break;
	                    case 'comment':  
						var postlocation =$rootScope.controller; 
		               break;
	       		}
		        var postScope = angular.element(postlocation).scope();
		        var modelTitle = '';
		        var modelTitleConf = '';
		       //console.log(postId);
		       //console.log(postkey);
		       //console.log(postlocation);
		      // console.log(postType);
		      // console.log(postType2);
		       //console.log(postScope);
		       if(postType == 'comment'){
		       		modelTitle = "هل انت متأكد من حذف التعليق ؟";
		       		modelTitleConf = "تم حذف التعليق";
		       }else if(postType == 'files') {
		       		modelTitle = "هل انت متأكد من حذف الملف ؟";
		       		modelTitleConf = "تم حذف الملف";
		       }else if(postType == 'homework') {
		       		modelTitle = "هل انت متأكد من حذف الواجب ؟";
		       		modelTitleConf = "تم حذف الواجب";
		       }else if(postType == 'exam') {
		       		modelTitle = "هل انت متأكد من حذف الامتحان ؟";
		       		modelTitleConf = "تم حذف الامتحان";
		       }else {
		       		modelTitle = "هل انت متأكد من حذف المنشور ؟"
		       		modelTitleConf = "تم حذف المنشور";
		       }
		        swal({   
		           title: modelTitle,    
		            type: "warning",   
		            showCancelButton: true,   
		            confirmButtonColor: "#DD6B55",   
		            confirmButtonText: "نعم, احذفه",   
		            cancelButtonText: "لا, الغاء العمليه",   
		            closeOnConfirm: false,   
		            closeOnCancel: true ,
		           showLoaderOnConfirm: true
		        }, function(isConfirm){   
		            if (isConfirm) {
		            swal({
		                title: modelTitleConf,
		                type: "success",
		                    timer: 2000,
		                    showConfirmButton: false
		              });      
		                 postScope.$root.deleteNode(postId,postkey,postScope,postType,postType2); 
		               //elements.closest(".for-delete").hide();
		               //  $("#name="post-{{key}}"")
		            } else {        
		              swal({
		                title: "لقد تم الغاء عملية الحذف :)",
		                type: "error",
	                    timer: 2000,
	                    showConfirmButton: false
		              });
		            } 
		        });
		    });
              //Warning Message
		    $('#sa-warning').click(function(){
		        swal({   
		            title: "هل انت متأكد؟؟",   
		            text: modelTitle,   
		            type: "warning",   
		            showCancelButton: true,   
		            confirmButtonColor: "#DD6B55",   
		            confirmButtonText: "نعم!",   
		            closeOnConfirm: false 
		        }, function(){   
		            swal("Deleted!", "Your imaginary file has been deleted.", "success"); 

		        });
		    });
        }
    }
}
export const deleteBoxClassComponent = deleteBoxClass
