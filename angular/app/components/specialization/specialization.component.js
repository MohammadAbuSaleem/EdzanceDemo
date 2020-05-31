class SpecializationController{
    constructor($scope,$stateParams,$rootScope,API){
        'ngInject';
        this.scope = $scope;
        this.API = API;
        this.friendIndex = 0;
        //
    }
    follow($friend,$update,$idx,$scope){
       this.API.all('me/'+$friend+'/follow/'+$update ).post('').then((response) => {
        //console.log(this.scope.univ);
       // console.log("----------");

        this.fr[$friend]=null;
        this.scope.univ.splice(this.fr[$friend], 1);
       
          this.scope.univ.map(function(item,key){

              console.log(item.id+":"+key);
          })// console.log(this.scope.univ);
       // $scope = this.scope;
        this.friendIndex ++;
       });
       if(this.friendIndex == 5){
          this.API.all('me/university').get('').then((response) => {
              this.scope.univ=response.data;
               this.friendIndex =0;
         });
       }
       //console.log(this.friendIndex ++);
     }
    $onInit(){
        this.API.all('me/university').get('').then((response) => {
              this.scope.univ = response.data;

          this.scope.univ.map(function(item,key){

              console.log(item.id+":"+key);
          })
              // $scope=this.scope;
         });
    }
}

export const SpecializationComponent = {
    templateUrl: './views/app/components/specialization/specialization.component.html',
    controller: SpecializationController,
    controllerAs: 'vm',
    bindings: {}
}
 

