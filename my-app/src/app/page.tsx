"use client";

import Image from "next/image";
import { useState, CSSProperties } from "react";

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
		box: {
			title: "output",
			desc: "so here is the short explanation of what we mean by output",
		},
	},
];

function FocusPoint({ img, width, height, style, box }: FocusPointProps) {
	const [hover, setHover] = useState(false);
	return (
		<div
			style={{ ...style, cursor: `url('/cursor-0.svg'), pointer` }}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
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
						<FocusPoint key={f.id} {...f} />
					))}
					{/* Line-1: Connect focus-1 to What we do section using SVG from public */}
					<Image
						src="/line-1.svg"
						alt="Line from focus-1 to What we do"
						width={879}
						height={391}
						style={{
							position: "absolute",
							left: 90, // adjust to match focus-1 center
							top: 500, // adjust to match focus-1 bottom
							zIndex: 1,
							pointerEvents: "none",
						}}
						priority
					/>
				</div>
			</section>

			{/* What we do section - centered, not full width, new style */}
			<div
				style={{
					width: 1327,
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
			</div>
			{/* ...add more content here for the rest of the page... */}
		</div>
	);
}
