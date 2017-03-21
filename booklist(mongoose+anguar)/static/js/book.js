var app=angular.module('myApp',[]);
	app.run(function($http) {
			  $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
			});
	app.controller('myController', ['$scope','$filter','$http', function($scope,$filter,$http){
		//获取数据
		function getInfo(){
		$http.get('/frist').then(function(data,statue,headers,attrs){
				  $scope.list = data.data.booklist;
				  for(i in $scope.list){
				  	$scope.list[i].price=parseInt($scope.list[i].price)
				  	$scope.list[i].id=parseInt(i)+312011	
				  }  
			})
		}	
		getInfo()

		$scope.author='作者';
		$scope.price='价格';
		$scope.name='书名';
		$scope.bool=false;
		$scope.menu='书号';
		//改变排序
		$scope.change=function(ty){
			$scope.bool=!$scope.bool;
			$scope.type=ty;
		}
		$scope.type1='id';
		$scope.jiansuo='检索方式';
		$scope.option="请输入检索的书号"
		//搜索框placeholder变化
		$scope.search=function(ty,inf){
			$scope.jiansuo=ty+'检索';
			$scope.option="请输入检索的"+ty+"";
		 	$scope.type1=inf;
		}
		//检索方式
		$scope.fun=function(typ){
			var obj={};
			obj[typ]=$scope.val;
			return obj;
			
		}
		$scope.isS='modal';//点击新增 按钮后是否关闭
	 	$scope.iShow=true;

	 	//增删改查
	 	//n为要显示的模态框，1=新增，2=修改，3=删除
	 	//myName 当前点击的书名
	    $scope.show=function(n,myName){
	    	if(n==1){
	    		$scope.iShow=false;
	    		$scope.leix="新增书目";
				$scope.sure="新增";
				
				$scope.push=function(){
				var obj1={
					name:$scope.val1,
					author:$scope.val2,
					price:$scope.val3
				}
				var reg=/^(0|[1-9]\d{1,9})$/;
				if(!reg.test($scope.val3)){//判断价格是否为数字
					alert('请输入正确的价格');
					$scope.isS="";
				}else{
					if($scope.val1&&$scope.val2&&$scope.val3){//判断是否都有输入
						$scope.isS='modal';
						$scope.val1=$scope.val2=$scope.val3="";
						$http.post('/list',obj1).then(function(data,statue,headers,attrs){//传入数据库
							 // $scope.list = data.data;
							})
						getInfo()
					}
					//清空框内文字
					$scope.clear=function(){
						$scope.val1=$scope.val2=$scope.val3="";
						}
					}
				}	
	    	}
	    	if(n==2){
	    		$scope.iShow=false;
	    		$scope.leix="修改信息";
				$scope.sure='修改';
				for (var i in $scope.list){
					if($scope.list[i].name==myName){//通过传入的书名 遍历 找出其他的值
						$scope.val1=$scope.list[i].name;
						$scope.val2=$scope.list[i].author;
						$scope.val3=$scope.list[i].price;
						var obj1={//最初点击时候的内容
								name:$scope.list[i].name,
								author:$scope.list[i].author,
								price:$scope.list[i].price
							}
						$scope.push=function(){
							var obj2={//最终改变后的内容
								name:$scope.val1,
								author:$scope.val2,
								price:$scope.val3
							};
							$http.post('/update',[obj1,obj2]).then(function(data){
								// console.log(data)
							})
							getInfo();
							// $scope.list.splice(ins,1,obj2)
							$scope.val1=$scope.val2=$scope.val3="";
						}

					}
				}
				
	    	}
	    	if(n==3){
	    		$scope.iShow=true;
	    		$scope.leix="删除";
				$scope.sure='删除';
				$scope.name12=myName;
				$scope.push=function(){
					var obj2={
						name:myName
					}
					$http.post('/del',obj2).then(function(data){
						// console.log(data)
					})
					getInfo();
				}
	    	}
	    }
	}])
	