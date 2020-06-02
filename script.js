$(document).ready(function(){
  //const SERVER="http://localhost:2017/";
  const SERVER="";
  const CLUSTERS=14;
  let cluster=null;
  let clusterid=0;

  // Content population
  let loadVideo = (name,type) => $(".content").empty().append(
    $(`<video type="${type}" controls><source src="${SERVER}content/${name}"></video>`)
  );
  let loadImage = (name,type) => $(".content").empty().append(
    $(`<img src="${SERVER}content/${name}"/>`)
  );

  // Cluster loading
  function loadCluster(cb){
    let i=Math.floor(Math.random()*CLUSTERS);
    if(i==clusterid) i=(CLUSTERS-i)-1;
    $.get(`${SERVER}clusters/cluster${i}.json`,null,function(res){
      cluster=(typeof(res)=="object")?res:JSON.parse(res);
      clusterid=i;
      if(cb) cb();
    });
  }
  function next(){
    function finish(){
      let i=Math.floor(Math.random()*cluster.length);
      let {name,type}=cluster[i];
      cluster.splice(i,1);
      if(!type.indexOf("video")) loadVideo(name,type);
      else if(!type.indexOf("image")) loadImage(name,type);
    }
    if(!cluster || !cluster.length) loadCluster(finish);
    else finish();
  }

  $(".next").click(() => next());
  next();

});
