<template>
  <div id="app">
    <div class="header">
      <span>1</span>
      <span class="span1">2</span>
    </div>
    <router-view/>
  </div>
</template>
  <script>
 console.log(1);
new Promise(function (resolve, reject){
    reject(true);
    window.setTimeout(function (){
        resolve(false);
    }, 0);
}).then(function(){
    console.log(2);
}, function(){
    console.log(3);
});
console.log(4);
  </script>
<style>
 .header{
   width: 100px;
   height: 100px;
   border:1px solid cyan;
   display: flex;
   justify-content: space-between;
 }
 .header :nth-child(2){
   align-self: flex-end;

   
 }
</style>
