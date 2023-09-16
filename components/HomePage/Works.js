import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
import Work from "./Work"

gsap.registerPlugin(ScrollTrigger);

function Works() {
    const [projectsRef, setProjectsRef] = useArrayRef();
    const scope = useRef();
    const pinRef = useRef(null)

    function useArrayRef() {
        const projectsRef = useRef([]);
        projectsRef.current = [];
        return [projectsRef, (ref) => ref && projectsRef.current.push(ref)];
    }

    const works = [
        {
            title: "TD Cowen",
            role: "UI/UX Developer",
            link: "/td-cowen",
            img: "/images/td/mockup.jpg"
        },
        {
            title: "Scholz & Volkmer",
            role: "Frontend developer",
            link: "/scholz-und-volkmer",
            img: "/images/suv/mockup.jpg"
        },
        {
            title: "Ideology Creative Studio",
            role: "UI/UX Designer",
            link: "/ideology-creative-studio",
            img: "/images/id/mockup.jpg"
        },

    ]

    useEffect(() => {
        let ctx = gsap.context(() => {
            let iteration = 0;
            const xPercent = 163
            const spacing = 0.34;

            projectsRef.current.forEach((project) => {
                gsap.set(project, {
                    xPercent: `${xPercent}`,
                });
            })
            const tl = gsap.timeline()
            tl.fromTo(projectsRef.current[2],
                {
                    opacity: 0,
                    top: 500,
                }, {
                    opacity: 1,
                    top: 0,
                    duration: 2,
                    ease: "power4.out",
                }, 0.1);
            tl.fromTo(projectsRef.current[0],
                {
                    opacity: 0,
                    top: 500
                }, {
                    duration: 2,
                    opacity: 1,
                    top: 0,
                    ease: "power4.out",
                }, 0.2);
            tl.fromTo(projectsRef.current[1],
                {
                    opacity: 0,
                    top: 500
                }, {
                    opacity: 1,
                    duration: 2,
                    top: 0,
                    ease: "power4.out",
                }, 0.3);

            const snapTime = gsap.utils.snap(spacing),
                animateFunc = element => {
                    const tl = gsap.timeline();
                    tl.fromTo(element,
                        {
                            filter: "grayscale(100%)",
                        },
                        {
                            filter: "grayscale(0%)",
                            duration: 0.5,
                            yoyo: true,
                            repeat: 1,
                            ease: "power1.in",
                            immediateRender: false
                        })
                        .fromTo(element,
                            {xPercent: `${xPercent}`},
                            {
                                xPercent: -`${xPercent}`,
                                duration: 1,
                                ease: "none",
                                immediateRender: false
                            }, 0);
                    return tl;
                };

            const seamlessLoop = buildSeamlessLoop(projectsRef.current, spacing, animateFunc);
            const playhead = {offset: 0};
            const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
            const scrub = gsap.to(playhead, {
                offset: 0,
                onUpdate() {
                    seamlessLoop.time(wrapTime(playhead.offset));
                },
                duration: 0.7,
                ease: "power3",
                paused: true
            });
            const trigger = ScrollTrigger.create({
                start: 0,
                onUpdate(self) {
                    let scroll = self.scroll();
                    if (scroll > self.end - 1) {
                        wrap(1, 1);
                    } else if (scroll < 1 && self.direction < 0) {
                        wrap(-1, self.end - 1);
                    } else {
                        scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
                        scrub.invalidate().restart();
                    }
                },
                end: "+=2000",
                pin: pinRef.current
            })
            const progressToScroll = progress => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end)
            const wrap = (iterationDelta, scrollTo) => {
                iteration += iterationDelta;
                trigger.scroll(scrollTo);
                trigger.update();
            };
            ScrollTrigger.refresh()

            let snapOnEnd = () => scrollToOffset(scrub.vars.offset);
            ScrollTrigger.addEventListener('scrollEnd', snapOnEnd);

            function scrollToOffset(offset) {
                let snappedTime = snapTime(offset),
                    progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration(),
                    scroll = progressToScroll(progress);
                if (progress >= 1 || progress < 0) {
                    return wrap(Math.floor(progress), scroll);
                }
                trigger.scroll(scroll);
            }

            function buildSeamlessLoop(items, spacing, animateFunc) {
                let rawSequence = gsap.timeline({paused: true}),
                    seamlessLoop = gsap.timeline({
                        paused: true,
                        repeat: -1,
                        onReverseComplete() {
                            this.totalTime(this.rawTime() + this.duration() * 100);
                        }
                    }),
                    cycleDuration = spacing * items.length,
                    dur;

                items.concat(items).concat(items).forEach((item, i) => {
                    let anim = animateFunc(items[i % items.length]);
                    rawSequence.add(anim, i * spacing);
                    dur || (dur = anim.duration());
                });

                seamlessLoop.fromTo(rawSequence, {
                    time: cycleDuration + dur / 2
                }, {
                    time: "+=" + cycleDuration,
                    duration: cycleDuration,
                    ease: "none"
                });
                return seamlessLoop;
            }

            return () => ScrollTrigger.removeEventListener('scrollEnd', snapOnEnd);
        }, scope);
        return () => ctx.revert();

    }, [projectsRef]);

    return (
        <section ref={scope}>
            <div ref={pinRef}
                 className="w-full z-10 sm:h-2/4 h-[67%] sm:absolute max-sm:fixed bottom-0 overflow-hidden">
                <ul className="absolute mt-small-mobile md:mt-0 w-5/6 sm:w-3/4 md:w-[48%] h-full top-0 sm:left-2/4 left-small-mobile sm:-translate-x-2/4 -translate-x-0">
                    {works.map((work, index) => (
                        <Work key={index} title={work.title} link={work.link} img={work.img} role={work.role}
                              setProjectsRef={setProjectsRef}/>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Works