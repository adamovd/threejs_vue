// let scrollPercent: number = 0;

// function scalePercent(start: number, end: number) {
//   return (scrollPercent - start) / (end - start);
// }

// const animationScripts: { start: number; end: number; func: () => void }[] = [];
// let position;
// animationScripts.push({
//   start: 0,
//   end: 40,
//   func: () => {
//     camera.lookAt((position = iphone.getWorldPosition(new THREE.Vector3())));
//     camera.position.set(0, 1, 2);
//     position.z = lerp(-10, 0, scalePercent(0, 40));
//   },
// });

// animationScripts.push({
//   start: 40,
//   end: 60,
//   func: () => {
//     camera.lookAt((position = iphone.getWorldPosition(new THREE.Vector3())));
//     camera.position.set(0, 1, 2);
//     iphone.rotation.z = lerp(-10, Math.PI, scalePercent(100, 60));
//   },
// });

// animationScripts.push({
//   start: 80,
//   end: 101,
//   func: () => {
//     iphone.rotation.x += 0.01;
//     iphone.rotation.y += 0.01;
//   },
// });

// const playScrollAnimations = () => {
//   animationScripts.forEach((animation) => {
//     if (scrollPercent >= animation.start && scrollPercent < animation.end) {
//       animation.func();
//     }
//   });
// };
// const stats = new Stats();
