export const CartIcon = ({ className = "" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1em] aspect-square"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <circle cx={7.5} cy={18.5} r={1.5} fill="currentColor"></circle>
          <circle cx={16.5} cy={18.5} r={1.5} fill="currentColor"></circle>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 5h2l.6 3m0 0L7 15h10l2-7z"
          ></path>
        </g>
      </svg>
    </div>
  );
};
