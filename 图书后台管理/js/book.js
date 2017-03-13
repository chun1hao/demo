var app=angular.module('myApp',[]);
	app.run(function($http) {
			  $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
			});

	app.controller('myController', ['$scope','$filter','$http', function($scope,$filter,$http){
		$http.get('../data.json',{params:{'name':'傲慢与偏见'}}).then(function(data,statue,headers,attrs){
			 $scope.list = data.data;
		})
		$scope.id='序号';
		$scope.author='作者';
		$scope.price='价格';
		$scope.name='书名';
		$scope.bool=false;
		$scope.menu='书号';
		$scope.change=function(ty){
			$scope.bool=!$scope.bool;
			$scope.type=ty;
		}
		$scope.type1='id';
		$scope.jiansuo='检索方式';
		$scope.option="请输入检索的书号"
		$scope.search=function(ty,inf){
			$scope.jiansuo=ty+'检索';
			$scope.option="请输入检索的"+ty+"";
		 	$scope.type1=inf;
		 	// console.log($scope.type1)
		}

		$scope.fun=function(typ){
			var obj={};
			obj[typ]=$scope.val;
			return obj;
			
		}
		
	 	$scope.iShow=true;
	 	//n为要显示的模态框
	 	//i 为当前点击的id值
	 	//inc 是当前显示的列表的下标
	    $scope.show=function(n,i,inc,myName){
	    	//ins是当前点击的位于数组的下标
			var ins=i-31201115;
			var len=$scope.list.length;
	    	if(n==1){
	    		$scope.iShow=false;
	    		$scope.leix="新增书目";
				$scope.sure="新增";
				$scope.push=function(){
				var obj1={
					id:len+31201115,
					name:$scope.val1,
					author:$scope.val2,
					price:$scope.val3
				}
				
				if($scope.val1&&$scope.val2&&$scope.val3){
					$scope.list.push(obj1);
					$scope.val1=$scope.val2=$scope.val3="";
				}
				}
				$scope.clear=function(){
					$scope.val1=$scope.val2=$scope.val3="";
				}
	    	}
	    	if(n==2){
	    		$scope.iShow=false;
	    		$scope.leix="修改信息";
				$scope.sure='修改';
				
				$scope.val1=$scope.list[ins].name;
				$scope.val2=$scope.list[ins].author;
				$scope.val3=$scope.list[ins].price;
				
				$scope.push=function(){
					var obj2={
						id:i,
						name:$scope.val1,
						author:$scope.val2,
						price:$scope.val3
					};
					$scope.list.splice(ins,1,obj2)
					$scope.val1=$scope.val2=$scope.val3="";
				}
	    	}
	    	if(n==3){
	    		$scope.iShow=true;
	    		$scope.leix="删除";
				$scope.sure='删除';
				$scope.name12=myName;
				
				$scope.push=function(){
					// $scope.list.splice(inc,1)
					// console.log(i)
					delete $scope.list[ins]
				}
	    	}
	    }
	}])
	// app.filter('myF',function(){
	// 	return function(a,b){
	// 		return `${b}${a}`
	// 	}
	// })