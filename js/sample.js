window.onload = function(){
  //写真の読み込み
  const image = new Image();
  image.src = './images/face.jpg';
  image.onload = function (){
    // 顔の検出
    var face_info = ccv.detect_objects({
      "canvas" : ccv.grayscale(ccv.pre(image)),
      "cascade" : cascade,
      "interval" : 5,
      "min_neighbors" : 1
    });
    // canvasに写真を表示
    const img_canvas = document.getElementById("img-canvas");
    const canvas_2d = img_canvas.getContext("2d");
    img_canvas.width  = image.width;
    img_canvas.height = image.height;
    canvas_2d.drawImage(image, 0, 0);

    // ひょっとこの表示
    const hyottoko = new Image();
    hyottoko.src = './images/hyottoko.png';
    hyottoko.onload = function (){
      for( var i=0; i<face_info.length; i++ ){
        canvas_2d.drawImage(hyottoko, face_info[i].x-20, face_info[i].y-20, face_info[i].width+30, face_info[i].height+30);
      }
    }
    if(face_info.length === 0){
      console.log('ひょっとこにできないよ');
    }
  };
};
