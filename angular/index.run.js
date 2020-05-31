
    import { RoutesRun } from './run/routes.run'
//import { EditableRun } from './run/editable.run'

angular.module('app.run')
  .run(RoutesRun)
 // .run(EditableRun)
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})
.run(function(Idle){
  // start watching when the app runs. also starts the Keepalive service by default.
  Idle.watch();
}) 
.run(function(amMoment) {
    amMoment.changeLocale('ar-sa');
});