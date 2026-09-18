import { useState } from "react";

const GRADIENTS = [
  "from-[#2a221b] via-[#6d4e3b] to-[#d7b48a]",
  "from-[#1d1916] via-[#4a3d34] to-[#cbb7a0]",
  "from-[#3a2a22] via-[#8a5a3c] to-[#e8d3b8]",
  "from-[#241c18] via-[#5c4638] to-[#bfa48a]",
  "from-[#2f241c] via-[#7a5340] to-[#dcc4a4]",
  "from-[#1a1613] via-[#3f342c] to-[#b9a18a]",
  "from-[#352820] via-[#6e4a38] to-[#e2c7a8]",
  "from-[#211a16] via-[#58483c] to-[#d0baa2]",
  "from-[#2c2018] via-[#81563c] to-[#f0d7b6]",
  "from-[#181410] via-[#4a3a30] to-[#c4ad96]",
  "from-[#3b2e24] via-[#6a4c3a] to-[#ddc2a4]",
  "from-[#201812] via-[#5a4032] to-[#c9ae93]",
];

const SPOTS = [
  "radial-gradient(ellipse at 32% 28%, rgba(255,220,180,0.45), transparent 42%)",
  "radial-gradient(ellipse at 68% 22%, rgba(255,210,170,0.38), transparent 46%)",
  "radial-gradient(ellipse at 50% 70%, rgba(255,200,160,0.32), transparent 48%)",
  "radial-gradient(ellipse at 20% 80%, rgba(255,226,196,0.4), transparent 50%)",
  "radial-gradient(ellipse at 78% 64%, rgba(255,216,176,0.36), transparent 44%)",
  "radial-gradient(ellipse at 44% 18%, rgba(255,232,204,0.42), transparent 40%)",
  "radial-gradient(ellipse at 16% 36%, rgba(255,208,168,0.34), transparent 46%)",
  "radial-gradient(ellipse at 84% 30%, rgba(255,224,188,0.4), transparent 42%)",
  "radial-gradient(ellipse at 60% 84%, rgba(255,214,174,0.3), transparent 48%)",
  "radial-gradient(ellipse at 28% 54%, rgba(255,228,198,0.38), transparent 44%)",
  "radial-gradient(ellipse at 72% 46%, rgba(255,200,150,0.33), transparent 50%)",
  "radial-gradient(ellipse at 48% 40%, rgba(255,236,210,0.28), transparent 36%)",
];

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  variant?: number;
  fit?: "cover" | "contain";
  onReady?: (size: { width: number; height: number }) => void;
};

export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes,
  loading = "lazy",
  fetchPriority,
  variant = 0,
  fit = "cover",
  onReady,
}: PhotoProps) {
  const [status, setStatus] = useState<"idle" | "loaded" | "error">("idle");
  const tone = GRADIENTS[variant % GRADIENTS.length];
  const spot = SPOTS[variant % SPOTS.length];
  const showPlaceholder = status !== "loaded";

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {showPlaceholder ? (
        <div className="absolute inset-0" aria-hidden="true">
          <div className={`absolute inset-0 bg-linear-to-br ${tone}`} />
          <div className="absolute inset-0" style={{ background: spot }} />
          <div className="film-grain absolute inset-0" />
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        onLoad={(event) => {
          setStatus("loaded");
          onReady?.({
            width: event.currentTarget.naturalWidth,
            height: event.currentTarget.naturalHeight,
          });
        }}
        onError={() => setStatus("error")}
        className={`h-full w-full transition-opacity duration-700 ${
          fit === "contain" ? "object-contain object-center" : "object-cover"
        } ${status === "loaded" ? "opacity-100" : "absolute inset-0 opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
