## ずんちゃ　ずんちゃ　動物たちがついてくるブックマークレット(zuncya.js)

```
javascript:(function(func){var s=document.createElement("script");s.src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";s.onload=function(){func(jQuery.noConflict(true));};document.body.appendChild(s);})(function($){var imgs=["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRwFk59mRvaTdA_JG2TiH1ZqRw19E8xrUIsZvqqqr3ouqwMID8X1UTMxxRAKHmoxsuAequtD3NBuubbD0g8CX93BatZHNtXyNQBaAdRP_O3Z0Wgj2L410cVDfdh8AdLIK57WjdC53vZ5Q/s400/animal_dance_dog.png","https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNrbWzavinVfPVYA_Oyt0_qGz0ILwhTefBM1kvH8esAkvyeUcMKiU4KuMns6vwqiYuZt3icFZlDt8dFBX922UfblxGOpqBGtUs3xg8ttzWrAhD7OeYOoIlDBYInBZHPsZh1s8SZEmHOjo/s400/animal_dance_cat.png","https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWBmlC8AhsYmHJyJ4wDnO5ZnvioVxpQz9R8_09y2IDiCDeiilKF2eqnC459E3Z4ZeydO35MjWgVstMseI9joqQjBjNl4bFS4-6NpAZLj8cfwzpdHxqBf8wm-rJ2jsAbErM4VNq91NOhpg/s400/animal_dance_rabbit.png","https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqZzYkHnbzjB49RBf2rLJj1qkmQwopmpAhRfUkmi_zGKVIoARVlH6gf1dGoJ5btABcpNFJ3kjhgB-he7Cm9Q5AK0Ioz-k8vPer7o1z9CTQw7zlCFF4tLEvOwA204JupPD0aI5H78_nUF4/s400/animal_dance_bear.png"];var target={x:0,y:0},followers=[];imgs.forEach(function(src,i){var $img=$("<img>",{src:src,css:{position:"absolute",width:"70px",top:"-50px",left:"-50px",zIndex:99999,pointerEvents:"none"}}).appendTo("body");followers.push({el:$img,x:0,y:0,speed:[0.03,0.05,0.12,0.02][i]});});$(document).on("mousemove",function(e){target.x=e.pageX-35;target.y=e.pageY-35;});function animate(){followers.forEach(function(f){f.x+=(target.x-f.x)*f.speed;f.y+=(target.y-f.y)*f.speed;f.el.css({left:f.x+"px",top:f.y+"px"});});requestAnimationFrame(animate);}animate();});
```

マウスの動きに いらすとや の動物たちがついてくるブックマークレットです。動物たちが応援してくれるので、仕事のやる気が出ます。
![ずんちゃ](image-1.png)

## google翻訳に遷移するブックマークレット(translate.js)

```
javascript:(function(){var t=window.getSelection().toString();if(!t){alert("文字を選択してください");return;}window.open("https://translate.google.com/?sl=auto&tl=ja&text="+encodeURIComponent(t),"_blank");})();
```

テキストを選択した状態でブックマークを押すと、選択したテキストを日本語訳したgoogle翻訳のページのタブを開いてくれるブックマークレットです。  
テキストを選択せずにブックマークレットを開こうとするとアラートが出ます。
![google翻訳](image-2.png)
