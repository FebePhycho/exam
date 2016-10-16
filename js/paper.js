/**
 * Created by admin on 2016/9/28.
 * 试卷模块
 */
angular.module("app.paperModule",["ng","app.subjectModule"])
    .controller("paperAddController",["$scope","CommentService","$routeScope",function ($scope,CommentService,$routeScope) {
        //将查询到的所有的方向数据绑定到作用域
        CommentService.getAllDepartmentes(function (data) {
            $scope.departmentes = data;
        })
        //双向绑定对象
        $scope.model = {
            dId:1,
            title:"",
            desc:"",
            tt:"",
            at:"",
            scores:[],
            subjectIds:[]
        }
    }])
    .controller("paperListController",["$scope",function ($scope) {

}]);
