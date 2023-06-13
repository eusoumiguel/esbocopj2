function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("white");
}

function draw() {
    strokeWeight(10);
    stroke(0);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);

    }
    console.log(results);
    var result = results[0].label;
    document.getElementById('label').innerHTML = 'Nome:' + result.replace('_','');

    document.getElementById('confidence').innerHTML = 'precisão:' + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(result.replace('_', ''));
    synth.speak(utterThis);
}