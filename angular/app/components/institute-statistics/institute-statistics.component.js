class InstituteStatisticsController{
    constructor($scope){
        'ngInject';
        $scope.options1 = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){ return d.label; },
                y: function(d){ return d.value; },
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'الصفوف الدراسية'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };
        $scope.data1 = [{
            key: "Cumulative Return",
            values: [
                { "label" : "الاول" , "value" : 10 },
                { "label" : "الثاني" , "value" : 5 },
                { "label" : "الثالث" , "value" : 4 },
                { "label" : "الرابع" , "value" : 12 },
                { "label" : "الخامس" , "value" : 14 },
                { "label" : "السادس" , "value" : 6},
                { "label" : "السابع" , "value" : 16 },
                { "label" : "الثامن" , "value" : 4 }
                ]
        }];
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: 1.5
            }
        ];
    }

    $onInit(){
    }
}

export const InstituteStatisticsComponent = {
    templateUrl: './views/app/components/institute-statistics/institute-statistics.component.html',
    controller: InstituteStatisticsController,
    controllerAs: 'vm',
    bindings: {}
}