"use client";

import Image from "next/image";
import { useEffect, useRef, useState, CSSProperties, useLayoutEffect } from "react";

interface FocusBox {
	title: string;
	desc: string;
}

interface FocusPointProps {
	img: string;
	width: number;
	height: number;
	style: CSSProperties;
	box: FocusBox;
}

const focusData = [
	{
		id: 1,
		img: "/focus-1.svg",
		width: 100,
		height: 100,
		style: { position: "absolute" as const, left: 90, top: 590, zIndex: 2 }, // moved down from 400 to 480
		target: "what-we-do-section",
		box: {
			title: "output", // changed from 'input' to 'output'
			desc: "so here is the short explanation of what we mean by output", // changed to match title
		},
	},
	{
		id: 2,
		img: "/focus-2.svg",
		width: 60,
		height: 60,
		style: {
			position: "absolute" as const,
			left: "50%",
			top: "45%",
			transform: "translate(-50%, -50%)",
			zIndex: 2,
		},
		target: "section-2",
		box: {
			title: "process",
			desc: "so here is the short explanation of what we mean by process",
		},
	},
	{
		id: 3,
		img: "/focus-3.svg",
		width: 60,
		height: 60,
		style: { position: "absolute" as const, right: 100, top: 200, zIndex: 2 },
		target: "section-3",
		box: {
			title: "input", // changed from 'output' to 'input'
			desc: "so here is the short explanation of what we mean by input", // changed to match title
		},
	},
];

