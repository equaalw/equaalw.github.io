
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.querySelector("#model-container");

if (!container) {
    console.error("Не найден #model-container");
} else {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    container.appendChild(renderer.domElement);

    // Контрастное окружение для отражений в стекле
    const pmrem = new THREE.PMREMGenerator(renderer);

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x222233);

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshBasicMaterial({ color: 0xeeeeff })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    envScene.add(floor);

    const panels = [
        { color: 0xffffff, x: -5 },
        { color: 0x66ccff, x: 5 },
        { color: 0xff66cc, z: -5 },
        { color: 0xffffff, z: 5 }
    ];

    panels.forEach((p) => {
        const panel = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 8),
            new THREE.MeshBasicMaterial({ color: p.color })
        );
        panel.position.set(p.x || 0, 1, p.z || 0);
        envScene.add(panel);
    });

    scene.environment = pmrem.fromScene(envScene, 0.04).texture;
    pmrem.dispose();

    // Свет на саму модель
    scene.add(new THREE.HemisphereLight(0xffffff, 0x555566, 2));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(3, 5, 5);
    scene.add(light);

    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0 };

    let model = null;
    let mixer = null;

    const loader = new GLTFLoader();

    loader.load(
        "/models/model_idiot.glb",
        (gltf) => {
            model = gltf.scene;

            const wrapper = new THREE.Group();
            wrapper.add(model);
            scene.add(wrapper);

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);

            model.position.sub(center);

            if (maxDim > 0) {
                wrapper.scale.setScalar(2 / maxDim);
            }

            // Обычное прозрачное стекло
            model.traverse((object) => {
                if (!object.isMesh) return;



                object.material = new THREE.MeshPhysicalMaterial({
                    color: 0xb5f5e9,
                    metalness: 0,
                    roughness: 0.08,
                    transmission: 0.65,
                    thickness: 1.5,
                    ior: 1.5,
                    envMapIntensity: 1.5,
                    attenuationColor: new THREE.Color(0x62e8d2),
                    attenuationDistance: 2,
                    side: THREE.DoubleSide
                });


            });

            console.log("Модель загружена", gltf);

            if (gltf.animations.length) {
                mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
            }
        },
        undefined,
        (error) => console.error("Ошибка загрузки модели:", error)
    );

    window.addEventListener("pointermove", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        if (model) {
            model.rotation.y += (mouse.x * 0.6 - model.rotation.y) * 0.05;
            model.rotation.x += (-mouse.y * 0.4 - model.rotation.x) * 0.05;
        }

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

