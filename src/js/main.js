import '../stylus/style.styl'
import simpleSmoothScroll from './simpleSmoothScroll'
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

new simpleSmoothScroll();

gsap.registerPlugin(ScrollTrigger);

function setTextAnim(){
  let setAnim = ($item)=>{
    let rnd = 'rnd' + Math.round(Math.random()*1000);
    let target = `.${rnd} .letter`;
    $item.classList.add(rnd);
    $item.innerHTML = $item.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    gsap.set(target,{
      y: 50, //表示状態の指定
      opacity:0,
    });
    gsap.to(target, {
      duration: 0.3, //アニメーションの時間の設定
      y: 0, //表示状態の指定
      opacity:1,
      ease:"back",
      //同じclass名のバリデーションの設定
      stagger: {
        each: 0.05, //ディレイ時間
        from: "start", //出現方法の指定
      },
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
      }
    });
  };
  let $items = document.querySelectorAll('[data-anime="framein"]');
  $items.forEach((item)=>{
    setAnim(item);
  });
}

window.addEventListener('load',()=>{
  setTextAnim();
});