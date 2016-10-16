/**
 * Created by admin on 2016/9/22.
 * 这是项目的核心js
 */

//左侧导航动画
$(function () {
    //收缩全部
    $(".baseUI>li>ul").slideUp("fast");

    $(".baseUI>li>a").off("click");
    $(".baseUI>li>a").on("click",function () {
        $(".baseUI>li>ul").slideUp("fast");
        $(this).next().slideDown();
    });
    //默认让第一个展开
    $(".baseUI>li>a").eq(0).trigger("click");//eq返回jQuery对象，trigger立即执行

    //背景改变
    $(".baseUI ul>li").off("click");
    $(".baseUI ul>li").on("click",function () {
        if(!$(this).hasClass("current")){
            $(".baseUI ul>li").removeClass("current");
            $(this).addClass("current");
        }
    });
    //模拟点击全部题目，点击第一个li中的a，执行click事件
    $(".baseUI ul>li").eq(0).find("a").trigger("click");//后代用空格(.baseUI ul),直接子代用>(ul>li)
});
//项目核心模块
angular.module("app",["ng","ngRoute","app.subjectModule","app.paperModule"])
        .controller("mainController",["$scope",function ($scope) {

        }])
        .config(["$routeProvider",function ($routeProvider) {//$routeProvider是一个注入
            //配置
            $routeProvider.when("/SubjectList/dpId/:dpId/topicId/:topicId/levelId/:levelId/typeId/:typeId",{
                templateUrl:"tpl/subject/subjectList.html",
                controller:"subjectController"
            }).when("/SubjectAdd",{
                templateUrl:"tpl/subject/subjectAdd.html",
                controller:"subjectController"
            }).when("/SubjectDel/id/:id",{
                templateUrl:"tpl/subject/subjectList.html",
                controller:"subjectDelController"
            }).when("/PaperList",{
                templateUrl:"tpl/paper/paperManager.html",
                controller:"paperListController"
            }).when("/PaperAdd",{
                templateUrl:"tpl/paper/paperAdd.html",
                controller:"paperAddController"
            }).when("/PaperAddList",{
                templateUrl:"tpl/paper/subjectList.html",
                controller:"paperAddController"
            });
        }]);
