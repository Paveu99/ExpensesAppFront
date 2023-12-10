import React from "react";
import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";

interface AnimatedSlideProps {
    children: React.ReactNode;
}

export const AnimatedSlide = (children: AnimatedSlideProps ) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 2 }}
        >
            {children.children}
        </motion.div>
    );
};