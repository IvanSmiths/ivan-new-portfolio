/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

import Link from 'next/link';
import { CursorContext } from '../components/CursorManager';
import GalleryWorks from '../components/GalleryWorks';

const Test = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector('#box'),
      {
        x: 0,
        opacity: 1,
      },
      {
        x: '-200vw',
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          markers: true,
          trigger: element.querySelector('#box'),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          toggleClass: 'box-fixed',
        },
      }
    );
  }, []);

  return (
    <div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum qui non
          sequi nisi recusandae veniam vel sint ad explicabo quis fuga placeat
          tempora dolorem maiores reprehenderit, perspiciatis nesciunt, cumque
          alias molestias dolores possimus sapiente. Illum voluptatum quia
          repellat possimus quo, quam odio numquam doloremque, consequatur unde
          illo, magnam aliquid natus fugit voluptate minus blanditiis quis
          fugiat impedit sed labore consequuntur.
        </p>
      </div>
      <div ref={ref} className="box-cnt" id="box-cnt">
        <div id="box" className="box">
          <div id="box1" className="box1">
            <h2>PROGETTO</h2>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div id="box2" className="box2">
            <h2>PROGETTO</h2>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div id="box3" className="box3">
            <h2>PROGETTO</h2>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
      <div>
        <div id="box3" className="box3-2">
          <h2>PROGETTO</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum qui non
          sequi nisi recusandae veniam vel sint ad explicabo quis fuga placeat
          tempora dolorem maiores reprehenderit, perspiciatis nesciunt, cumque
          alias molestias dolores possimus sapiente. Illum voluptatum quia
          repellat possimus quo, quam odio numquam doloremque, consequatur unde
          illo, magnam aliquid natus fugit voluptate minus blanditiis quis
          fugiat impedit sed labore consequuntur. Esse quae ut suscipit
          eligendi! Sunt eligendi recusandae aut repudiandae itaque
          necessitatibus doloremque asperiores dignissimos iure ea voluptatem
          tempore culpa pariatur in ducimus blanditiis at esse voluptatum sed,
          officia eaque libero eum. Sed nesciunt, numquam saepe, dolor, labore
          veritatis eligendi possimus iusto molestiae enim odit ducimus quaerat!
          Ipsum maxime, ipsam maiores necessitatibus sit laudantium sunt! Fugit
          quia harum error animi ullam illum eius ut tempora a hic accusamus,
          molestias mollitia expedita corrupti aperiam debitis dolorum. Quisquam
          voluptates, temporibus, non quam, obcaecati eligendi facere sunt nihil
          doloremque autem quibusdam eos mollitia? Vel quae accusantium magnam
          minus aliquam veritatis ducimus facere qui. Quis quos odio eveniet,
          amet possimus blanditiis fugit earum quod deserunt asperiores, sequi
          incidunt cum illo suscipit totam. Suscipit, sed, iure unde incidunt
          repellendus consequuntur possimus voluptas hic doloremque temporibus
          saepe voluptatem cupiditate obcaecati quod at nemo vitae, officia odit
          itaque molestiae doloribus quis. Adipisci velit, libero dicta
          provident consequuntur, soluta hic doloribus at est repellendus fuga
          dolor deleniti. Aliquam modi quia nobis, aspernatur a labore doloribus
          velit assumenda dicta veritatis quam, odio similique asperiores,
          incidunt totam sint in minus officia fuga. Temporibus placeat tempore
          architecto pariatur recusandae earum reiciendis aliquam, repellat qui
          a molestiae? Quae pariatur, laborum recusandae mollitia molestiae
          assumenda nobis necessitatibus? Repellat nulla eum beatae atque ullam
          modi delectus cum ipsum, deserunt sequi ut quisquam voluptatem
          repudiandae, explicabo eveniet? Voluptatem cupiditate impedit illo.
          Accusamus quod explicabo ipsa eaque officiis necessitatibus vitae
          molestias quas dignissimos commodi! Voluptatibus, impedit!
        </p>
      </div>
      <div>
        <p className="skewElem">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum qui non
          sequi nisi recusandae veniam vel sint ad explicabo quis fuga placeat
          tempora dolorem maiores reprehenderit, perspiciatis nesciunt, cumque
          alias molestias dolores possimus sapiente. Illum voluptatum quia
          repellat possimus quo, quam odio numquam doloremque, consequatur unde
          illo, magnam aliquid natus fugit voluptate minus blanditiis quis
          fugiat impedit sed labore consequuntur. Esse quae ut suscipit
          eligendi! Sunt eligendi recusandae aut repudiandae itaque
          necessitatibus doloremque asperiores dignissimos iure ea voluptatem
          tempore culpa pariatur in ducimus blanditiis at esse voluptatum sed,
          officia eaque libero eum. Sed nesciunt, numquam saepe, dolor, labore
          veritatis eligendi possimus iusto molestiae enim odit ducimus quaerat!
          Ipsum maxime, ipsam maiores necessitatibus sit laudantium sunt! Fugit
          quia harum error animi ullam illum eius ut tempora a hic accusamus,
          molestias mollitia expedita corrupti aperiam debitis dolorum. Quisquam
          voluptates, temporibus, non quam, obcaecati eligendi facere sunt nihil
          doloremque autem quibusdam eos mollitia? Vel quae accusantium magnam
          minus aliquam veritatis ducimus facere qui. Quis quos odio eveniet,
          amet possimus blanditiis fugit earum quod deserunt asperiores, sequi
          incidunt cum illo suscipit totam. Suscipit, sed, iure unde incidunt
          repellendus consequuntur possimus voluptas hic doloremque temporibus
          saepe voluptatem cupiditate obcaecati quod at nemo vitae, officia odit
          itaque molestiae doloribus quis. Adipisci velit, libero dicta
          provident consequuntur, soluta hic doloribus at est repellendus fuga
          dolor deleniti. Aliquam modi quia nobis, aspernatur a labore doloribus
          velit assumenda dicta veritatis quam, odio similique asperiores,
          incidunt totam sint in minus officia fuga. Temporibus placeat tempore
          architecto pariatur recusandae earum reiciendis aliquam, repellat qui
          a molestiae? Quae pariatur, laborum recusandae mollitia molestiae
          assumenda nobis necessitatibus? Repellat nulla eum beatae atque ullam
          modi delectus cum ipsum, deserunt sequi ut quisquam voluptatem
          repudiandae, explicabo eveniet? Voluptatem cupiditate impedit illo.
          Accusamus quod explicabo ipsa eaque officiis necessitatibus vitae
          molestias quas dignissimos commodi! Voluptatibus, impedit!
        </p>
      </div>
    </div>
  );
};

export default Test;
