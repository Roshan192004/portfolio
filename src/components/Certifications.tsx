import { useEffect, useRef, useState } from "react";
import { config } from "../config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Certifications.css";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<null | typeof config.certifications[0]>(null);

  const visibleCerts = showAll
    ? config.certifications
    : config.certifications.slice(0, 3);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".cert-img-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <div className="certifications-section" id="certifications" ref={sectionRef}>
      <div className="certifications-container">
        <h2 data-cursor="hover">
          Certification<span>s</span>
        </h2>

        <div className="cert-img-grid">
          {visibleCerts.map((cert, index) => (
            <div
              className="cert-img-card"
              key={index}
              data-cursor="hover"
              onClick={() => setSelectedCert(cert)}
            >
              {/* PDF thumbnail: scaled-down embed */}
              <div className="cert-img-thumb">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-img-thumb-img"
                />
                <div className="cert-img-overlay">
                  <span className="cert-view-icon">🔍 View</span>
                </div>
              </div>
              <div className="cert-img-info">
                <h3>{cert.title}</h3>
                <p className="cert-img-provider">- {cert.provider}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cert-view-all-wrap">
          <button
            className="cert-view-all-btn"
            onClick={() => setShowAll(!showAll)}
            data-cursor="hover"
          >
            {showAll ? "Show Less ←" : "View All →"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="cert-modal-body">
              <iframe
                src={selectedCert.pdf}
                title={selectedCert.title}
                className="cert-modal-pdf"
              />
            </div>
            <div className="cert-modal-footer">
              <h3>{selectedCert.title}</h3>
              <span>- {selectedCert.provider}</span>
              <a
                href={selectedCert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-modal-download"
              >
                Open PDF ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
