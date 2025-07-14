'use client';

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function Nav() {
  const [hcHover, setHcHover] = React.useState(false);
  const router = useRouter();
  return (
    <div
      className="w-full flex justify-between items-start mt-6 mb-16 px-1 sm:px-2 lg:px-4"
      style={{ maxWidth: 1382, position: "relative" }}
    >
      <div
        style={{ width: 258, color: hcHover ? "#8F85FF" : "#C6C6C6", fontSize: 20, fontFamily: "Space Mono, monospace", fontWeight: 400, textTransform: "uppercase", lineHeight: "24px", wordWrap: "break-word", cursor: "pointer", transition: "color 0.15s" }}
        onMouseEnter={() => setHcHover(true)}
        onMouseLeave={() => setHcHover(false)}
        onClick={() => router.push("/")}
      >
        [human centric ai]
      </div>
    </div>
  );
}

// Import Footer from the main page file
// (If you want to avoid code duplication, consider moving Footer to a shared component in the future)
function Footer() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  return (
    <footer style={{
      width: '100%',
      background: '#000',
      color: '#fff',
      padding: 0,
      position: 'relative',
      fontFamily: 'Space Mono, monospace',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        alignItems: isMobile ? 'flex-start' : 'stretch',
        width: '100%',
        minHeight: 340,
        padding: isMobile ? '0 8vw' : '0 32px',
        boxSizing: 'border-box',
        gap: isMobile ? 32 : 0,
      }}>
        {isMobile && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <a
              href="mailto:abdo.hassan@decathlon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-ellipse"
              style={{
                width: '90vw',
                maxWidth: 600,
                aspectRatio: '4/1',
                background: 'transparent',
                border: '1px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, border 0.2s',
                cursor: 'pointer',
                boxSizing: 'border-box',
                borderRadius: '50%',
                fontSize: '6vw',
                color: '#fff',
                position: 'relative',
                minWidth: 200,
                minHeight: 60,
                textDecoration: 'none',
                marginBottom: 32,
                marginTop: 60,
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#8F85FF';
                e.currentTarget.style.border = 'none';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = '1px solid #fff';
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 400, letterSpacing: -2, textAlign: 'center', width: '100%' }}> Let&apos;s Connect! </span>
            </a>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 220 }}>
          <div style={{ marginTop: isMobile ? 0 : 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: isMobile ? 14 : 20, letterSpacing: 1, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              RESOURCES
            </a>
            <a href="https://www.figma.com/board/pRFcMj9WYdwWzVvhmRVaHL/Human-centred-AI-Design-Principles?node-id=0-1&t=NlFUxyAmYp8PzWbT-1" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontSize: isMobile ? 14 : 20, letterSpacing: 0 }}>HCAI PRINCIPLES</a>
          </div>
          <div style={{ marginTop: 64, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: isMobile ? 14 : 16, color: '#fff', letterSpacing: -1}}>&copy; {new Date().getFullYear()} Decathlon. All rights reserved.</span>
          </div>
        </div>
        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
            <a
              href="mailto:abdo.hassan@decathlon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-ellipse"
              style={{
                width: '50vw',
                maxWidth: 1200,
                aspectRatio: '4/1',
                background: 'transparent',
                border: '1px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, border 0.2s',
                cursor: 'pointer',
                boxSizing: 'border-box',
                borderRadius: '50%',
                fontSize: '3vw',
                color: '#fff',
                position: 'relative',
                minWidth: 200,
                minHeight: 60,
                textDecoration: 'none',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#8F85FF';
                e.currentTarget.style.border = 'none';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = '1px solid #fff';
              }}
            >
              <span style={{ fontSize: '2.8vw', fontWeight: 400, letterSpacing: -2 }}> Let&apos;s Connect! </span>
            </a>
          </div>
        )}
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', minWidth: 220 }}>
            <div style={{ marginTop: 56, fontSize: 20, letterSpacing: 0, textTransform: 'uppercase' }}>[Human]</div>
            <div style={{ fontSize: 20, letterSpacing: 0, marginTop: 8, textTransform: 'uppercase' }}>[x AI]</div>
            <div style={{ flex: 1 }} />
          </div>
        )}
      </div>
      <style jsx>{`
        .footer-contact-ellipse {
          aspect-ratio: 4/1;
        }
        @media (max-width: 900px) {
          .footer-contact-ellipse {
            width: 90vw !important;
            font-size: 6vw !important;
          }
        }
      `}</style>
    </footer>
  );
}

