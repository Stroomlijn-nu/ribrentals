(function(){
/* Instelbaar: seconden die aan het eind van de video worden overgeslagen (aftiteling met websitenaam) */
var CREDITS_TRIM=8;
['hv','vt'].forEach(function(id){var v=document.getElementById(id);if(!v)return;
 v.addEventListener('timeupdate',function(){if(v.duration&&v.currentTime>=v.duration-CREDITS_TRIM){v.currentTime=0;v.play().catch(function(){});}});
 v.play&&v.play().catch(function(){});});
var q=new URLSearchParams(location.search);
var src=q.get('utm_source')||(document.referrer?new URL(document.referrer).hostname:'direct');
var bron='website ribrentals.com | en | '+src+(q.get('utm_campaign')?' | '+q.get('utm_campaign'):'');
document.getElementById('f_bron').value=bron;document.getElementById('f_ref').value=location.href;
document.querySelectorAll('[data-i]').forEach(function(a){a.addEventListener('click',function(){var m=document.getElementById('m');if(m&&!m.value){m.placeholder=a.dataset.i==='quote'?'Request a quote':'Request information';}});});
if(window.gsap&&window.ScrollTrigger&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 gsap.registerPlugin(ScrollTrigger);
 var tl=gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'+=130%',scrub:.6,pin:true,anticipatePin:1}});
 tl.to('.hc',{yPercent:-30,opacity:0,duration:.5},0).fromTo('#hv',{scale:1.12},{scale:1,duration:1},0)
   .fromTo('.reveal',{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:.8,ease:'power2.inOut'},.25)
   .from('.reveal h2',{y:60,opacity:0,duration:.4},.7).from('.stats div',{y:30,opacity:0,stagger:.08,duration:.3},.8);
 gsap.utils.toArray('.rv').forEach(function(e){gsap.to(e,{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:e,start:'top 88%'}});});
 document.querySelectorAll('.scene').forEach(function(sc){
  var f=sc.querySelectorAll('figure'),n=f.length,num=sc.querySelector('.sc-n b'),bar=sc.querySelector('.sc-bar u');
  var st=gsap.timeline({scrollTrigger:{trigger:sc,start:'top top',end:'+='+(n-1)*90+'%',scrub:.7,pin:true,anticipatePin:1,
   onUpdate:function(self){var i=Math.min(n,Math.floor(self.progress*(n-1)+.5)+1);num.textContent=('0'+i).slice(-2);}}});
  gsap.set(f[0].querySelector('img'),{scale:1.15});
  st.to(f[0].querySelector('img'),{scale:1,duration:1,ease:'none'},0);
  for(var k=1;k<n;k++){
   st.fromTo(f[k],{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1,ease:'power2.inOut'},k-1+.0)
     .fromTo(f[k].querySelector('img'),{scale:1.3,yPercent:8},{scale:1,yPercent:0,duration:1.4,ease:'none'},k-1)
     .to(f[k-1].querySelector('img'),{yPercent:-10,duration:1,ease:'none'},k-1);}
  st.to(bar,{scaleX:1,duration:n-1,ease:'none'},0);
 });
 gsap.utils.toArray('.boat').forEach(function(e){gsap.from(e,{y:50,opacity:0,duration:.8,scrollTrigger:{trigger:e,start:'top 92%'}});});
}else{document.documentElement.classList.add('nomotion');document.querySelectorAll('.rv').forEach(function(e){e.style.opacity=1;e.style.transform='none'});}
})();