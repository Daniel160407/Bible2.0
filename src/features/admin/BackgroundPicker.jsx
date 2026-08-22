import { useState } from 'react';
import { BACKGROUNDS } from '../../lib/constants';

const itemClass =
  'flex flex-col items-center rounded-lg border border-[#444] bg-field p-4 transition-colors duration-300 hover:border-[#66afe9]';

const inputClass =
  'mb-2 w-full rounded border border-[#444] bg-[#2c3e50] p-2 text-[#e0e0e0] transition-colors duration-300 focus:border-[#66afe9] focus:outline-none';

const BackgroundPicker = ({ onSelect }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    onSelect(url);
  };

  return (
    <div className="mb-48 grid w-full grid-cols-5 gap-4 rounded-[10px] bg-panel-dark p-8 text-[#e0e0e0] shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
      {BACKGROUNDS.map((background) => (
        <label key={background} className={`${itemClass} cursor-pointer`}>
          <input
            type="radio"
            name="background"
            value={background}
            onChange={(e) => onSelect(e.target.value)}
            className="mb-2 scale-150 cursor-pointer"
          />
          <img
            src={background}
            alt="Background"
            className="max-h-20 max-w-20 rounded-lg border border-[#333] transition-colors duration-300 hover:border-[#66afe9]"
          />
        </label>
      ))}

      <div className={`${itemClass} col-span-5`}>
        <input
          type="radio"
          name="background"
          value={imageUrl}
          onChange={(e) => onSelect(e.target.value)}
          className="mb-2 scale-150 cursor-pointer"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={inputClass}
        />
        <input
          type="radio"
          name="background"
          value={fileUrl}
          onChange={(e) => onSelect(e.target.value)}
          className="mb-2 scale-150 cursor-pointer"
        />
        <input type="file" onChange={handleFileChange} className={inputClass} />
      </div>
    </div>
  );
};

export default BackgroundPicker;
