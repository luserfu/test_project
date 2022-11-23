window.addEventListener('load',function(){
    var pre=this.document.querySelector('.pre');
    var next=this.document.querySelector('.next');
    var focuse=this.document.querySelector('.foucus');
    var circle=0;
    var num=0;
    focuse.addEventListener('mouseover',function(){
        pre.style.display='block';
        next.style.display='block';
        clearInterval(timer);
        timer=null;
    })
    focuse.addEventListener('mouseleave',function(){
        pre.style.display='none';
        next.style.display='none';
        timer=setInterval(() => {
            next.click();
           }, 2000);
    })

    var ul=focuse.querySelector('ul');
    var ol=focuse.querySelector('.pronav')
    var focusewidth=focuse.offsetWidth;
   for(var i=0;i<ul.children.length;i++){
    var li=this.document.createElement('li');
    //记录索引号
    li.setAttribute('index',i);
    ol.appendChild(li);
    li.addEventListener('click',function(){
        for(var i=0;i<ol.children.length;i++)
        {
            ol.children[i].className='';
        }
        this.className='curent';
        //点击圆圈移动图片
        var index=this.getAttribute('index');
        num=index;
        circle=index;
        var targets=index*focusewidth;
        animate(ul,-targets);
    })
   }
   ol.children[0].className='curent ';
   var first=ul.children[0].cloneNode(true);
   ul.appendChild(first);
var flag=true;
   next.addEventListener('click',function(){
  if(flag)
  {
    flag=false;
      if(num==ul.children.length-1)
    {
        ul.style.left=0;
        num=0;
      
    }
    num++;
    animate(ul,-num*focusewidth,function(){
        flag=true;
    });
    circle++;
    if(circle==ol.children.length)
    {
        circle=0;
    }
    circlechange();

  }

    });


    pre.addEventListener('click',function(){
      if(flag)
      {
        flag=false;
        if(num==0)
        {    num=ul.children.length-1;
            ul.style.left=-num*focusewidth+'px';
        
          
        }
        num--;
        animate(ul,-num*focusewidth,function(){
            flag=true;
        });
        circle--;
        if(circle<0)
        {
            circle=ol.children.length-1;
        }
        circlechange();
      }
    
        });
        function circlechange(){
            for(var i=0;i<ol.children.length;i++)
            {
                ol.children[i].className='';
            }
            ol.children[circle].className='curent';
        }
        var timer=setInterval(() => {
         next.click();
        }, 2000);

})
$(function(){
    var flag=true;
    var tooltops=$('.recom').offset().top;
    toggleTool()
    function toggleTool(){
        if($(document).scrollTop()>=tooltops){
            $(".fixedtool").fadeIn();
        }
        else {
            $(".fixedtool").fadeOut();
        }
    }
   $(window).scroll(function(){
    toggleTool();
    if(flag){
        $('.floor .w').each(function(i,ele){
        if($(document).scrollTop()>=$(ele).offset().top-1)
        {
          $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
        }
    }) 
    }
   
   })
   $('.fixedtool li').click(function(){
    flag=false;
    console.log($(this).index());
   var currents= $('.floor .w').eq($(this).index()).offset().top;
  $("body,html").stop().animate({
    scrollTop:currents
  },function(){
    flag=true;
  });
  $(this).addClass("current").siblings().removeClass('current');
   })
   
})