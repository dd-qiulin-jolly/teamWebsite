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
	return (
		<footer style={{
			width: '100%',
			background: '#000',
			color: '#fff',
			padding: 0,
			position: 'relative',
			fontFamily: 'Space Mono, monospace',
      marginTop: '12rem', // Add top margin to separate from content
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'stretch',
				width: '100%',
				minHeight: 340,
				padding: '0 32px',
				boxSizing: 'border-box',
			}}>
				{/* Left: List and copyright */}
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 220 }}>
					<div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
						<a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: 20, letterSpacing: 1, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
  RESOURCES
</a>
						<a href="https://www.figma.com/board/pRFcMj9WYdwWzVvhmRVaHL/Human-centred-AI-Design-Principles?node-id=0-1&t=NlFUxyAmYp8PzWbT-1" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontSize: 20, letterSpacing: 0 }}>HCAI PRINCIPLES</a>
						
					</div>
					<div style={{ marginTop: 32, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 16, color: '#fff', letterSpacing: -1, textTransform: 'uppercase' }}>&copy; {new Date().getFullYear()} Decathlon. All rights reserved.</span>
					</div>
				</div>

				{/* Center: Ellipse Contact Button */}
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
						<span style={{ fontSize: '2.8vw', fontWeight: 400, letterSpacing: -2 }}> Let's Connect! </span>
					</a>
				</div>

				{/* Right: Top and bottom labels */}
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', minWidth: 220 }}>
					<div style={{ marginTop: 56, fontSize: 20, letterSpacing: 0, textTransform: 'uppercase' }}>[Human]</div>
					<div style={{ fontSize: 20, letterSpacing: 0, marginTop: 8, textTransform: 'uppercase' }}>[x AI]</div>
					<div style={{ flex: 1 }} />
				</div>
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
        <div className="grid grid-cols-12 gap-3 w-full items-start mb-24" style={{ margin: 20 }}>
          {/* Left: Image Placeholder (col-span 1-8) */}
          <div className="col-span-8 flex items-start justify-center">
            <div
              ref={imageFrameRef}
              className="w-full h-full overflow-y-auto"
              style={{ maxHeight: '1400px', minHeight: '400px', height: '1400px' }}
            >
              <div className="grid grid-cols-8 gap-2 items-start justify-center">
                {/* 8-col wide image */}
                <img src="/placeholder.jpg" alt="Main Example" className="col-span-8 rounded shadow mt-4" />
                {/* 4-col wide images */}
                <img src="/placeholder.jpg" alt="Example 2" className="col-span-4 rounded shadow" />
                <img src="/placeholder.jpg" alt="Example 3" className="col-span-4 rounded shadow" />
                {/* 8-col wide image */}
                <img src="/placeholder.jpg" alt="Example 4" className="col-span-8 rounded shadow" />
                {/* 4-col wide images */}
                <img src="/placeholder.jpg" alt="Example 5" className="col-span-4 rounded shadow mb-4" />
                <img src="/placeholder.jpg" alt="Example 6" className="col-span-4 rounded shadow mb-4" />
                {/* Additional images for a richer gallery */}
                <img src="/placeholder.jpg" alt="Example 7" className="col-span-8 rounded shadow" />
                <img src="/placeholder.jpg" alt="Example 8" className="col-span-4 rounded shadow" />
                <img src="/placeholder.jpg" alt="Example 9" className="col-span-4 rounded shadow" />
                <img src="/placeholder.jpg" alt="Example 10" className="col-span-8 rounded shadow mb-4" />
              </div>
            </div>
          </div>
          {/* Title and Paragraph (col-span 9-12) */}
          <div className="col-start-9 col-span-4 flex flex-col w-full" style={{ height: '100%' }} ref={textContentRef}>
            {/* Small section title above main title, left aligned with 3-col content */}
            <div className="grid grid-cols-4 w-full mb-2">
              <div className="col-span-1" />
              <div className="col-span-3">
                <span className="font-mono uppercase text-[14px] text-[#5241FF] tracking-normal">Generative UI PoC</span>
              </div>
            </div>
            <h2 className="font-mono uppercase text-[20px] font-normal tracking-tight mt-6">
              Instantly-adaptive generative UI: how can we take users where they really want to be? / What if AI could craft the perfect interface that reads human intent?
            </h2>
            {/* Paragraph row using grid for alignment */}
            <div className="grid grid-cols-4 w-full mt-12 mb-6">
              <div className="col-span-1" />
              <div className="col-span-3">
                <p className="font-mono text-[14px] text-black">
                  Through literature research and qualitative user studies, we identified tensions between dominant chat interfaces and the actual solutions users need: while users think in tasks, AI responds in conversations. Instead of forcing users to adapt to rigid chat formats, we imagined a system that breaks down user intents and generates appropriate UI components on-the-go.<br/><br/>
Through creative prototyping, we expanded the possibilities of human-LLM interactions to create interfaces that truly understand user intent, providing a foundation for creating intuitive systems that augment their actions. We built this by integrating our own research backend directly into conversations and using LLM function calling with modular UI components to transform what users want into the perfect interface for their task.<br/><br/>
Looking for something specific? You'll see a curated list of available products with real-time research insights. Need to compare products? The system creates detailed comparison tables pulling from live data. Our platform transforms from a static chat window into whatever tool users actually need, exactly when they need it.
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
                  Intelligent chatbot that generates hyper-adaptive UI workflows, responding dynamically to user context and intent.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 w-full mt-8 mb-8">
              <div className="col-span-1 flex items-start">
                <span className="font-mono uppercase text-[12px] text-black tracking-normal whitespace-pre-line leading-tight">Key<br/>Features</span>
              </div>
              <div className="col-span-3">
                <p className="font-mono text-[14px] text-black leading-relaxed">
                  Real-time intent analysis,<br/>dynamic interface generation,<br/> seamless task transitions, <br/> and context-aware UI adaptation across diverse use cases.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 w-full mt-8 mb-8">
              <div className="col-span-1 flex items-start">
                <span className="font-mono uppercase text-[12px] text-black tracking-normal">Technology</span>
              </div>
              <div className="col-span-3">
                <p className="font-mono text-[14px] text-black leading-relaxed">
                  Web technologies (React, TypeScript, JavaScript), AI integration (Python, Gemini Flash 1.5)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
