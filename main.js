song = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;



function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function modelloaded() {
    console.log('Posenet is initialized');

}

function gotposes(results) {
    if (results.length > 0) {
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("right wrist x =" + rightwristX);
        console.log("right wrist y" + rightwristY);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("left wrist x =" + leftwristX);
        console.log("left wrist y" + leftwristY);

        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;

        console.log("Score right wrist = " + scorerightWrist);
        console.log("Score left wrist = " + scoreleftWrist);

    }

}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#ff0000');
    stroke('#0000ff');


    if (scorerightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);



        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);

        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(1);

        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);

        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);

        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);

        }
    }
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InnumberleftwristY = Number(leftwristY);
        new_leftwristY = floor(InnumberleftwristY * 2);
        leftWristY_divide_1000 = new_leftwristY / 1000;
        document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}