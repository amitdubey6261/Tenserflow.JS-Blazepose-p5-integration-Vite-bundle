//_________________Amit-Dubey.Dev____________________//
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';

let model , detectorConfig, detector , video , canvas , ctx ;

let main = async () => {
  model = poseDetection.SupportedModels.BlazePose;
  detectorConfig = {
    runtime: 'tfjs',
    enableSmoothing: true,
    modelType: 'full' , 
  };
  detector = await poseDetection.createDetector(model, detectorConfig);
  afterDetector();
}

let afterDetector = async() =>{
  video = document.createElement('video');
  video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
  await video.play();
  identifyPose();
}

let identifyPose = async() =>{
  document.body.appendChild(video);
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  async function detectPose(){
    const poses = await detector.estimatePoses(video);
    ctx.clearRect( 0 , 0 , canvas.width , canvas.height );
    poses.forEach((pose)=>{ drawPose(pose)} );
    requestAnimationFrame(detectPose);
  }
  detectPose();
}

let drawPose = async(pose) =>{
  console.log(pose);
}

main();


