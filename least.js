/**
 * Created by WEB on 2017/11/20.
 */
/*------------------lyp修改于---20180607--------------------*/


var least=function () {

	/*选项卡*/
  this.tabs=function(dom,cla,pages,clas){
  	dom.click(function(){
  		var $index=$(this).index();
  		$(this).addClass(cla).siblings().removeClass(cla);
  		if(pages){pages.eq($index).show().siblings().hide()}
  		if(pages&&clas){
  			pages.eq($index).addClass(clas).siblings().removeClass(clas)
  		}
  	})
  };

  /*获取非行间样式*/
  this.getstyle=function(obj,json){
     if(obj.currentStyle){
     	return obj.currentStyle
     }else{
     	return getComputedStyle(obj,false)[attr]
     }
  };


  /*获取验证码*/
  this.getcode=function(codebtn){
  	var t=60;
  	codebtn.click(function(){
  		var that=codebtn;
        var timer=setInterval(function(){
        	that.attr('disabled',true);
        	t--;
        	if(t<0){t=60;clearInterval(timer);that.text('点击发送');that.attr('disabled',false)}else{that.text(t+'s后重新发送')}
        },1000)
  	})
  };

  /*日期或时间出现个位数时加0*/
  this.timeadd0=function(value){/*如传递的value为5，运算结果则为05*/
    return value<10?'0'+value:value;
  };
  

  /*隐藏卡号，给卡号间隔*/
  this.cardhide=function(cards){
      var reg;
      for(var i=0;i<cards.length;i++){
         /*判断储蓄卡号长度(一般为19/16位)*/
        /*隐藏卡号*/
        if(cards.eq(i).text().length==19){reg= /^(\d{6})\d{7}(\d{6})$/}else{reg= /^(\d{6})\d{4}(\d{6})$/};
        cards.eq(i).text(cards.eq(i).text().replace(reg, "$1****$2"));
         /*给卡号间隔*/
         /\S{5}/.test(cards.eq(i).text()) && cards.eq(i).text(cards.eq(i).text().replace(/\s/g,' ').replace(/(.{4})/g, "$1  "));
      }
  };

  /*截取卡号后4位*/
  this.cutcardnum=function(nums){/*nums为卡号*/
       nums.substr(nums.length-4)
  };

  /*判断是否出现滚动条*/
  this.overflow=function() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
  };


  /*隐藏手机号*/
  this.phonehide=function(dom){

      var reg = /^(\d{3})\d{4}(\d{4})$/;
      
    for(var i=0;i<dom.length;i++){
      dom.eq(i).text(dom.eq(i).text().replace(reg, "$1****$2"))
    }
  };
  

  /*关闭遮罩层*/
  this.close=function close() {
      $('.close_btn').click(function () {
          $('.shadow').addClass('hide')
      });
      $('.shadow').click(function () {
          $(this).addClass('hide')
      })
  };


  /*滚动渐变*/
  this.jianbian=function(dom,box) {
      /*dom为需要变色的，box是内容主体*/
      var x;
      box.scroll(function(e){
          var $this =$(this),
              viewH =$(this).height(),//可见高度
              contentH =$(this).get(0).scrollHeight,//内容高度
              scrollTop =$(this).scrollTop();//滚动高度
          x=parseInt((scrollTop/contentH)*10)*0.25;
          var change='rgba(255, 255, 255,'+ x +')';
          if(x==0){change='rgba(0, 0, 0,0.3)';dom.css('border','none')}
          if(x>=0.5){dom.css('border-bottom','1px solid #D7D6DC')}
          dom.css('background',change);
      });
  };


  /*scroll&see&more*/
   this.scrollmore=function(dom,see){
       see=$('#seemore');
	   var gd=null;
	   dom.scroll(function(e){

	    var $this =$(this),
	        viewH =$(this).height(),//可见高度
	        contentH =$(this).get(0).scrollHeight,//内容高度
	        scrollTop =$(this).scrollTop();//滚动高度

	    /*----↓----延迟加载更多---↓---*/
	    if(gd!=null){ clearInterval(gd);gd=null };

	    gd=setTimeout(function () {
	        if(scrollTop/(contentH -viewH)>=0.95){ //到达底部xxx时,加载新内容

                if($('.newcontent').length>=10){see.text('加载完成').show();setTimeout(function () {
                    see.hide()
                },2000);return };

                see.show();
                setTimeout(function () {
                    see.hide();
                },1000);

                /*--------------↓-------ajax数据请求----------↓---------*/
                $.ajax({
                    url:'http://10.0.0.116/test.json',
                    type:'get',
                    success:function(res){
                        console.log(res)
                    }
                });

                /*--------------↑-------ajax数据请求----------↑---------*/


               var nums=parseInt((Math.random())*10+1);
               dom.append('<li class="newcontent" style="color: #000">到底啦--我是随机数:'+nums+'</li>');

	        }

	    },200)

	   /*---↑-----延迟加载更多----↑--*/

	});
   };



    /*运动框架*//*石川老师*/
    this.move=function(obj,json,fnEnd){
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            var allstyle=true;
            for(attr in json){
                var getcss;/*获取css*/
                if(attr=='opacity'){针对没有opacity和color以及没有px单位的属性值
                    getcss=parseFloat(getstyle(obj,attr)*100)
                }else{
                    getcss=parseInt(getstyle(obj,attr))
                }
                speed=(json[attr]-getcss)/6;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(getcss!=json[attr]){allstyle=false};
                if(attr=='opacity'){
                    obj.style.filter='alpha(opacity:'+(getcss+speed)+')';
                    obj.style.opacity=(getcss+speed)/100;
                }else{
                    obj.style[attr]=getcss+speed+'px';
                }if(allstyle){
                    clearInterval(obj.timer);
                    if(fnEnd){fnEnd()}
                }
            }
        },30)
    };
};

/*git*/
