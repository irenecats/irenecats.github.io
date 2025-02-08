"use client";
import { Project, projectList } from "../static-info/projectList";
import { useRef, useEffect, memo } from "react";
import style from "./project-gallery.module.css";
import ProjectDescription from "./project-description";
import StarSeparator from "../svgs/star-separator-svg";
import Image from "next/image";

export default memo(ProjectGallery);

interface Props {
  selectedItem: number;
  handleClick: (index: number) => void;
}

function ProjectGallery({ selectedItem, handleClick }: Props) {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  });

  return (
    <div className={style.stickyContainer}>
      <div>
        <h1>Projects</h1>
        <section className={`${style.sectionBody} marginContent`}>
          <ul>
            {projectList.map((elem: Project, index: number) => {
              return (
                <li
                  key={index}
                  className={
                    `${style.title} ` +
                    (index == selectedItem && `${style.selected}`)
                  }
                  onClick={() => {
                    handleClick(index);
                  }}
                >
                  <StarSeparator className={style.svgWrapper} />
                  <h3>{elem.title}</h3>
                </li>
              );
            })}
          </ul>
          <section className={`${style.imgContainer} relative`}>
            {projectList.map((elem: Project, index: number) => {
              return (
                <a
                  href={elem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  style={{
                    zIndex: projectList.length - index,
                  }}
                  className={
                    `${style.projectCard} ` +
                    (index == selectedItem && `${style.selectedProject}`)
                  }
                >
                  <div className={`${style.descriptionPc} rounded initHidden`}>
                    <ProjectDescription project={elem} isHidden={true} />
                  </div>
                  <Image
                    src={elem.imageRef}
                    className={`${style.image} w-full rounded aspect-video object-cover`}
                    width="800"
                    height="450"
                    alt={elem.imageAlt}
                  />
                </a>
              );
            })}
          </section>
        </section>
      </div>
    </div>
  );
}
