class VirtualclassDiscussionController{
   constructor($stateParams,$scope,$rootScope, ContextService,API){
        'ngInject';
            
        let navHeader = this

        ContextService.me(function (data) {
          navHeader.userData = data
        })
           this.postC = 0;
           this.scope = $scope;
           this.rootScope = $rootScope;
           this.stateParams = $stateParams;
           this.rootScope.url=''
           this.scope.url=''
           this.url=''
           this.scope.dat=[]
           this.scope.univ=[]
           this.comment=[]
           this.scope.comment=[]
           this.API = API
    }

    getPost($, attributes){
        this.API.all('vc/post').get('').then((response) => {
              this.scope.dat = response.data;

        });
    }
    autolink(str, attributes){
        attributes = attributes || {};
        var attrs = "";
        for(name in attributes)
            attrs += " "+ name +'="'+ attributes[name] +'"';
        
        var reg = new RegExp("(\\s?)((http|https|ftp)://[^\\s<]+[^\\s<\.)])", "gim");
        str = str.toString().replace(reg, '$1<a href="$2">$2</a>');
        this.vurl=str;
        return str;
    }
    submitText($scope,data)
    {
              //$scope=this.scope;
          var type = "";
          console.log(this.rootScope);
          var url = this.rootScope.posturl;
          //console.log(url);
        if(url == undefined || url == '')
          {
             type = "text";
          }else {       
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                //console.log(match);
                //console.log(match[2].length);
                this.mm=match[2].tostring
                if (match && match[2].length == 11) {
                    console.log('type is video');
                    type = "video";
                } else {
                  console.log('type is url');
                    type = "url";
                }
            }
          var data = {
                class_id: this.stateParams.classid,
                textpost: this.textpost,
                tag: this.tag,
                media: this.media,
                title: this.title,
                description: this.description,
                media: this.mm,
                mediatitle: this.rootScope.posttitle,
                mediadesc: this.rootScope.postdescription,
                mediaimage: this.rootScope.postimage,
                type: type,
               place: 'virtual',
            };
           this.API.all('vc/post').post(data).then((response) => {
              response.data.post.media= 'https://www.youtube.com/v/' + response.data.post.media
              console.log(this.scope.dat);
              this.scope.dat.push(response.data.post);
              $scope=this.scope;
              this.postC ++;
              this.textpost = '';
              this.tag = '';
              this.title = '';
              this.description = '';
              this.media = '';
           });
    }
   submitImg($scope){
      var data = {
        textpost: this.imgPost,
        tag: this.tag,
      };
       this.API.all('vc/post').post(data).then((response) => {
          this.scope.dat.push(response.data.post);
          $scope=this.scope;
          this.postC ++;
       });
   }
   submitCode($scope){
      var data = {
        textpost: this.codePost,
        tag: this.tag,
      };
       this.API.all('vc/post').post(data).then((response) => {
          this.scope.dat.push(response.data.post);
          $scope=this.scope;
          this.postC ++;
       });
   }
  
   
  submitComment($id,$index,$scope){
     this.index = $index;
      var data = {
        body: this.comment[$id],
        user_id: this.userData.id,
        post_id: $id,
        status: 1,
      };
     // console.log('this.index before(+1):' +this.index )
      var a =0;
     a = this.index - this.postC ;
     //console.log(a + "= " + this.index + "-" + this.postC)
     this.index = this.index - this.postC ;
      //console.log('this.index after(+1):' +this.index )
     // console.log('this.postC:' + this.postC )
     // console.log(this.scope.dat)
      if (this.index<0) this.index= this.scope.dat.length -this.postC;
     //  console.log('this.index after(<0):' + this.index )
      this.API.all('me/'+$id+'/comment/create').post(data).then((response) => {
      this.scope.dat[this.index].comment.push(response.data.comment);
       $scope=this.scope;
       this.comment[$id]="";
       });
   }

   follow($friend,$update,idx,$scope){
       this.API.all('vc/'+$friend+'/follow/'+$update ).post('').then((response) => {
        console.log(this.scope);
                   this.scope.$parent.$parent.$parent.me.friends.push[response.data];    
         console.log(response.data);
         $scope=this.scope;
       
       });
     }
   exprission($post,$exp,$index,$scope){
       this.index = $index;
     this.API.all('vc/'+$post+'/make/'+$exp ).post('').then((response) => {
        console.log(this.scope);
        delete this.scope.dat[this.index][$exp];
        delete this.scope.dat[this.index][$exp+"Count"];
         this.scope.dat[this.index].push(response.data.post[$exp]);
         this.scope.dat[this.index][$exp].push(response.data.post[$exp+"Count"]);
        console.log(response.data);
         console.log(this.scope.dat[this.index]);
        $scope=this.scope;
       
       });
   }
  $onInit(){
        this.API.all('vc/post/'+this.stateParams.classid).get('').then((response) => {
              this.scope.dat = response.data;

    });
        this.API.all('vc/university').get('').then((response) => {
              this.scope.univ = response.data;
              // $scope=this.scope;
      
         });
  }
  upload() {
        console.log(this.file)
    }

}
export const VirtualclassDiscussionComponent = {
    templateUrl: './views/app/components/virtualclass-discussion/virtualclass-discussion.component.html',
    controller: VirtualclassDiscussionController,
    controllerAs: 'vm',
    bindings: {}
}


