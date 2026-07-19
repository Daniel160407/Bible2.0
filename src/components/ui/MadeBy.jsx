const MadeBy = ({ href }) => (
  <div className="text-center text-sm text-[#f4f4f4]">
    <p>
      Made with <span className="text-red-600">&#10084;</span> by{' '}
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
        Daniel
      </a>
    </p>
  </div>
);

export default MadeBy;
