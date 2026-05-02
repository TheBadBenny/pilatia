interface OrganicShapeProps {
  variant?: "sage" | "terra" | "rose";
  className?: string;
  opacity?: number;
}

const SHAPES = [
  "M421,317.5Q380,385,310,419Q240,453,170,419Q100,385,82,310Q64,235,124,180Q184,125,250,100Q316,75,380,135Q444,195,432.5,272.5Q421,350,421,317.5Z",
  "M425,310Q400,370,340,410Q280,450,200,432Q120,414,90,338Q60,262,98,196Q136,130,210,108Q284,86,355,128Q426,170,440,235Q454,300,425,310Z",
  "M410,330Q360,380,300,410Q240,440,180,410Q120,380,100,310Q80,240,130,190Q180,140,250,110Q320,80,380,140Q440,200,425,265Q410,330,410,330Z",
];

export function OrganicShape({
  variant = "sage",
  className = "",
  opacity = 0.22,
}: OrganicShapeProps) {
  const fill = `var(--color-${variant})`;
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={`organic-shape pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path fill={fill} opacity={opacity} d={SHAPES[0]}>
        <animate
          attributeName="d"
          dur="11s"
          repeatCount="indefinite"
          values={`${SHAPES[0]};${SHAPES[1]};${SHAPES[2]};${SHAPES[0]}`}
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
        />
      </path>
    </svg>
  );
}
