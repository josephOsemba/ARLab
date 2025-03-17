import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useDrop } from "react-dnd"; // For drag-and-drop functionality

// Helper Function to Check if Objects are Close
const isNear = (obj1, obj2, threshold = 1.5) => {
  return obj1.distanceTo(obj2) < threshold;
};

const OhmsLawExperiment = () => {
  const mountRef = useRef(null);
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(10);
  const [current, setCurrent] = useState(0);
  const [isCircuitComplete, setIsCircuitComplete] = useState(false);
  const [components, setComponents] = useState([]); // Track added components

  // Handle dropped items
  const [, drop] = useDrop(() => ({
    accept: "APPLIANCE",
    drop: (item) => {
      const { type, name } = item;
      setComponents((prev) => [
        ...prev,
        { type, name, position: [0, 0, 0] }, // Add new component at default position
      ]);
    },
  }));

  useEffect(() => {
    const mountElement = mountRef.current; // Store ref to avoid cleanup issues
    if (!mountElement) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    mountElement.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Function to Create Draggable Objects
    const createDraggable = (geometry, material, position, name) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.name = name;
      scene.add(mesh);
      return mesh;
    };

    // Create components dynamically based on `components` state
    const componentMeshes = components.map((comp, index) => {
      let geometry, material;
      switch (comp.type) {
        case "battery":
          geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
          material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
          break;
        case "resistor":
          geometry = new THREE.BoxGeometry(1, 0.5, 0.5);
          material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
          break;
        case "wire":
          geometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
          material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
          material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      }
      return createDraggable(geometry, material, comp.position, `${comp.type}-${index}`);
    });

    // Lights
    scene.add(new THREE.AmbientLight(0x404040));
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    // Dragging Logic
    let selectedObject = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(componentMeshes);
      if (intersects.length > 0) {
        selectedObject = intersects[0].object;
      }
    };

    const onMouseMove = (event) => {
      if (!selectedObject) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const point = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, point);
      selectedObject.position.copy(point);
    };

    const onMouseUp = () => {
      if (selectedObject) {
        // Update the component's position in the state
        const updatedComponents = components.map((comp, index) => {
          if (selectedObject.name === `${comp.type}-${index}`) {
            return {
              ...comp,
              position: [selectedObject.position.x, selectedObject.position.y, selectedObject.position.z],
            };
          }
          return comp;
        });
        setComponents(updatedComponents);
        selectedObject = null;
        checkCircuit();
      }
    };

    mountElement.addEventListener("mousedown", onMouseDown);
    mountElement.addEventListener("mousemove", onMouseMove);
    mountElement.addEventListener("mouseup", onMouseUp);

    // Check if Circuit is Complete
    const checkCircuit = () => {
      const batteries = componentMeshes.filter((mesh) => mesh.name.startsWith("battery"));
      const resistors = componentMeshes.filter((mesh) => mesh.name.startsWith("resistor"));
      const wires = componentMeshes.filter((mesh) => mesh.name.startsWith("wire"));

      if (batteries.length > 0 && resistors.length > 0 && wires.length >= 2) {
        const [battery, resistor, wire1, wire2] = [batteries[0], resistors[0], wires[0], wires[1]];
        if (
          isNear(battery.position, wire1.position) &&
          isNear(wire1.position, resistor.position) &&
          isNear(resistor.position, wire2.position) &&
          isNear(wire2.position, battery.position)
        ) {
          setIsCircuitComplete(true);
          setCurrent(voltage / resistance);
          wire1.material.color.set(0x00ffff);
          wire2.material.color.set(0x00ffff);
          return;
        }
      }
      setIsCircuitComplete(false);
      setCurrent(0);
      wires.forEach((wire) => wire.material.color.set(0xaaaaaa));
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on Unmount
    return () => {
      if (mountElement) {
        mountElement.removeEventListener("mousedown", onMouseDown);
        mountElement.removeEventListener("mousemove", onMouseMove);
        mountElement.removeEventListener("mouseup", onMouseUp);
        mountElement.removeChild(renderer.domElement);
      }
    };
  }, [voltage, resistance, components]); // Re-run effect when components change

  return (
    <div ref={drop} style={{ textAlign: "center", color: "#fff", background: "#222", padding: "10px" }}>
      <h2>Ohm&apos;s Law Experiment</h2>
      <div ref={mountRef} style={{ width: "80vw", height: "80vh", margin: "auto", border: "2px solid white" }} />

      <div style={{ marginTop: "10px", padding: "10px", background: "rgba(0,0,0,0.8)" }}>
        <button onClick={() => setIsCircuitComplete(!isCircuitComplete)}>
          {isCircuitComplete ? "Disconnect Circuit" : "Connect Circuit"}
        </button>
        <br /><br />
        <label>
          Voltage (V):
          <input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} disabled={!isCircuitComplete} />
        </label>
        <br />
        <label>
          Resistance (Ω):
          <input type="number" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} disabled={!isCircuitComplete} />
        </label>
        <br />
        <h3>Current (I): {isCircuitComplete ? current.toFixed(2) : "0"} A</h3>
        {isCircuitComplete ? <p style={{ color: "lime" }}>Circuit Complete ✅</p> : <p style={{ color: "red" }}>Incomplete Circuit ❌</p>}
      </div>
    </div>
  );
};

export default OhmsLawExperiment;