export default function ProjectOne() {
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth <= 900) {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
      } else {
        document.body.style.overflowX = '';
        document.documentElement.style.overflowX = '';
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!imageFrameRef.current || !textContentRef.current) return;
      const textRect = textContentRef.current.getBoundingClientRect();
      const imageFrame = imageFrameRef.current;
      // If text content is at the bottom of viewport and user scrolls down
      if (
        textRect.bottom <= window.innerHeight &&
        e.deltaY > 0 &&
        imageFrame.scrollTop + imageFrame.clientHeight < imageFrame.scrollHeight
      ) {
        e.preventDefault();
        imageFrame.scrollTop += e.deltaY;
      }
      // If image frame is at the top and user scrolls up, let page scroll
      if (
        textRect.bottom <= window.innerHeight &&
        e.deltaY < 0 &&
        imageFrame.scrollTop > 0
      ) {
        e.preventDefault();
        imageFrame.scrollTop += e.deltaY;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      {/* Nav */}
      <Nav />
      {/* Content */}
      <section className="flex-1 flex items-center justify-center">
        {isMobile ? (
          <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 4, paddingRight: 4 }}>
            {/* Image Gallery on top */}
            <div ref={imageFrameRef} className="w-full h-full overflow-y-auto" style={{ maxHeight: '1400px', minHeight: '400px', height: 'auto' }}>
              <div className="grid grid-cols-8 gap-2 items-start justify-center">
                {/* label-1 and label-2, each 8 col, respect ratio */}
                <img src="/label-1.png" alt="Label 1" className="col-span-8 rounded" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <img src="/label-2.png" alt="Label 2" className="col-span-8 rounded " style={{ width: '100%', height: 'auto', display: 'block' }} />
                {/* label-3 (6 col) and label-4 (2 col), side by side, crop label-3 if heights differ, gray border */}
                <div className="col-span-8 grid grid-cols-8 gap-2 items-start">
                  <div className="col-span-6 rounded overflow-hidden" style={{ height: '100%', border: '1px solid #e5e7eb' }}>
                    <img src="/label-3.png" alt="Label 3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                  <div className="col-span-2 rounded overflow-hidden" style={{ height: '100%', border: '1px solid #e5e7eb' }}>
                    <img src="/label-4.png" alt="Label 4" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                </div>
                {/* label-5 (3 col) and label-6 (5 col), side by side, crop label-6 if heights differ, gray border */}
                <div className="col-span-8 grid grid-cols-8 gap-2 items-start rounded">
                  <div className="col-span-3 rounded overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
                    <img src="/label-5.png" alt="Label 5" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                  <div className="col-span-5 rounded overflow-hidden" style={{ height: '100%', border: '1px solid #e5e7eb' }}>
                    <img src="/label-6.png" alt="Label 6" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                </div>
                {/* label-7 full row */}
                <img src="/label-7.png" alt="Label 7" className="col-span-8 rounded " style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
            {/* Text content below gallery */}
            <div ref={textContentRef} style={{ width: '100%', marginBottom: isMobile ? 80 : 0 }}>
              {/* Small section title above main title, left aligned with 3-col content */}
              <div className="grid grid-cols-4 w-full mb-2">
                <div className="col-span-1" />
                <div className="col-span-3">
                  <span className="font-mono uppercase text-[14px] text-[#5241FF] tracking-normal">Labeling Platform</span>
                </div>
              </div>
              <h2 className="font-mono uppercase text-[20px] font-normal tracking-tight mt-6">
                How do we make evaluating AI search engines as intuitive as human judgment?
              </h2>
              {/* Paragraph row using grid for alignment */}
              <div className="grid grid-cols-4 w-full mt-12 mb-6">
                <div className="col-span-1" />
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black">
                    With the goal to contribute to the advancement of GenAI-based contextual search engines for e-commerce, we reimagined how experts label search queries and define what users should find when looking for products. <br/><br/>Our platform transforms the technical process of evaluating AI search engines into an intuitive, human-centered experience that empowers domain experts to shape how contextual search works. Rather than forcing experts through complex technical workflows, we designed intuitive, guided experiences that reduce cognitive load while maintaining annotation quality. <br/><br/> Through iterative prototyping and UX research, we transformed complex structured data into familiar e-commerce interfaces, making labeling as simple as answering: what should users see when they search for this?  <br/><br/> The result is an evaluation environment that accelerates expert judgment while generating rich, high-quality datasets for data scientists to improve their models.
                  </p>
                </div>
              </div>
              {/* New content rows with more top/bottom margin */}
              <div className="grid grid-cols-4 w-full mt-8 mb-8">
                <div className="col-span-1 flex items-start">
                  <span className="font-mono uppercase text-[12px] text-black tracking-normal">Output</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black leading-relaxed">
                    Labeling platform to generate structured gold standard datasets with quality assessment metrics and performance comparison analytics.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 w-full mt-8 mb-8">
                <div className="col-span-1 flex items-start">
                  <span className="font-mono uppercase text-[12px] text-black tracking-normal whitespace-pre-line leading-tight">Key<br/>Features</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black leading-relaxed">
                    Multi-language support,<br/>scalable architecture,<br/> user-friendly interface for non-technical users.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 w-full mt-8 mb-8">
                <div className="col-span-1 flex items-start">
                  <span className="font-mono uppercase text-[12px] text-black tracking-normal">Technology</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black leading-relaxed">
                    Web technologies (React, TypeScript, JavaScript)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3 w-full items-start mb-24" style={{ margin: 20 }}>
            {/* Left: Image Placeholder (col-span 1-8) */}
            <div className="col-span-8 flex items-start justify-center">
              <div
                ref={imageFrameRef}
                className="w-full h-full overflow-y-auto"
                style={{ maxHeight: '1400px', minHeight: '400px', height: '1400px' }}
              >
                <div className="grid grid-cols-8 gap-2 items-start justify-center">
                  {/* label-1 and label-2, each 8 col, respect ratio */}
                  <img src="/label-1.png" alt="Label 1" className="col-span-8 rounded" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  <img src="/label-2.png" alt="Label 2" className="col-span-8 rounded " style={{ width: '100%', height: 'auto', display: 'block' }} />
                  {/* label-3 (6 col) and label-4 (2 col), side by side, crop label-3 if heights differ, gray border */}
                  <div className="col-span-8 grid grid-cols-8 gap-2 items-start">
                    <div className="col-span-6 rounded overflow-hidden" style={{ height: '100%', border: '1px solid #e5e7eb' }}>
                      <img src="/label-3.png" alt="Label 3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div className="col-span-2 rounded overflow-hidden" style={{ height: '100%', border: '1px solid #e5e7eb' }}>
                      <img src="/label-4.png" alt="Label 4" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                  </div>
                  {/* label-5 (3 col) and label-6 (5 col), side by side, crop label-6 if heights differ, gray border */}
                  <div className="col-span-8 grid grid-cols-8 gap-2 items-start rounded">
                    <div className="col-span-3 rounded overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
                      <img src="/label-5.png" alt="Label 5" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                    </div>
                    <div className="col-span-5 rounded overflow-hidden" style={{ height: '100%', border: '1px solid #e5e7eb' }}>
                      <img src="/label-6.png" alt="Label 6" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                  </div>
                  {/* label-7 full row */}
                  <img src="/label-7.png" alt="Label 7" className="col-span-8 rounded " style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            </div>
            {/* Title and Paragraph (col-span 9-12) */}
            <div className="col-start-9 col-span-4 flex flex-col w-full" style={{ height: '100%' }} ref={textContentRef}>
              {/* Small section title above main title, left aligned with 3-col content */}
              <div className="grid grid-cols-4 w-full mb-2">
                <div className="col-span-1" />
                <div className="col-span-3">
                  <span className="font-mono uppercase text-[14px] text-[#5241FF] tracking-normal">Labeling Platform</span>
                </div>
              </div>
              <h2 className="font-mono uppercase text-[20px] font-normal tracking-tight mt-6">
                How do we make evaluating AI search engines as intuitive as human judgment?
              </h2>
              <div className="grid grid-cols-4 w-full mt-12 mb-6">
                <div className="col-span-1" />
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black">
                    With the goal to contribute to the advancement of GenAI-based contextual search engines for e-commerce, we reimagined how experts label search queries and define what users should find when looking for products. <br/><br/>Our platform transforms the technical process of evaluating AI search engines into an intuitive, human-centered experience that empowers domain experts to shape how contextual search works. Rather than forcing experts through complex technical workflows, we designed intuitive, guided experiences that reduce cognitive load while maintaining annotation quality. <br/><br/> Through iterative prototyping and UX research, we transformed complex structured data into familiar e-commerce interfaces, making labeling as simple as answering: what should users see when they search for this?  <br/><br/> The result is an evaluation environment that accelerates expert judgment while generating rich, high-quality datasets for data scientists to improve their models.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 w-full mt-8 mb-8">
                <div className="col-span-1 flex items-start">
                  <span className="font-mono uppercase text-[12px] text-black tracking-normal">Output</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black leading-relaxed">
                    Labeling platform to generate structured gold standard datasets with quality assessment metrics and performance comparison analytics.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 w-full mt-8 mb-8">
                <div className="col-span-1 flex items-start">
                  <span className="font-mono uppercase text-[12px] text-black tracking-normal whitespace-pre-line leading-tight">Key<br/>Features</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black leading-relaxed">
                    Multi-language support,<br/>scalable architecture,<br/> user-friendly interface for non-technical users.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 w-full mt-8 mb-8">
                <div className="col-span-1 flex items-start">
                  <span className="font-mono uppercase text-[12px] text-black tracking-normal">Technology</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono text-[14px] text-black leading-relaxed">
                    Web technologies (React, TypeScript, JavaScript)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
