const MadeBy = ({ href }) => (
  <p className="text-center text-xs text-white/40">
    Made with <span className="text-red-400/80">&#10084;</span> by{' '}
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/60 underline-offset-2 transition-colors duration-200 hover:text-white hover:underline"
    >
      Daniel
    </a>
  </p>
);

export default MadeBy;
