interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-label">{percent}%</span>
    </div>
  );
}
