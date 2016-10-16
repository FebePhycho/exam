/**
 * Created by lichunyu on 16/9/22.
 *
 * 题库模块
 */
angular.module("app.subjectModule",["ng"])
//控制器
    .controller("subjectController", ["$scope","commentService","subjectService","$filter","$routeParams",
        function ($scope,commentService,subjectService,$filter,$routeParams) {
            //调用服务方法加载题目属性信息，并且进行绑定
            $scope.params = $routeParams;
            $scope.isShow = true;

            //封装筛选数据时用的模板对象
            var subjectModel =(function () {
                var obj = {};
                if($routeParams.typeId!=0){
                    obj['subject.subjectType.id'] = $routeParams.typeId;
                }
                if($routeParams.dpId!=0){
                    obj['subject.department.id'] = $routeParams.dpId;
                }
                if($routeParams.topicId!=0){
                    obj['subject.topic.id'] = $routeParams.topicId;
                }
                if($routeParams.levelId!=0){
                    obj['subject.subjectLevel.id'] = $routeParams.levelId;
                }
                console.log("参数对象",obj);
                return obj;
            })();

            //服务调用
            commentService.getAllType(function (data) {
                $scope.types = data;
            });
            commentService.getAllLevels(function (data) {
                $scope.levels = data;
            });
            commentService.getAllDepartmentes(function (data) {
                $scope.departmentes = data;
            });
            commentService.getAllTopics(function (data) {
                $scope.topics = data;
            });
            //调用subjectService获取所有题目信息
            subjectService.getAllSubjects(subjectModel,function (data) {
                //遍历所有的题目，计算出选择题的答案，并且将答案赋给subject.answer
                data.forEach(function (subject) {
                    //获取正确答案
                    if(subject.subjectType.id != 3){
                        var answer = [];
                        subject.choices.forEach(function (choice,index) {
                            if(choice.correct){
                                //将索引转换为A/B/C/D
                                var no = $filter('indexToNo')(index);
                                answer.push(no);
                            }
                        });
                        //将计算出来的正确答案赋给subject.answer
                        subject.answer = answer.toString();
                    }

                });
                $scope.subjects = data;
            });

        }])
    //larry 赵  terry boss;  kevin ELEE robin 刘  5000
    //题目服务，封装操作题目的函数 11 —(7)— 7 转正（评估 代码量）12 -15
    .service("subjectService",["$http",function ($http) {
        this.getAllSubjects = function (params,handler) {
           //$http.get("http://127.0.0.1:8080/test/exam/manager/getAllSubjects.action",{
           $http.get("data/subjects.json",{
                params:params
            }).success(function (data) {
                //$http.get("data/subjects.json").success(function (data) {
                handler(data);
            });
        }
        //灭罪师 罪犯230 警察120 狗-蛇
    }])
    //公共服务 用于获取题目相关信息
    .factory("commentService",["$http",function ($http) {
        return {
            getAllType:function(handler){
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action").success(function (data) {
                $http.get("data/types.json").success(function (data) {
                    handler(data);
                });
            },
            getAllLevels:function (handler) {
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action").success(function (data) {
                $http.get("data/levels.json").success(function (data) {
                    handler(data);
                });
            },
            getAllDepartmentes:function (handler) {
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action").success(function (data) {
                $http.get("data/departmentes.json").success(function (data) {
                    handler(data);
                });
            },
            getAllTopics:function (handler) {
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action").success(function (data) {
                $http.get("data/topics.json").success(function (data) {
                    handler(data);
                });
            }
        }
    }])
    //过滤器
    .filter("indexToNo",function () {
        return function (input) {
            var result ;
            switch (input){
                case 0:
                    result = 'A';
                    break;
                case 1:
                    result = 'B';
                    break;
                case 2:
                    result = 'C';
                    break;
                case 3:
                    result = 'D';
                    break;
                case 4:
                    result = 'E';
                    break;
                default:
                    result = 'F';
            }
            return result;
        }
    });
