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
		style: { position: "absolute" as const, left: 40, top: 400, zIndex: 2 },
		target: "what-we-do-section",
		box: {
			title: "input",
			desc: "so here is the short explanation of what we mean by input",
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
			title: "output",
			desc: "so here is the short explanation of what we mean by output",
		},
	},
];

function FocusPoint({ img, width, height, style, box, target, id }: FocusPointProps & { target: string; id: number }) {
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
			style={{ ...style, cursor: `url('/cursor-0.svg'), pointer`, opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
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
									fontSize: 11.2,
									fontFamily: "Space Mono, monospace",
									fontWeight: 400,
									textTransform: "uppercase",
									lineHeight: "13.44px",
									wordWrap: "break-word",
								}}
							>
								{box.title}
							</div>
							<div
								style={{
									alignSelf: "stretch",
									color: "black",
									fontSize: 11.2,
									fontFamily: "Space Mono, monospace",
									fontWeight: 400,
									textTransform: "uppercase",
									lineHeight: "13.44px",
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

export default function Home() {
	// For SVG grow effect
	const totalLength = 1200; // Approximate path length, adjust as needed
	const [lineProgress, setLineProgress] = useState(0);
	const lineRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		function handleScroll() {
			const section3 = document.querySelectorAll('[id^="section-frame"]')[1] || document.getElementById('Section 3');
			const section3Top = section3 ? (section3 as HTMLElement).getBoundingClientRect().top + window.scrollY : 0;
			const scrollTop = window.scrollY;
			// The line should be fully completed when section 3 is reached
			let progress = 0;
			if (section3Top > 0) {
				progress = scrollTop / (section3Top - window.innerHeight / 2);
			} else {
				const docHeight = document.body.scrollHeight - window.innerHeight;
				progress = docHeight > 0 ? scrollTop / (docHeight * 0.4) : 0;
			}
			progress = Math.min(Math.max(progress, 0), 1);
			setLineProgress(progress);
		}
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="flex flex-col items-center min-h-screen bg-background text-foreground font-mono">
			{/* Responsive Top Bar */}
			<div
				className="w-full flex justify-between items-start mt-6 mb-16 px-1 sm:px-2 lg:px-4"
				style={{ maxWidth: 1382 }}
			>
				<div
					style={{
						width: 258,
						color: "#C6C6C6",
						fontSize: 20,
						fontFamily: "Space Mono, monospace",
						fontWeight: 400,
						textTransform: "uppercase",
						lineHeight: "24px",
						wordWrap: "break-word",
					}}
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
			{/* Hero Section with focus points */}
			<section
				className="flex flex-col items-center justify-center w-full mt-[-40px] mb-16 relative"
				style={{ height: 800 }}
			>
				<div
					id="hero-section"
					style={{
						position: "relative",
						width: 840,
						height: 800,
						top: -40,
					}}
				>
					<Image
						src="/transformer.png"
						alt="Transformer Hero"
						width={840}
						height={840}
						style={{ objectFit: "contain", width: 840, height: 800 }}
						priority
					/>
					{focusData.map((f) => (
						<FocusPoint key={f.id} {...f} id={f.id} />
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
							top: 520,
							zIndex: 1,
							pointerEvents: "none",
						}}
					>
						<path
							d="M1 0V192.5C1 203.546 9.9543 212.5 21 212.5H855.5C866.546 212.5 875.5 221.454 875.5 232.5V390.5"
							stroke="#968CFE"
							strokeWidth="2"
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
					width: '86vw', // Responsive width
					maxWidth: 1327,
					height: 1185,
					paddingTop: 1,
					paddingBottom: 1,
					background: "white",
					outline: "1px #C6C6C6 solid",
					outlineOffset: "-1px",
					backdropFilter: "blur(25px)",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
					gap: 10,
					display: "flex",
					margin: "0 auto",
				}}
			>
				<div
					style={{
						width: 1326,
						height: 96,
						position: "relative",
						overflow: "hidden",
						backdropFilter: "blur(25px)",
					}}
				>
					<div
						style={{
							paddingLeft: 18,
							paddingRight: 18,
							paddingTop: 8,
							paddingBottom: 8,
							left: 591,
							top: 19,
							position: "absolute",
							background: "white",
							justifyContent: "center",
							alignItems: "center",
							gap: 10,
							display: "inline-flex",
						}}
					>
						<div
							style={{
								color: "#101010",
								fontSize: 24,
								fontFamily: "Space Mono, monospace",
								fontWeight: 400,
								textTransform: "uppercase",
								lineHeight: "28.80px",
								wordWrap: "break-word",
							}}
						>
							What we do?
						</div>
					</div>
					<div
						style={{
							width: 2.74,
							height: 2.74,
							left: 6,
							top: 5,
							position: "absolute",
							background: "#101010",
						}}
					/>
					<div
						style={{
							width: 2.74,
							height: 2.74,
							left: 6,
							top: 10.48,
							position: "absolute",
							background: "#101010",
						}}
					/>
					<div
						style={{
							width: 2.74,
							height: 2.74,
							left: 6,
							top: 15.96,
							position: "absolute",
							background: "#101010",
						}}
					/>
					<div
						style={{
							width: 2.74,
							height: 2.74,
							left: 11.48,
							top: 10.48,
							position: "absolute",
							background: "#101010",
						}}
					/>
					<div
						style={{
							width: 2.74,
							height: 2.74,
							left: 11.48,
							top: 5,
							position: "absolute",
							background: "#101010",
						}}
					/>
					<div
						style={{
							width: 2.74,
							height: 2.74,
							left: 16.96,
							top: 5,
							position: "absolute",
							background: "#101010",
						}}
					/>
				</div>
				{/* Draggable Project Frames - now inside the What we do section */}
				<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 80 }}>
					<DraggableProjects />
				</div>
			</div>

			{/* Animated SVG line between sections */}
			<SectionLine lineProgress={lineProgress} totalLength={totalLength} />
			{/* Section 2 */}
			<div id="section-2">
				<SectionFrame title="Section 2" />
			</div>
			{/* Animated SVG line between sections */}
			<SectionLine lineProgress={lineProgress} totalLength={totalLength} />
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
				}}
			>
				<div>Footer</div>
			</footer>
		</div>
	);
}