function FocusPoint({ img, width, height, style, box, target, id, setIsHovering }: FocusPointProps & { target: string; id: number; setIsHovering: (v: boolean) => void }) {
	const [hover, setHover] = useState(false);
    // Blinking logic: disappear for 0.1s, visible for the rest of the interval
    const [blink, setBlink] = useState(true);
    useEffect(() => {
        let visibleDuration = 3000, blinkDuration = 100;
        if (id === 2) visibleDuration = 8000;
        if (id === 3) visibleDuration = 8000;
        let timeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;
        function startBlinkCycle() {
            setBlink(true);
            timeout = setTimeout(() => {
                setBlink(false);
                timeout = setTimeout(() => {
                    setBlink(true);
                }, blinkDuration);
            }, visibleDuration - blinkDuration);
        }
        startBlinkCycle();
        interval = setInterval(startBlinkCycle, visibleDuration);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [id]);
	const handleClick = () => {
		const el = document.getElementById(target);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<div
			className="focus-point"
			style={{ ...style, cursor: `url('/cursor-0.svg'), pointer`, opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
			onMouseEnter={() => { setHover(true); setIsHovering(true); }}
			onMouseLeave={() => { setHover(false); setIsHovering(false); }}
			onClick={handleClick}
		>
			<Image src={img} alt="Focus" width={width} height={height} />
			{hover && (
				<div
					style={{
						position: "absolute",
						left: width + 10,
						top: 0,
						paddingTop: 6,
						paddingBottom: 24,
						paddingLeft: 6,
						paddingRight: 6,
						background: "#C6C6C6",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "flex-start",
						gap: 10,
						display: "inline-flex",
						zIndex: 10,
						minWidth: 200,
					}}
				>
					<div
						style={{
							width: 173.22,
							justifyContent: "flex-start",
							alignItems: "flex-start",
							gap: 4,
							display: "inline-flex",
							flexWrap: "wrap",
							alignContent: "flex-start",
						}}
					>
						<Image
							src="/dec-1.svg"
							alt="dec-1"
							width={13.7}
							height={13.7}
						/>
						<Image
							src="/dec-2.svg"
							alt="dec-2"
							width={8.22}
							height={8.22}
						/>
						<div
							style={{
								width: 161,
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								gap: 7,
								display: "inline-flex",
							}}
						>
							<div
								style={{
									alignSelf: "stretch",
									color: "black",
									fontSize: 14,
									fontFamily: "Space Mono, monospace",
									fontWeight: 400,
									textTransform: "uppercase",
									lineHeight: "18px",
									wordWrap: "break-word",
								}}
							>
								{box.title}
							</div>
							<div
								style={{
									alignSelf: "stretch",
									color: "black",
									fontSize: 14,
									fontFamily: "Space Mono, monospace",
									fontWeight: 400,
									textTransform: "uppercase",
									lineHeight: "18px",
									wordWrap: "break-word",
								}}
							>
								{box.desc}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 18, // keep left margin if needed
        zIndex: 100,
        width: 326,
        background: "#C6C6C6",
        display: "block", // block layout for full width children
      }}
    >
      <div style={{ width: "100%", padding: 0, margin: 0 }}>
        <div
          style={{
            width: "100%",
            paddingLeft: 18,
            paddingRight: 18,
            paddingTop: 8,
            paddingBottom: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
            }}
            aria-label="Close overlay"
          >
            <img src="/close.svg" alt="close" width={16} height={16} />
          </button>
        </div>
        <div style={{ width: "100%", height: 1, background: "#101010", margin: 0 }} />
        <div
          style={{
            width: "100%",
            paddingLeft: 18,
            paddingRight: 18,
            paddingTop: 18,
            paddingBottom: 18,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            alignItems: "center", // center content
          }}
        >
          <div
            style={{
              color: "black",
              fontSize: 14,
              fontFamily: "Space Mono, monospace",
              fontWeight: 400,
              textTransform: "uppercase",
              lineHeight: "18px",
              wordWrap: "break-word",
            }}
          >
            *hi there!*
          </div>
          <div
            style={{
              width: 264,
              color: "black",
              fontSize: 14,
              fontFamily: "Space Mono, monospace",
              fontWeight: 400,
              textTransform: "uppercase",
              lineHeight: "18px",
              wordWrap: "break-word",
              marginBottom: 12,
            }}
          >
            welcome to the human-centric ai team!<br />
            <br />
            //explain the concept of the hero section in one sentence.<br />
            <br />
            scroll down the page to explore more about us.
          </div>
          {/* Add logo-dot.svg under the text */}
          <img src="/logo-dot.svg" alt="logo dot" width={48} height={48} style={{ marginTop: 8 }} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
	// For SVG grow effect
	const totalLength = 1200; // Approximate path length, adjust as needed
	const [lineProgress, setLineProgress] = useState(0);
	const [delayedLineProgress, setDelayedLineProgress] = useState(0);
	const lineRef = useRef<SVGPathElement>(null);

	// Cursor logic
	const [cursorIndex, setCursorIndex] = useState(1); // 1-5 for blank, 0 for hover
	const [isHovering, setIsHovering] = useState(false);

	// Click on blank space to cycle cursor (only in hero section)
	const handleHeroBlankClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLElement).closest('.focus-point')) return;
		if (!isHovering) {
			setCursorIndex((prev) => (prev % 5) + 1);
		}
	};

	useEffect(() => {
		function handleScroll() {
			const scrollTop = window.scrollY;
			const windowH = window.innerHeight;

			// 1. Hero to What We Do (restore original logic)
			const section3 = document.querySelectorAll('[id^="section-frame"]')[1] || document.getElementById('Section 3');
			const section3Top = section3 ? (section3 as HTMLElement).getBoundingClientRect().top + window.scrollY : 0;
			let progress1 = 0;
			if (section3Top > 0) {
				progress1 = scrollTop / (section3Top - windowH / 2);
			} else {
				const docHeight = document.body.scrollHeight - windowH;
				progress1 = docHeight > 0 ? scrollTop / (docHeight * 0.4) : 0;
			}
			progress1 = Math.min(Math.max(progress1, 0), 1);
			const fastStartProgress = Math.pow(progress1, 0.7);
			setLineProgress1(fastStartProgress);

			// 2. What We Do to Section 2 (delayed, slower)
			const whatWeDo = document.getElementById('what-we-do-section');
			const section2 = document.getElementById('section-2');
			let whatWeDoEnd = whatWeDo ? (whatWeDo.getBoundingClientRect().bottom + window.scrollY) : 1200;
			let section2Top = section2 ? (section2.getBoundingClientRect().top + window.scrollY) : 1800;
			let triggerStart2 = whatWeDoEnd - windowH * 0.2;
			let triggerEnd2 = section2Top - windowH * 0.3;
			let progress2 = 0;
			if (scrollTop < triggerStart2) progress2 = 0;
			else if (scrollTop > triggerEnd2) progress2 = 1;
			else progress2 = (scrollTop - triggerStart2) / (triggerEnd2 - triggerStart2);
			setLineProgress2(Math.pow(Math.min(Math.max(progress2, 0), 1), 1.2));

			// 3. Section 2 to Section 3 (delayed, independent)
			const section3Div = document.getElementById('section-3');
			let section2End = section2 ? (section2.getBoundingClientRect().bottom + window.scrollY) : 2200;
			let section3Top2 = section3Div ? (section3Div.getBoundingClientRect().top + window.scrollY) : 2600;
			let triggerStart3 = section2End - windowH * 0.2;
			let triggerEnd3 = section3Top2 - windowH * 0.3;
			let progress3 = 0;
			if (scrollTop < triggerStart3) progress3 = 0;
			else if (scrollTop > triggerEnd3) progress3 = 1;
			else progress3 = (scrollTop - triggerStart3) / (triggerEnd3 - triggerStart3);
			setLineProgress3(Math.pow(Math.min(Math.max(progress3, 0), 1), 1.1));
		}
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const [showOverlay, setShowOverlay] = useState(true);
	const [hcHover, setHcHover] = useState(false);

	const [lineProgress1, setLineProgress1] = useState(0);
	const [lineProgress2, setLineProgress2] = useState(0);
	const [lineProgress3, setLineProgress3] = useState(0);

	return (
		<div className="flex flex-col items-center min-h-screen bg-background text-foreground font-mono">
			{/* Responsive Top Bar */}
			<div
				className="w-full flex justify-between items-start mt-6 mb-16 px-1 sm:px-2 lg:px-4"
				style={{ maxWidth: 1382, position: "relative" }}
			>
				{/* Overlay under left top "human centric ai" */}
				<div style={{ position: "absolute", top: 0, left: 0, minWidth: 258 }}>
					{showOverlay && <Overlay onClose={() => setShowOverlay(false)} />}
				</div>
				<div
					style={{
						width: 258,
						color: hcHover ? "#8F85FF" : "#C6C6C6",
						fontSize: 20,
						fontFamily: "Space Mono, monospace",
						fontWeight: 400,
						textTransform: "uppercase",
						lineHeight: "24px",
						wordWrap: "break-word",
						cursor: "pointer",
						transition: "color 0.15s",
					}}
					onClick={() => setShowOverlay((prev) => !prev)}
					onMouseEnter={() => setHcHover(true)}
					onMouseLeave={() => setHcHover(false)}
				>
					[human centric ai]
				</div>
				<div
					style={{
						width: 258,
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "flex-end",
						gap: 13,
						display: "inline-flex",
					}}
				>
					<div
						style={{
							alignSelf: "stretch",
							textAlign: "right",
							color: "#C6C6C6",
							fontSize: 20,
							fontFamily: "Space Mono, monospace",
							fontWeight: 400,
							textTransform: "uppercase",
							lineHeight: "24px",
							wordWrap: "break-word",
						}}
					>
						[coe]
					</div>
					<div
						style={{
							alignSelf: "stretch",
							textAlign: "right",
							color: "#8F85FF",
							fontSize: 20,
							fontFamily: "Space Mono, monospace",
							fontWeight: 400,
							textTransform: "uppercase",
							lineHeight: "24px",
							wordWrap: "break-word",
						}}
					>
						&gt;_contact
					</div>
				</div>
			</div>
			{/* Add margin-top to everything below the top bar */}
			<div style={{ width: '100%', marginTop: 120 }}>
				{/* Hero Section with focus points and custom cursor */}
				<section
					className="flex flex-col items-center justify-center w-full mt-[-40px] mb-16 relative"
					style={{
						cursor: isHovering 
							? `url('/cursor-0.svg') 16 16, pointer` 
							: `url('/cursor-${cursorIndex}.svg') 16 16, auto`,
						}}
					onClick={handleHeroBlankClick}
				>
					<div
						id="hero-section"
						style={{
							position: "relative",
							width: 980, // increased from 840
							height: 940, // increased from 800
							top: -40,
						}}
					>
						<Image
							src="/transformer.png"
							alt="Transformer Hero"
							width={980} // increased from 840
							height={980} // increased from 840
							style={{ objectFit: "contain", width: 980, height: 940 }} // increased from 840x800
							priority
						/>
						{focusData.map((f) => (
							<FocusPoint
								key={f.id}
								{...f}
								id={f.id}
								setIsHovering={setIsHovering}
							/>
						))}
						{/* Animated SVG line */}
						<svg
							width="877"
							height="391"
							viewBox="0 0 877 391"
							fill="none"
							style={{
								position: "absolute",
								left: 90,
								top: 650, // moved down from 450 to 650
								zIndex: 1,
								pointerEvents: "none",
							}}
						>
							<path
								d="M1 0V172.5C1 183.546 9.9543 192.5 21 192.5H350C361 192.5 370 201.454 370 212.5V370.5" // shortened horizontal line to x=350
								stroke="#968CFE"
								strokeWidth="1.5"
								strokeDasharray={totalLength}
								strokeDashoffset={totalLength * (1 - lineProgress)}
								ref={lineRef}
								style={{
									transition: "stroke-dashoffset 0.2s linear",
								}}
							/>
						</svg>
					</div>
				</section>

				{/* What we do section - centered, not full width, new style */}
				<div
					id="what-we-do-section"
					style={{
						width: '86vw',
						maxWidth: 1327,
						height: 790, // 2/3 of 1185
						paddingTop: 1,
						paddingBottom: 1,
						background: '#E0E0E0', // match SectionFrame
						border: '2px solid #000000', // match SectionFrame
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: 10,
						margin: '40px auto 0 auto', // changed from negative to positive margin
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							height: 30,
							display: 'flex',
							alignItems: 'center',
							background: '#CCCCCC',
							borderBottom: '2px solid #000000',
							position: 'relative',
						}}
					>
						{/* Left lines fill available space */}
						<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
						</div>
						{/* Vertical divider */}
						<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
						{/* Title */}
						<div
							style={{
								color: '#000',
								fontSize: 20,
								fontFamily: 'Space Mono, monospace',
								fontWeight: 400,
								textTransform: 'uppercase',
								letterSpacing: 1,
								textAlign: 'center',
								// Add padding to the header to prevent the title from overlapping the border
								padding: '0 24px',
								// Add zIndex to the header to ensure it sits above the border
								zIndex: 1,
								border: 'none',
							}}
						>
							What we do?
						</div>
						{/* Vertical divider */}
						<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
						{/* Right lines fill available space */}
						<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
						</div>
					</div>
					{/* Draggable Project Frames - now inside the What we do section */}
					<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 80 }}>
						<DraggableProjects />
					</div>
				</div>

				{/* Animated SVG line */}
				<SectionLine
					lineProgress={lineProgress1}
					totalLength={totalLength}
					path="M1 0V172.5C1 183.546 9.9543 192.5 21 192.5H350C361 192.5 370 201.454 370 212.5V370.5"
					style={{ position: 'absolute', left: 190, top: 863, zIndex: 1, pointerEvents: 'none' }}
					strokeWidth={2}
				/>

				{/* Gap and connector: What we do → Section 2 */}
				<div style={{ width: '100%', height: 320, position: 'relative' }}>
					<SectionConnector fromId="what-we-do-section" toId="section-2" lineProgress={lineProgress2} totalLength={totalLength} strokeWidth={4} />
				</div>
				{/* Section 2 */}
				<div id="section-2">
					<SectionFrame title="Section 2" />
				</div>
				<div style={{ width: 2, height: 220, position: 'relative' }}>
					<SectionConnector fromId="section-2" toId="section-3" lineProgress={lineProgress3} totalLength={totalLength} strokeWidth={2} curve={0} />
				</div>
				{/* Section 3 */}
				<div id="section-3">
					<SectionFrame title="Section 3" />
				</div>
				<footer
					style={{
						background: "#000",
						color: "#fff",
						height: 320,
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 24,
						fontWeight: 500,
						letterSpacing: 1,
						marginTop: 120, // Added margin on top of the footer
					}}
				>
					<div>Footer</div>
				</footer>
			</div>
		</div>
	);
}

// DraggableProjects component for three draggable frames
function DraggableProjects() {
	const initialPositions = [
		{ x: 60, y: 80 },    // Project 1: top left
		{ x: 220, y: 120 }, // Project 2: upper middle, overlaps 1
		{ x: 340, y: 200 }, // Project 3: center, overlaps 2
		{ x: 100, y: 320 }, // Project 4: lower left, not far right
	];
	const [positions, setPositions] = useState(initialPositions);
	const [dragging, setDragging] = useState([-1, -1, -1, -1]);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const handleMouseDown = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
		setDragging([idx, e.clientX, e.clientY]);
		setOffset({
			x: e.clientX - positions[idx].x,
			y: e.clientY - positions[idx].y,
		});
		document.body.style.userSelect = "none";
	};
	const handleMouseUp = () => {
		setDragging([-1, -1, -1, -1]);
		document.body.style.userSelect = "auto";
	};
	const handleMouseMove = (e: MouseEvent) => {
		if (dragging[0] !== -1) {
			const idx = dragging[0];
			const newPositions = [...positions];
			newPositions[idx] = {
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			};
			setPositions(newPositions);
		}
	};
	useEffect(() => {
		if (dragging[0] !== -1) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		} else {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		}
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	});
	const projects = [
		"PROJECT NAME 1",
		"PROJECT NAME 2",
		"PROJECT NAME 3",
		"PROJECT NAME 4",
	];
	// 16:9 ratio, smaller (x0.8), less structured layout
	const frameW = 607 * 0.8; // ~486
	const frameH = frameW * 9 / 16; // 16:9 ratio
	const defaultOffsets = [
		{ x: 60, y: 80 },    // Project 1: top left
		{ x: 220, y: 120 },  // Project 2: upper middle, overlaps 1
		{ x: 340, y: 200 },  // Project 3: center, overlaps 2
		{ x: 100, y: 320 },  // Project 4: lower left, not far right
	];
	return (
		<div style={{ position: "relative", width: 900, height: 400 }}>
			{projects.map((name, idx) => (
				<div
					key={name}
					style={{
						position: "absolute",
						left: positions[idx]?.x ?? defaultOffsets[idx].x,
						top: positions[idx]?.y ?? defaultOffsets[idx].y,
						cursor: "grab",
						zIndex: dragging[0] === idx ? 10 : 1,
					}}
					onMouseDown={e => handleMouseDown(idx, e)}
				>
					<div style={{width: frameW, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex', fontFamily: 'Space Mono, monospace'}}>
						<div style={{height: 34 * 0.8, paddingLeft: 12 * 0.8, paddingRight: 12 * 0.8, paddingTop: 6 * 0.8, paddingBottom: 6 * 0.8, background: '#5241FF', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
							<div style={{color: 'white', fontSize: 14, fontFamily: 'Space Mono, monospace', fontWeight: '400', textTransform: 'uppercase', lineHeight: '18px', wordWrap: 'break-word'}}>{name}</div>
						</div>
						<div style={{alignSelf: 'stretch', height: frameH, position: 'relative', border: '1px #5241FF solid'}} />
					</div>
				</div>
			))}
		</div>
	);
}

// SectionLine component for animated lines between sections
function SectionLine({ lineProgress, totalLength, path, style, strokeWidth = 2 }: { lineProgress: number; totalLength: number; path: string; style?: React.CSSProperties; strokeWidth?: number }) {
	const lineRef = useRef<SVGPathElement>(null);
	return (
		<svg
			width="877"
			height="491" // increased from 391 to 491
			viewBox="0 0 877 491" // match new height
			fill="none"
			style={style}
		>
			<path
				d={path}
				stroke="#968CFE"
				strokeWidth={strokeWidth}
				strokeDasharray={totalLength}
				strokeDashoffset={totalLength * (1 - lineProgress)}
				ref={lineRef}
				style={{
					transition: "stroke-dashoffset 0.2s linear",
				}}
			/>
		</svg>
	);
}

// SectionConnector component for dynamic lines between sections
function SectionConnector({
  fromId,
  toId,
  lineProgress,
  totalLength,
  curve = 0.5,
  strokeWidth = 2, // default to 2, can be overridden
}: {
  fromId: string;
  toId: string;
  lineProgress: number;
  totalLength: number;
  curve?: number;
  strokeWidth?: number;
}) {
  const gapRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  useLayoutEffect(() => {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    const gap = gapRef.current;
    if (from && to && gap) {
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      const gapRect = gap.getBoundingClientRect();
      // Start at bottom center of from, end at top center of to, both relative to gap
      setCoords({
        x1: fromRect.left + fromRect.width / 2 - gapRect.left,
        y1: 0,
        x2: toRect.left + toRect.width / 2 - gapRect.left,
        y2: gapRect.height,
      });
    }
  }, [fromId, toId]);
  if (!coords) return <div ref={gapRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
  const width = Math.max(Math.abs(coords.x2 - coords.x1), 1);
  const height = Math.max(Math.abs(coords.y2 - coords.y1), 1);
  const left = Math.min(coords.x1, coords.x2);
  // Control point for quadratic curve
  const cx = (coords.x1 + coords.x2) / 2;
  const cy = height * curve;
  return (
    <div ref={gapRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", left, top: 0, pointerEvents: "none", zIndex: 2 }}
      >
        <path
          d={`M${coords.x1 < coords.x2 ? 0 : width},0 Q${cx - left},${cy} ${coords.x1 < coords.x2 ? width : 0},${height}`}
          stroke="#968CFE"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength * (1 - lineProgress)}
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
    </div>
  );
}

// SectionFrame component for individual section frames
function SectionFrame({ title }: { title: string }) {
	return (
		<div
			style={{
				width: '86vw',
				maxWidth: 1327,
				height: 790, // 2/3 of 1185
				paddingTop: 1,
				paddingBottom: 1,
				background: '#E0E0E0',
				border: '2px solid #000000',
				// Restore bottom border for the frame
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center',
				gap: 10,
				margin: '0 auto',
				position: 'relative',
			}}
		>
			<div
				style={{
					width: '100%',
					height: 30,
					display: 'flex',
					alignItems: 'center',
					background: '#CCCCCC',
					// Remove borderTop from header to avoid double border
					borderTop: 'none',
					// Add a single border under the gray bar (header)
					borderBottom: '2px solid #000000',
					position: 'relative',
				}}
			>
				{/* Left lines fill available space */}
				<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
				</div>
				{/* Vertical divider */}
				<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
				{/* Title */}
				<div
					style={{
						color: '#000',
						fontSize: 20,
						fontFamily: 'Space Mono, monospace',
						fontWeight: 'bold',
						textTransform: 'uppercase',
						letterSpacing: 1,
						textAlign: 'center',
						// Add padding to the header to prevent the title from overlapping the border
						padding: '0 24px',
						// Add zIndex to the header to ensure it sits above the border
						zIndex: 1,
						border: 'none',
					}}
				>
					{title}
				</div>
				{/* Vertical divider */}
				<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
				{/* Right lines fill available space */}
				<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
				</div>
			</div>
		</div>
	);
}
