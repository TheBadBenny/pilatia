import { OrganicShape } from "./OrganicShape";

type Variant = "reformer" | "mat" | "barre";

interface IllustrationProps {
  variant: Variant;
  className?: string;
}

const BLOB_VARIANT: Record<Variant, "sage" | "rose" | "terra"> = {
  reformer: "sage",
  mat: "rose",
  barre: "terra",
};

export function Illustration({ variant, className = "" }: IllustrationProps) {
  return (
    <div
      className={`relative aspect-[5/3] overflow-hidden rounded-2xl border border-line bg-sand ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <OrganicShape variant={BLOB_VARIANT[variant]} opacity={0.32} />
      </div>
      {variant === "reformer" && <ReformerArt />}
      {variant === "mat" && <MatArt />}
      {variant === "barre" && <BarreArt />}
    </div>
  );
}

function ReformerArt() {
  return (
    <svg
      viewBox="0 0 400 240"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Ilustración de un reformer pilates: cama deslizante con muelles, foot-bar y cabezal"
    >
      {/* Floor reference */}
      <line
        x1="20"
        y1="205"
        x2="380"
        y2="205"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.18"
      />
      {/* Frame rails */}
      <rect
        x="55"
        y="175"
        width="290"
        height="14"
        rx="5"
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth="1.4"
      />
      <line
        x1="55"
        y1="172"
        x2="345"
        y2="172"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.45"
      />
      {/* Carriage */}
      <rect
        x="135"
        y="138"
        width="125"
        height="40"
        rx="6"
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
      />
      <line
        x1="160"
        y1="138"
        x2="160"
        y2="178"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="235"
        y1="138"
        x2="235"
        y2="178"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Headrest */}
      <rect
        x="73"
        y="130"
        width="55"
        height="10"
        rx="3"
        fill="var(--color-rose)"
      />
      {/* Springs */}
      <path
        d="M260 152 q 5 -4 10 0 q 5 4 10 0 q 5 -4 10 0 q 5 4 10 0 q 5 -4 10 0 q 5 4 10 0 q 5 -4 10 0"
        fill="none"
        stroke="var(--color-sage)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M260 165 q 5 -4 10 0 q 5 4 10 0 q 5 -4 10 0 q 5 4 10 0 q 5 -4 10 0 q 5 4 10 0 q 5 -4 10 0"
        fill="none"
        stroke="var(--color-sage)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Foot bar */}
      <rect
        x="335"
        y="118"
        width="11"
        height="68"
        rx="5"
        fill="var(--color-terra)"
      />
      <circle cx="340.5" cy="116" r="6" fill="var(--color-terra)" />
      <circle cx="340.5" cy="188" r="6" fill="var(--color-terra)" />
      {/* Person silhouette - reclined / arch position */}
      <ellipse cx="155" cy="120" rx="9" ry="10" fill="var(--color-ink)" />
      <path
        d="M165 125 Q 200 122 230 130 L 245 138 L 235 152 L 215 152 L 195 142 L 168 142 Z"
        fill="var(--color-ink)"
        opacity="0.86"
      />
      {/* Caption */}
      <text
        x="200"
        y="228"
        fontFamily="ui-serif, Georgia, serif"
        fontSize="13"
        fill="var(--color-ink-soft)"
        textAnchor="middle"
      >
        Reformer · cama deslizante con muelles ajustables
      </text>
    </svg>
  );
}

function MatArt() {
  return (
    <svg
      viewBox="0 0 400 240"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Ilustración de pilates suelo: persona en posición clásica del cien sobre esterilla"
    >
      {/* Floor */}
      <line
        x1="20"
        y1="205"
        x2="380"
        y2="205"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.18"
      />
      {/* Mat */}
      <rect
        x="80"
        y="172"
        width="240"
        height="22"
        rx="7"
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
      />
      <line
        x1="105"
        y1="178"
        x2="105"
        y2="188"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.35"
      />
      <line
        x1="295"
        y1="178"
        x2="295"
        y2="188"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* Body lying flat */}
      {/* Head */}
      <ellipse cx="118" cy="158" rx="10" ry="11" fill="var(--color-ink)" />
      {/* Torso */}
      <rect
        x="130"
        y="153"
        width="92"
        height="18"
        rx="9"
        fill="var(--color-ink)"
        opacity="0.86"
      />
      {/* Hips & legs lifted, knees over hips ("table top") */}
      <path
        d="M222 153 Q 245 153 260 138 L 268 100 Q 274 92 285 99 L 290 130 Q 290 158 268 172 L 222 172 Z"
        fill="var(--color-ink)"
        opacity="0.86"
      />
      {/* Arms parallel to mat */}
      <rect
        x="155"
        y="142"
        width="55"
        height="6"
        rx="3"
        fill="var(--color-ink)"
        opacity="0.7"
      />
      <rect
        x="155"
        y="178"
        width="55"
        height="6"
        rx="3"
        fill="var(--color-ink)"
        opacity="0.7"
      />
      {/* Accessory: small pilates ball */}
      <circle cx="46" cy="180" r="14" fill="var(--color-terra)" opacity="0.55" />
      <circle
        cx="46"
        cy="180"
        r="14"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Caption */}
      <text
        x="200"
        y="228"
        fontFamily="ui-serif, Georgia, serif"
        fontSize="13"
        fill="var(--color-ink-soft)"
        textAnchor="middle"
      >
        Suelo · trabajo con tu propio peso corporal
      </text>
    </svg>
  );
}

function BarreArt() {
  return (
    <svg
      viewBox="0 0 400 240"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Ilustración de barre: persona en plié con una mano en la barra de ballet"
    >
      {/* Mirror */}
      <rect
        x="35"
        y="30"
        width="330"
        height="170"
        rx="4"
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth="1.4"
        opacity="0.7"
      />
      <line
        x1="35"
        y1="30"
        x2="365"
        y2="30"
        stroke="var(--color-ink)"
        strokeWidth="1.4"
      />
      {/* Floor */}
      <line
        x1="20"
        y1="200"
        x2="380"
        y2="200"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.18"
      />
      {/* Barre supports */}
      <rect
        x="55"
        y="125"
        width="4"
        height="78"
        fill="var(--color-terra)"
        opacity="0.55"
      />
      <rect
        x="341"
        y="125"
        width="4"
        height="78"
        fill="var(--color-terra)"
        opacity="0.55"
      />
      {/* Barre */}
      <rect x="55" y="120" width="290" height="7" rx="3.5" fill="var(--color-terra)" />
      <circle cx="55" cy="123.5" r="6" fill="var(--color-terra)" />
      <circle cx="345" cy="123.5" r="6" fill="var(--color-terra)" />
      {/* Person at the barre in profile, plié */}
      {/* Head */}
      <ellipse cx="200" cy="78" rx="9" ry="11" fill="var(--color-ink)" />
      {/* Hair bun */}
      <circle cx="195" cy="68" r="5" fill="var(--color-ink)" opacity="0.9" />
      {/* Torso */}
      <path
        d="M193 90 L 192 145 L 215 145 L 218 90 Z"
        fill="var(--color-ink)"
        opacity="0.88"
      />
      {/* Arm to barre */}
      <path
        d="M216 92 Q 245 100 285 121"
        stroke="var(--color-ink)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.88"
        fill="none"
      />
      {/* Free arm extended forward */}
      <path
        d="M193 100 Q 165 99 145 108"
        stroke="var(--color-ink)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.88"
        fill="none"
      />
      {/* Standing leg */}
      <path
        d="M200 145 L 196 195"
        stroke="var(--color-ink)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.88"
      />
      {/* Working leg in arabesque/plié */}
      <path
        d="M214 145 Q 232 165 256 178"
        stroke="var(--color-ink)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.88"
      />
      {/* Caption */}
      <text
        x="200"
        y="225"
        fontFamily="ui-serif, Georgia, serif"
        fontSize="13"
        fill="var(--color-ink-soft)"
        textAnchor="middle"
      >
        Barre · ballet + fuerza + cardio en pulsos cortos
      </text>
    </svg>
  );
}
