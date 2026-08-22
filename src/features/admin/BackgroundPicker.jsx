import { useState } from 'react';
import { BACKGROUNDS } from '../../lib/constants';
import Input from '../../components/ui/Input';

const itemClass =
  'flex flex-col items-center rounded-lg border border-[#444] bg-field p-4 transition-colors duration-300 hover:border-[#66afe9]';

const BackgroundPicker = ({ onSelect }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (files) => {
    const file = files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    onSelect(url);
  };

  return (
    <div className="mb-48 grid w-full grid-cols-5 gap-4 rounded-[10px] bg-panel-dark p-8 text-[#e0e0e0] shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
      {BACKGROUNDS.map((background) => (
        <label key={background} className={`${itemClass} cursor-pointer`}>
          <Input type="radio" name="background" value={background} onChange={onSelect} />
          <img
            src={background}
            alt="Background"
            className="max-h-20 max-w-20 rounded-lg border border-[#333] transition-colors duration-300 hover:border-[#66afe9]"
          />
        </label>
      ))}

      <div className={`${itemClass} col-span-5`}>
        <Input type="radio" name="background" value={imageUrl} onChange={onSelect} />
        <Input type="text" variant="picker" value={imageUrl} onChange={setImageUrl} />
        <Input type="radio" name="background" value={fileUrl} onChange={onSelect} />
        <Input type="file" variant="picker" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default BackgroundPicker;
