// here is waves list
var waveList = [
    'z = sin(t)+sin(x-2*t)+cos(y+t)',
    'z = 1/log(2+sqrt(d))*cos(d-t)',
    'z = 1/log(2+sqrt(d))*cos(abs(d-2)-abs(x+y)-t)',

    /* Morpheus */
    'z = 6/log(sqrt(d))*cos(d-t)',

    /* Jingga Sona */
    'z = 1/log(+sqrt(d))*cos(d-x-y-z-t)',
    'z = 1/log(1+sqrt(d))*cos(d-t)',
    'z = cos(d - z-y- y+t) + (y / 3)',

    /* Haris */
    'z = sin(x*t/16-d)*cos(y*t/16+d)',

    /* Rowsej */
    'z = cos(d - t) + (y / 3)',
    'z = d < 1? 10 : (d < 2? 9 : (d < 3? 8 : (d < 4? 7 : (d < 5? 6 : (d < 6? 5 : (d < 7? 4 : (d < 8? 3 : (d < 9? 2 : (d < 10? 1 : 0))))))))) + cos(d - t)',

    /* Paul Caron */
    'z = 1*x%y/log(2+sqrt(d))*cos(d-t)',

    /* diamondweter */
    'z = 0.1/log(2-sqrt(d))*cos(d-t)',
    'z = abs(1/log(9+sqrt(d))*cos(x-y-t))',
    'z = abs(0.5/log(2+sqrt(d))*cos(x*y*d+t))',

    /* Микола Федосєєв */
    'z =5*sin(t+d)/(d+0.2)',

    /* Jay */
    'z = sin(log(x)*t/4-d)*cos(log(y)*t/4+d)',

    /* code learner */
    'z = log(x*log(t)*y/cos(t))',
    'z =(abs(d)>(sqrt(x*y*d)+cos(t)+sin(2*pi*d*sqrt(t))+abs(x*y)))?log(abs(x*y)+1) + sin(d+cos(2*pi*abs(x*x*y))):log(abs(sin(t/5)))*(log(d+1))+4',

    /* ⏩ Prometheus ⏪ */
    'z = d*sin(t)',
    'z = sqrt(d-cos(t))',

    /* Daniele Bonomi */
    'z = cos(t)*sin(d*3)*cos(d*3)*3',
];

function random() {
    let i = ~~(Math.random()*waveList.length);
    document.getElementsByTagName('input')[0].
        value = waveList[i];
}

window.onload = function() {

var W = window.innerWidth, H = window.innerHeight;
console.log = () => {}

// initializing three core components
var renderer = new THREE.WebGLRenderer;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera
    (75, W/H, 0.1, 1000);
camera.position.set(0, -14, 14);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene;

// called each frame
function mainloop() {
    window.requestAnimationFrame(mainloop);

    updateWave();
    renderer.render(scene, camera);
}

var wave;
{ // creating a wave object
    var geometry = new THREE.PlaneGeometry
        (15, 15, 70, 70);
    //geometry = new THREE.WireframeGeometry(geometry);
    var material = new THREE.MeshNormalMaterial;
    wave = new THREE.Mesh(geometry, material);
    scene.add(wave);
}

// function that do all magic
// core formula: z = 0.6(sin(x+y+t) + cos(2t-y-xy));
function updateWave() {
    var t = Date.now() * 0.004;
    try {
    for(var v of wave.geometry.vertices) {
        var x = v.x, y = v.y, z = v.z,
            e = Math.E, pi = Math.PI,
            d = Math.hypot(x, y),
            sin = a => Math.sin(a),
            cos = a => Math.cos(a),
            sqrt = a => Math.sqrt(a),
            abs = a => Math.abs(a),
            log = a => Math.log(a);

        var input = document.getElementsByTagName('input')[0];
        eval(input.value)
        v.z = z;
    }
    } catch(e) {}

    wave.geometry.verticesNeedUpdate = true;
    wave.geometry.computeVertexNormals();
    wave.rotation.z += 0.01;
}

mainloop(); // entry point
}
