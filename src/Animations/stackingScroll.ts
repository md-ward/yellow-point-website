//  useGSAP(() => {
//     const sections = gsap.utils.toArray(".panel");

//     sections.forEach((panel: any) => {
//       ScrollTrigger.create({
//         trigger: panel,
//         start: "top top",
//         pin: true,
//         pinSpacing: false,
//         scrub: true,
//         snap: 1,
//       });
//     });

//     gsap.from(heroRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 1.2,
//       ease: "power2.out",
//       delay: 0.3,
//     });

//     // Cards animation
//     gsap.from(cardsRef.current, {
//       scrollTrigger: {
//         trigger: servicesRef.current,
//         start: "top center",
//         scrub: true,
//       },
//       rotate: 10,
//       y: 100,
//       x: -100,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//       stagger: 0.2,
//     });
//   }, []);