// DraggableProjects component for three draggable frames
function DraggableProjects() {
	const initialPositions = [
		{ x: 0, y: 120 },
		{ x: 220, y: 180 },
		{ x: 440, y: 240 },
	];
	const [positions, setPositions] = useState(initialPositions);
	const [dragging, setDragging] = useState([-1, -1, -1]);
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
		setDragging([-1, -1, -1]);
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
	];
	return (
		<div style={{ position: "relative", width: 900, height: 400 }}>
			{projects.map((name, idx) => (
				<div
					key={name}
					style={{
						position: "absolute",
						left: positions[idx].x,
						top: positions[idx].y,
						cursor: "grab",
						zIndex: dragging[0] === idx ? 10 : 1,
					}}
					onMouseDown={e => handleMouseDown(idx, e)}
				>
					<div style={{width: 607, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex', fontFamily: 'Space Mono, monospace'}}>
						<div style={{height: 34, paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6, background: '#5241FF', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
							<div style={{color: 'white', fontSize: 20, fontFamily: 'Space Mono, monospace', fontWeight: '400', textTransform: 'uppercase', lineHeight: '24px', wordWrap: 'break-word'}}>{name}</div>
						</div>
						<div style={{alignSelf: 'stretch', height: 339, position: 'relative', border: '1px #5241FF solid'}} />
					</div>
				</div>
			))}
		</div>
	);
}

// SectionLine component for animated lines between sections
function SectionLine({ lineProgress, totalLength }: { lineProgress: number; totalLength: number }) {
	const lineRef = useRef<SVGPathElement>(null);
	return (
		<svg
			width="877"
			height="391"
			viewBox="0 0 877 391"
			fill="none"
			style={{
				position: "relative",
				
				left: 0,
				top: 0,
				zIndex: 1,
				pointerEvents: "none",
				marginTop: -1,
			}}
		>
			<path
				d="M1 0V192.5C1 203.546 9.9543 212.5 21 212.5H855.5C866.546 212.5 875.5 221.454 875.5 232.5V390.5"
				stroke="#968CFE"
				strokeWidth="2"
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

// SectionFrame component for individual section frames
function SectionFrame({ title }: { title: string }) {
	return (
		<div
			style={{
				width: '86vw', // Responsive width
				maxWidth: 1327,
				height: 1185,
				paddingTop: 1,
				paddingBottom: 1,
				background: "white",
				outline: "1px #C6C6C6 solid",
				outlineOffset: "-1px",
				backdropFilter: "blur(25px)",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "center",
				gap: 10,
				display: "flex",
				margin: "0 auto",
				position: "relative",
			}}
		>
			<div
				style={{
					width: 1326,
					height: 96,
					position: "relative",
					overflow: "hidden",
					backdropFilter: "blur(25px)",
				}}
			>
				<div
					style={{
						paddingLeft: 18,
						paddingRight: 18,
						paddingTop: 8,
						paddingBottom: 8,
						left: 591,
						top: 19,
						position: "absolute",
						background: "white",
						justifyContent: "center",
						alignItems: "center",
						gap: 10,
						display: "inline-flex",
					}}
				>
					<div
						style={{
							color: "#101010",
							fontSize: 24,
							fontFamily: "Space Mono, monospace",
							fontWeight: 400,
							textTransform: "uppercase",
							lineHeight: "28.80px",
							wordWrap: "break-word",
						}}
					>
						{title}
					</div>
				</div>
				<div
					style={{
						width: 2.74,
						height: 2.74,
						left: 6,
						top: 5,
						position: "absolute",
						background: "#101010",
					}}
				/>
				<div
					style={{
						width: 2.74,
						height: 2.74,
						left: 6,
						top: 10.48,
						position: "absolute",
						background: "#101010",
					}}
				/>
				<div
					style={{
						width: 2.74,
						height: 2.74,
						left: 6,
						top: 15.96,
						position: "absolute",
						background: "#101010",
					}}
				/>
				<div
					style={{
						width: 2.74,
						height: 2.74,
						left: 11.48,
						top: 10.48,
						position: "absolute",
						background: "#101010",
					}}
				/>
				<div
					style={{
						width: 2.74,
						height: 2.74,
						left: 11.48,
						top: 5,
						position: "absolute",
						background: "#101010",
					}}
				/>
				<div
					style={{
						width: 2.74,
						height: 2.74,
						left: 16.96,
						top: 5,
						position: "absolute",
						background: "#101010",
					}}
				/>
			</div>
		</div>
	);
}
