"use client";

import Image from "next/image";
import { useEffect, useRef, useState, CSSProperties } from "react";

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
			title: "output layer", // changed from 'input' to 'output'
			desc: "Impactful outcomes made for humans, powered by AI", // changed to match title
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
			title: "middle layer",
			desc: "Values are blended in creative transformation",
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
			title: "input layer", // changed from 'output' to 'input'
			desc: "Bold ideas, tech fire, and many angles", // changed to match title
		},
	},
];

function FocusPoint({ img, width, height, style, box, target, id, setIsHovering }: FocusPointProps & { target: string; id: number; setIsHovering: (v: boolean) => void }) {
	const [hover, setHover] = useState(false);
    // Blinking logic: disappear for 0.1s, visible for the rest of the interval
    const [blink, setBlink] = useState(true);
    useEffect(() => {
        let visibleDuration = 3000;
        const blinkDuration = 100;
        if (id === 2) visibleDuration = 8000;
        if (id === 3) visibleDuration = 8000;
        let timeout: NodeJS.Timeout;
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
        const interval = setInterval(startBlinkCycle, visibleDuration);
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
            <Image src="/close.svg" alt="close" width={16} height={16} />
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
            alignItems: "flex-start", // center content
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
            hi there!
          </div>
          <div
            style={{
              width: 264,
              color: "black",
              fontSize: 14,
              fontFamily: "Space Mono, monospace",
              fontWeight: 400,
              textTransform: "none",
              lineHeight: "18px",
              wordWrap: "break-word",
              marginBottom: 12,
            }}
          >
            Welcome to the Human centered AI team. We are hybrid thinkers who blend design and data to create human-centered AI (that actually works). <br/><br/>Just like the transformer architecture, we work in layers — adding clarity, creativity, and structure to turn complex input into smart, human-centered output. Get to know us below.
          </div>
          {/* Add logo-dot.svg under the text with motion */}
          <div className="logo-dot-frame" style={{ marginTop: 8, marginBottom: 8 }}>
            <Image src="/logo-dot.svg" alt="logo dot" width={32} height={32} className="logo-dot-anim" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
	// For SVG grow effect
	const totalLength = 1200; // Approximate path length, adjust as needed
	const [lineProgress] = useState(0);
	const lineRef = useRef<SVGPathElement>(null);

	// Cursor logic
	const [cursorIndex, setCursorIndex] = useState(1); // 1-5 for blank, 0 for hover
	const [isHovering, setIsHovering] = useState(false);

	// Cursor position and state
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	// Add state to store placed cursors in the hero section
	const [placedCursors, setPlacedCursors] = useState<{x: number, y: number, index: number}[]>([]);

	// Click on blank space to place a cursor image (only in hero section)
	const handleHeroBlankClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLElement).closest('.focus-point')) return;
		if (!isHovering) {
			const rect = (e.target as HTMLElement).getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			setPlacedCursors(prev => [...prev, { x, y, index: cursorIndex }]);
			// Loop cursorIndex from 1 to 5
			setCursorIndex(prev => prev % 5 + 1);
		}
	};

	useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};
		document.addEventListener('mousemove', updateCursorPosition);
		return () => document.removeEventListener('mousemove', updateCursorPosition);
	}, []);

	const [showOverlay, setShowOverlay] = useState(true);
	const [hcHover, setHcHover] = useState(false);

	return (
		<div className="flex flex-col items-center min-h-screen bg-background text-foreground font-mono" style={{ cursor: 'none' }}>
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
						coe
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
						cursor: "pointer",
					}}
					onClick={() => window.open("mailto:abdo.hassan@decathlon.com", "_blank")}
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
					{/* Render placed cursor images */}
					{placedCursors.map((c, i) => (
						<Image
							key={i}
							src={`/cursor-${c.index}.svg`}
							alt={`cursor-${c.index}`}
							width={110}
							height={110}
							style={{
								position: 'absolute',
								left: c.x - 60, // center the larger image (120/2)
								top: c.y - 60,
								pointerEvents: 'none',
								zIndex: 10,
							}}
						/>
					))}
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
							draggable={false}
							onContextMenu={e => e.preventDefault()}
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
								fontSize: 14,
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
							Projects
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

				{/* Gap and connector: What we do → Section 2 */}
				<div style={{ width: '100%', height: 320, position: 'relative' }}>
				</div>
				{/* Section 2 */}
				<div id="section-2">
					<SectionFrame title="OUR VALUES" cursorPosition={cursorPosition} />
				</div>
				<div style={{ width: 2, height: 220, position: 'relative' }}>
				</div>
				{/* Section 3 */}
				<div id="section-3" style={{ marginBottom: 360 }}>
					<SectionFrame title="PEOPLE" />
				</div>
				<Footer />
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
  { name: "Labeling Platform", path: "/projects/project-one" },
  { name: "Generative UI PoC", path: "/projects/project-two" },
  { name: "GenAI Search", path: "/projects/project-three" },
  { name: "Auto-complete", path: "/projects/project-four" },
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
			{projects.map((project, idx) => (
				<div
					key={project.name}
					style={{
						position: "absolute",
						left: positions[idx]?.x ?? defaultOffsets[idx].x,
						top: positions[idx]?.y ?? defaultOffsets[idx].y,
						cursor: "grab",
						zIndex: dragging[0] === idx ? 10 : 1,
					}}
					onMouseDown={e => handleMouseDown(idx, e)}
				>
					<div
						style={{
							width: frameW,
							flexDirection: 'column',
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							display: 'inline-flex',
							fontFamily: 'Space Mono, monospace'
						}}
					>
						<div
							style={{
								height: 34 * 0.8,
								paddingLeft: 12 * 0.8,
								paddingRight: 12 * 0.8,
								paddingTop: 6 * 0.8,
								paddingBottom: 6 * 0.8,
								background: '#5241FF',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 10,
								display: 'inline-flex',
								cursor: 'pointer',
							}}
							onClick={e => {
								e.stopPropagation();
								window.open(project.path, '_blank');
							}}
						>
							<div
								style={{
									color: 'white',
									fontSize: 14,
									fontFamily: 'Space Mono, monospace',
									fontWeight: '400',
									textTransform: 'uppercase',
									lineHeight: '18px',
									wordWrap: 'break-word',
									display: 'flex',
									alignItems: 'center',
									gap: 6,
								}}
							>
								{project.name}
								<Image src="/outward.svg" alt="outward arrow" width={16} height={16} style={{ marginLeft: 4, marginBottom: 2 }} />
							</div>
						</div>
						<div style={{ alignSelf: 'stretch', height: frameH, position: 'relative', border: '1px #5241FF solid', overflow: 'hidden', background: '#fff' }}>
							{project.name === "GenAI Search" ? (
								<Image src="/gen-ai-search-3.png" alt="project preview" fill style={{ objectFit: 'cover', pointerEvents: 'none' }} />
							) : project.name === "Generative UI PoC" ? (
								<Image src="/gen-ui-3.png" alt="project preview" fill style={{ objectFit: 'cover', pointerEvents: 'none' }} />
							) : project.name === "Labeling Platform" ? (
								<Image src="/label-1.png" alt="project preview" fill style={{ objectFit: 'cover', aspectRatio: '16/9', pointerEvents: 'none' }} />
							) : (
								<Image src="/placeholder.jpg" alt="project preview" fill style={{ objectFit: 'cover', pointerEvents: 'none' }} />
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

// SectionFrame component for individual section frames
function SectionFrame({ title, cursorPosition: globalCursorPosition }: { title: string, cursorPosition?: { x: number, y: number } }) {
	// State for reticule cursor - moved to top level
	const [valuesHovering, setValuesHovering] = useState(false);
	const [targetDimensions, setTargetDimensions] = useState({ width: 40, height: 40 });
	const [cursorPosition, setCursorPosition] = useState(globalCursorPosition || { x: 0, y: 0 });
	const [blockRect, setBlockRect] = useState<DOMRect | null>(null);
	const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [hovered, setHovered] = useState<number|null>(null);

	// Refs
	const cursorPosRef = useRef({ x: 0, y: 0 });
	const animationFrame = useRef<number | null>(null);

	useEffect(() => {
		if (title !== "OUR VALUES") return;
		if (globalCursorPosition) {
			setCursorPosition(globalCursorPosition);
			return;
		}
		// fallback for local tracking if not provided
		const handleMouseMove = (e: MouseEvent) => {
			cursorPosRef.current = { x: e.clientX, y: e.clientY };
			if (blockRect) {
				setMouseOffset({
					x: e.clientX - blockRect.left,
					y: e.clientY - blockRect.top,
				});
			}
			if (!animationFrame.current) {
				animationFrame.current = requestAnimationFrame(() => {
					setCursorPosition({ ...cursorPosRef.current });
					animationFrame.current = null;
				});
			}
		};
		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
		};
	}, [title, blockRect, globalCursorPosition]);

	const handleValueHover = (entering: boolean, element?: HTMLElement) => {
		setValuesHovering(entering);
		if (entering && element) {
			const rect = element.getBoundingClientRect();
			setBlockRect(rect);
			setTargetDimensions({
				width: rect.width,
				height: rect.height
			});
		} else {
			setBlockRect(null);
			setTargetDimensions({ width: 40, height: 40 });
		}
	};

	if (title === "OUR VALUES") {
		const values = [
			{ icon: "/icon-1.svg", keyword: "Future-proofing", statement: "Future-oriented by design, we build ideas that get today ready for tomorrow." },
			{ icon: "/icon-2.svg", keyword: "Responsibility", statement: "We turn wild ideas into structured data and make responsable AI systems that actually get you." },
			{ icon: "/icon-3.svg", keyword: "Participation", statement: "Design is a conversation — we listen, co-create, and keep human in the loop." },
			{ icon: "/icon-4.svg", keyword: "Tech x Design", statement: "Designers + techies = magic. We blend skills to create simple, useful tools." },
			{ icon: "/icon-5.svg", keyword: "Playfulness", statement: "We keep curiosity loud and fun alive, whether we’re prototyping or hacking together ideas." },
		];

		return (
			<>
				{/* Custom Reticule Cursor */}
				{valuesHovering && blockRect ? (
					<div
						className="reticule targeting"
						style={{
							position: 'fixed',
							left: blockRect.left,
							top: blockRect.top,
							pointerEvents: 'none',
							zIndex: 9999,
							width: blockRect.width + 'px',
							height: blockRect.height + 'px',
							transition: 'all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
							borderRadius: '12px',
						}}
					>
						{/* Calculate a single offset for all corners */}
						{(() => {
							const maxOffset = 6; // px, subtle
							const centerX = blockRect.width / 2;
							const centerY = blockRect.height / 2;
							const dx = (mouseOffset.x - centerX) / centerX; // -1 to 1
							const dy = (mouseOffset.y - centerY) / centerY; // -1 to 1
							const offsetX = dx * maxOffset;
							const offsetY = dy * maxOffset;
							return [...Array(8)].map((_, i) => {
								const cornerLength = Math.min(blockRect.width, blockRect.height) * 0.15;
								const cornerThickness = 2;
								return (
									<div
										key={i}
										className="corner"
										style={{
											position: 'absolute',
											background: '#5241FF',
											boxShadow: '0 0 8px #5241FF',
											opacity: 0.9,
											transition: 'none',
											transform: `translate(${offsetX}px, ${offsetY}px)`,
											...(i % 2 === 0 ? {
												width: cornerThickness + 'px',
												height: cornerLength + 'px',
												[i < 4 ? 'top' : 'bottom']: '0px',
												[i === 0 || i === 4 ? 'left' : 'right']: '0px'
											} : {
												width: cornerLength + 'px',
												height: cornerThickness + 'px',
												[i < 4 ? 'top' : 'bottom']: '0px',
												[i === 1 || i === 5 ? 'left' : 'right']: '0px'
											})
										}}
									/>
								);
							});
						})()}
						{/* Center dot follows mouse within block, always 4x4px */}
						{(typeof mouseOffset.x === 'number' && typeof mouseOffset.y === 'number' && blockRect) && (
  <div
    style={{
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: '#5241FF',
      borderRadius: '50%',
      top: Math.max(0, Math.min(mouseOffset.y - 2, blockRect.height - 4)),
      left: Math.max(0, Math.min(mouseOffset.x - 2, blockRect.width - 4)),
      boxShadow: '0 0 6px #5241FF',
      opacity: 0.8,
      pointerEvents: 'none',
    }}
  />
)}
					</div>
				) : (
					// Default spinning reticule (centered on mouse, circular)
					<div
						className="reticule spinning"
						style={{
							position: 'fixed',
							left: cursorPosition.x,
							top: cursorPosition.y,
							transform: 'translate(-50%, -50%)',
							pointerEvents: 'none',
							zIndex: 9999,
							width: targetDimensions.width + 'px',
							height: targetDimensions.height + 'px',
							transition: 'all 0.08s cubic-bezier(0.4, 0, 0.2, 1)',
							borderRadius: '50%',
						}}
					>
						{/* Corner brackets */}
						{[...Array(8)].map((_, i) => {
							const cornerLength = Math.min(targetDimensions.width, targetDimensions.height) * 0.15;
							const cornerThickness = 2;
							return (
								<div
									key={i}
									className="corner"
									style={{
										position: 'absolute',
										background: '#5241FF',
										boxShadow: '0 0 8px #5241FF',
										opacity: 0.9,
										transition: 'all 0.1s ease',
										...(i % 2 === 0 ? {
											width: cornerThickness + 'px',
											height: cornerLength + 'px',
											[i < 4 ? 'top' : 'bottom']: '0px',
											[i === 0 || i === 4 ? 'left' : 'right']: '0px'
										} : {
											width: cornerLength + 'px',
											height: cornerThickness + 'px',
											[i < 4 ? 'top' : 'bottom']: '0px',
											[i === 1 || i === 5 ? 'left' : 'right']: '0px'
										})
									}}
								/>
							);
						})}
						{/* Center dot always in center */}
						<div
							style={{
								position: 'absolute',
								width: '4px',
								height: '4px',
								background: '#5241FF',
								borderRadius: '50%',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								boxShadow: '0 0 6px #5241FF',
								opacity: 0.8,
							}}
						/>
					</div>
				)}
				<div
					style={{
						width: '86vw',
						maxWidth: 1327,
						height: 900,
						paddingTop: 1,
						paddingBottom: 1,
						background: '#E0E0E0',
						border: '2px solid #000000',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
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
							borderBottom: '2px solid #000000',
							position: 'relative',
						}}
					>
						<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
						</div>
						<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
						<div
							style={{
								color: '#000',
								fontSize: 14,
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
							{title.toUpperCase()}
						</div>
						<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
						<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
							<div style={{ width: '100%', height: 2, background: '#000' }} />
						</div>
					</div>
					{/* Five value blocks with hover handlers */}
					<div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 40, cursor: valuesHovering ? 'none' : 'auto' }}>
						{values.map((v, i) => (
							<div
								key={i}
								style={{
									display: 'flex',
									alignItems: 'center',
									width: 520,
									borderRadius: 12,
									padding: '18px 32px',
									gap: 32,
									marginBottom: i === values.length - 1 ? 48 : 0,
									backgroundColor: 'transparent',
									border: 'none',
									transition: 'all 0.3s ease',
									cursor: valuesHovering ? 'none' : 'pointer',
								}}
								onMouseEnter={e => { handleValueHover(true, e.currentTarget); }}
								onMouseLeave={() => handleValueHover(false)}
								onMouseMove={e => {
									const rect = e.currentTarget.getBoundingClientRect();
									setMouseOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
								}}
								onMouseOver={e => e.stopPropagation()}
							>
								<Image src={v.icon} alt="icon" width={100} height={100} style={{ flexShrink: 0 }} />
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
									<div style={{ fontSize: 20, fontWeight: 400, color: '#000', marginBottom: 4, textTransform: 'uppercase', fontFamily: 'Space Mono, monospace' }}>{v.keyword}</div>
									<div style={{ fontSize: 14, color: '#000', maxWidth: 380, fontFamily: 'Space Mono, monospace' }}>{v.statement}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CSS for spinning animation */}
				<style jsx>{`
					.reticule.spinning {
						animation: spin 4s linear infinite;
					}

					@keyframes spin {
						from { transform: translate(-50%, -50%) rotate(0deg); }
						to { transform: translate(-50%, -50%) rotate(360deg); }
					}

					.value-block:hover {
						background-color: rgba(82, 65, 255, 0.1) !important;
						border-color: #5241FF !important;
						box-shadow: 0 0 20px rgba(82, 65, 255, 0.3);
						transform: translateY(-2px);
					}
				`}</style>
			</>
		);
	}

	if (title === "PEOPLE") {
		const people = [
			{
				name: "Abdo HASSAN",
				role: "Human-Centric AI Manager",
				bio: "A SENTENCE BIO, LIKE THE BACKGROUND, INTEREST, WHAT PET YOU LIKE TO GET AND SO ON",
				img: "/profile-a.png",
			},
			{ 
				name: "Qiulin JOLLY", 
				role: "Creative Technologist", 
				bio: "A SENTENCE BIO, LIKE THE BACKGROUND, INTEREST, WHAT PET YOU LIKE TO GET AND SO ON",
				img: "/profile-q.png" 
			},
			{ 
				name: "Chiara DE NIGRIS ", 
				role: "Creative Technologist", 
				bio: "A SENTENCE BIO, LIKE THE BACKGROUND, INTEREST, WHAT PET YOU LIKE TO GET AND SO ON",
				img: "/profile-c.png" 
			},
			{ 
				name: "Jiaxin ZHANG", 
				role: "Creative Technologist", 
				bio: "A SENTENCE BIO, LIKE THE BACKGROUND, INTEREST, WHAT PET YOU LIKE TO GET AND SO ON",
				img: "/profile-j.png" 
			},
			{ 
				name: "Henri VALETTE", 
				role: "Software Developer Engineer", 
				bio: "A SENTENCE BIO, LIKE THE BACKGROUND, INTEREST, WHAT PET YOU LIKE TO GET AND SO ON",
				img: "/profile-h.png" 
			},
		];
		
		// Define consistent total height for each card
		const TOTAL_CARD_HEIGHT = 340;
		const IMAGE_HEIGHT_DEFAULT = 200;
		const IMAGE_HEIGHT_HOVER = 130;
		const INFO_HEIGHT_DEFAULT = TOTAL_CARD_HEIGHT - IMAGE_HEIGHT_DEFAULT;
		const INFO_HEIGHT_HOVER = TOTAL_CARD_HEIGHT - IMAGE_HEIGHT_HOVER;
		
		return (
			<div
				style={{
					width: '86vw',
					maxWidth: 1327,
					minHeight: 'auto',
					background: '#E0E0E0',
					border: '2px solid #000',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					margin: '80px auto 0 auto',
					position: 'relative',
				}}
			>
				{/* Header */}
				<div
					style={{
						width: '100%',
						height: 30,
						display: 'flex',
						alignItems: 'center',
						background: '#CCCCCC',
						borderBottom: '2px solid #000',
						position: 'relative',
					}}
				>
					<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
						<div style={{ width: '100%', height: 2, background: '#000' }} />
						<div style={{ width: '100%', height: 2, background: '#000' }} />
						<div style={{ width: '100%', height: 2, background: '#000' }} />
						<div style={{ width: '100%', height: 2, background: '#000' }} />
					</div>
					<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
					<div
						style={{
							color: '#000',
							fontSize: 14,
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
						{title.toUpperCase()}
					</div>
					<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
					<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
						<div style={{ width: '100%', height: 2, background: '#000' }} />
						<div style={{ width: '100%', height: 2, background: '#000' }} />
						<div style={{ width: '100%', height: 2, background: '#000' }} />
						<div style={{ width: '100%', height: 2, background: '#000' }} />
					</div>
				</div>
				{/* People cards container */}
				<div style={{ 
					display: 'flex', 
					justifyContent: 'stretch', 
					alignItems: 'flex-start',
					width: '100%', 
					height: TOTAL_CARD_HEIGHT,
					paddingTop: 0,
					paddingBottom: 0,
				}}>
					{people.map((p, i) => {
						const isHover = hovered === i;
						return (
							<div
								key={i}
								onMouseEnter={() => setHovered(i)}
								onMouseLeave={() => setHovered(null)}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'stretch',
									flex: 1,
									height: TOTAL_CARD_HEIGHT,
									background: '#fff',
									borderRadius: 0,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								{/* White info area - now at top */}
								<div
									style={{
										background: '#c6c6c6',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-start',
										alignItems: 'flex-start',
										padding: '18px 16px 32px 16px', // increased bottom padding for more space
										height: isHover ? INFO_HEIGHT_HOVER : INFO_HEIGHT_DEFAULT,
										transition: 'height 0.3s ease',
										border: 'none',
										order: 1,
									}}
								>
									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 8, fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 400, color: '#000', marginBottom: 8 }}>
										<span>{p.name}</span>
										<span style={{ fontSize: 12, color: '#444', fontWeight: 300 }}>{p.role}</span>
									</div>
									{isHover && p.bio && (
										<div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#222', marginTop: 8, lineHeight: 1.4 }}>{p.bio}</div>
									)}
								</div>
								{/* Image area - now at bottom */}
								<div
									style={{
										width: '100%',
										height: isHover ? IMAGE_HEIGHT_HOVER : IMAGE_HEIGHT_DEFAULT,
										backgroundImage: p.img ? `url('${p.img}')` : 'repeating-linear-gradient(45deg, #eee 0 16px, #ccc 16px 32px)',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										transition: 'height 0.3s ease',
										order: 2,
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	// Default content for other sections
	return (
		<div
			style={{
				width: '86vw',
				maxWidth: 1327,
				height: 900,
				paddingTop: 1,
				paddingBottom: 1,
				background: '#E0E0E0',
				border: '2px solid #000000',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
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
					borderBottom: '2px solid #000000',
					position: 'relative',
				}}
			>
				<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
				</div>
				<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
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
					{title.toUpperCase()}
				</div>
				<div style={{ width: 2, height: '70%', background: '#000', margin: '0 8px' }} />
				<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
					<div style={{ width: '100%', height: 2, background: '#000' }} />
				</div>
			</div>
			<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#888', fontFamily: 'Space Mono, monospace' }}>
				Section: {title}
			</div>
		</div>
	);
}

// Footer component
function Footer() {
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
						<span style={{ fontSize: '2.8vw', fontWeight: 400, letterSpacing: -2 }}> Let&apos;s Connect! </span>
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