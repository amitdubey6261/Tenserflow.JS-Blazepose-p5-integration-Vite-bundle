//_________________________<AMIT_DUBEY>DEV__________________________________
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from "@tensorflow-models/pose-detection"
import p5 from 'p5';
import { fill } from '@tensorflow/tfjs-core';


let video;
let poseDetector;
let poses = [];
let ellipses = [] ;

let box = document.createElement('div');

let detectPose = () =>{
    box.innerHTML = "GOOOOOOO ";
    poseDetector.estimatePoses(video.elt).then((result)=>{
        poses = result ;
        detectPose();
    }).catch((e)=>{
        console.log(e);
    })
}

const sketch = (_) => {
    console.log("READY");
    box.innerHTML = "READY" ;
    document.body.appendChild(box);
    _.setup = () => {
        _.createCanvas(640, 480, _.WEBGL);
        video = _.createCapture(_.VIDEO);
        video.size(640, 480);
        video.hide() ;
        poseDetection.createDetector(poseDetection.SupportedModels.BlazePose , { runtime : 'tfjs' , modelType: 'full' , enableSmoothing : true , upperBodyOnly : false , maxPoses : 1 , scoreThreshold: 0.5}).then((detector)=>{
            poseDetector = detector ; 
            box.innerHTML = "STEADY" ;
            detectPose();
        })
    };

    _.draw = () => {
        _.fill(2,200,0);
        ellipses = [] ;
        _.background(0);

        if(poses.length > 0 ){
            const kp = poses[0].keypoints ; 
            for(let i=0 ; i<kp.length ; i++){
                const x = _.map(kp[i].x, 0, video.width, -_.width / 2, _.width / 2);
                const y = _.map(kp[i].y, 0, video.height, -_.height / 2, _.height / 2);
                const z = _.map(kp[i].z, 0, video.width, -_.width / 2, _.width / 2);
                ellipses.push({_x:x,_y:y,_z:z,_size:10});
                console.log( x , y , z );
            }
        }

        ellipses.forEach((props)=>{
            _.ellipse(props._x , props._y , props._size , props._size );
        })

    };
};

new p5(sketch);