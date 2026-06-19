interface SBadgeProps {
  children: React.ReactNode;
}

export default function SBadge({ children }: SBadgeProps) {
  return (
    <div className="s-badge">
      {children}
    </div>
  );
}