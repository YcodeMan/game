
window.onload = function () {
	game.start(); // 开始游戏
	
	// 按钮按下事件
	document.onkeydown = function ( e ) {
		var e = window.event || arguments[e];
		var allowedKeys = {
			37 : "left",
			38 : "up",
			39 : "right",
			40 : "down",
		};
		switch ( allowedKeys[e.keyCode] ) {
			case "left" :
			game.moveLeft();
				break;
			case "up" :
				break;
			case "right" : 
				break;
			case "down" :
				break;
			default :
			
		}
	}
}

var game = {
	data : [],  // 保存数字的二维数组
	r : 4,		// 行数
	c : 4,      // 列数
	score : 0,
	start : function () {
		this.init();
		this.randomNum();
		this.randomNum();
		this.updateView();
		
	},
	/**
	 * 初始化二维数组,分数
	 */
	init : function () {
		// 初始化二维数组
		for ( var row = 0; row < this.r; row++ ) {
			this.data[row] = [];
			for( var col = 0; col < this.c; col++ ) {
				this.data[row][col] = 0;
			}
		}
		
		
		
		this.score = 0;  //初始化分数
	},
	 /** 
	  * isFull 判断二维数组中是否空
	  * @return {Boolean} true 为满, false 为空
	  *  
	  */
	isFull : function () {
		for ( var row = 0; row < this.r; row++ ) {
			for( var col = 0; col < this.c; col++ ) {
				if ( this.data[row][col] === 0 ) {
					return false;	
				}
			}
		}
		return true;
	},
	/**
	 * randomNum 给二维数组空坐标随机生成一个2或4
	 */
	randomNum : function () {
		if ( !this.isFull() ) {  // 先判断当前数组是否为空,是否可以生成数字放入
			while ( true ) { // 循环获得一个空坐标
			
				// 随机从0-3中获得一个行号
				var row = parseInt( Math.random() * this.r );
				
				// 随机从0-3中获得一个列号
				var col = parseInt( Math.random() * this.c );
				if ( this.data[row][col] === 0 ){
					
					// 判断该坐标值是否为0,若为0,则随机生成2或4
					this.data[row][col] = Math.random() > 0.5 ? 2 : 4;
					break;
				}
			}
		}
	},
	/**
	 * updateView 修改数据
	 */
	updateView : function () {
		var doc = document,
			div,
			curr,
		    score;
		for( var row = 0; row < this.r; row++ ) {
			for (var col = 0; col < this.c; col++ ) {
				div = doc.getElementById( "c" + row + col );
				curr = this.data[row][col];
				
				// 获取相应的值
				div.innerHTML = curr !== 0 ? curr : ""; 
				
				// 添加相应的class
				div.className = curr !== 0 ? "cell n" + curr : "cell";
			}	
		}
		// 获得分数
	    score = doc.getElementById( "score" );
		score.innerHTML = this.score;
	},
	/**
	 * moveLeft 按下向左发生的事件
	 */
	moveLeft : function () {
		var oldStr,
			newStr;
		// 先保存原数据
		  oldStr = this.data.toString();
		  for( var row = 0; row < this.r; row++ ){
			  this.moveLeftInRow( row );
		  }
		  newStr = this.data.toString();
		  if(oldStr !== newStr){
			  this.randomNum();
			  this.updateView();
		  }
	},
	
	moveLeftInRow : function ( row ) {
		for ( var col = 0; col < this.c - 1; col++ ) {
				/* 获得右边第一个不为0的数的下标 */
				var nextc = this.getRightNext( row,col);
				if ( nextc === -1) {
					break; // 若右边没有不为0的数就跳出循环
				} else {
				   if ( this.data[row][col] == 0 ) {
					// 将下一个位置的值，当入当前位置
					this.data[row][col] = this.data[row][nextc];
					this.data[row][nextc] = 0;
					col--; //让col退一格，重复检查一次	
				   }else if( this.data[row][col] === this.data[row][nextc] ){
							//	将当前位置*=2;	
							this.data[row][col] *= 2;
							// 下个位置值为 0
							this.data[row][nextc] = 0;
							// 加入分数
							this.score += this.data[row][col];
					}
				}
			}
	}, 
	getRightNext : function ( row, col ) {
		for ( var nextc = col+1; nextc < this.c; nextc++ ) {
				if (this.data[row][nextc] !== 0 ) {
					return nextc;
				}
		  }
		  return -1;
	}
}