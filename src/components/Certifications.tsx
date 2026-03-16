import { useEffect, useRef } from "react";
import { config } from "../config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Certifications.css";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".certification-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="certifications-section" id="certifications" ref={sectionRef}>
      <div className="certifications-container">
        <h2 data-cursor="hover">Certifications <span>&</span> Achievements</h2>
        
        <div className="certifications-grid">
          {config.certifications.map((cert, index) => (
            <div className="certification-card" key={index} data-cursor="hover">
              <div className="cert-content">
                <div className="cert-header">
                  <div className="cert-icon">
                    <img src={cert.icon} alt={cert.provider} />
                  </div>
                  <div className="cert-date">{cert.date}</div>
                </div>
                <h3>{cert.title}</h3>
                <p className="cert-provider">{cert.provider}</p>
              </div>
            </div>
          ))}

          {/* Special card for LeetCode */}
          <div className="certification-card achievement-card" data-cursor="hover">
            <div className="cert-content">
              <div className="cert-header">
                <div className="cert-icon leetcode-icon">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" style={{ filter: "invert(1) brightness(2)" }} />
                </div>
                <div className="cert-date">Continuous</div>
              </div>
              <h3>150+ Problems Solved</h3>
              <p className="cert-provider">LeetCode</p>
              <div className="cert-tags">
                <span>Arrays</span>
                <span>Trees</span>
                <span>Graphs</span>
                <span>DP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
