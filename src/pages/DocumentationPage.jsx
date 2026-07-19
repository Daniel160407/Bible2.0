import { useState } from 'react';
import { DOCUMENTATION } from './documentationContent';

const renderBlock = (block, index) => {
  switch (block.type) {
    case 'p':
      return (
        <p key={index} className="mb-4 text-xl leading-relaxed">
          {block.content}
        </p>
      );
    case 'img':
      return (
        <img
          key={index}
          src={block.src}
          alt="Example"
          className="mb-4 w-[600px] max-w-full rounded-[5px] border-2 border-[#555]"
        />
      );
    case 'subtitle':
      return (
        <p key={index} className="mb-2 mt-4 text-2xl font-semibold text-accent">
          {block.content}
        </p>
      );
    case 'divider':
      return <hr key={index} className="my-8 border-[#555]" />;
    default:
      return null;
  }
};

const DocumentationPage = () => {
  const [language, setLanguage] = useState('geo');
  const { title, youtube, blocks } = DOCUMENTATION[language];

  return (
    <div className="rounded-[10px] bg-card px-20 pb-20 pt-8 text-[#f5f5f5] shadow-[0_0_10px_rgba(0,0,0,0.5)] max-md:px-6">
      <select
        className="mb-8 rounded-[5px] border border-[#555] bg-[#1f2937] p-2 text-[#f5f5f5] focus:border-[#888] focus:outline-none"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="geo">GEO</option>
        <option value="eng">ENG</option>
        <option value="rus">RUS</option>
      </select>

      <h1 className="mb-4 text-center text-[2.5rem] font-bold text-accent">{title}</h1>

      {blocks.map(renderBlock)}

      <div className="mt-8 flex justify-start gap-8 max-sm:flex-col max-sm:gap-4">
        {[
          { label: 'Messenger', href: 'https://www.facebook.com/daniel.abulashvili.5' },
          { label: 'Telegram', href: 'https://t.me/Daniel170407' },
          { label: 'YouTube', href: youtube },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[5px] border-2 border-[#555] bg-[#1f2937] px-4 py-2 text-center text-xl
              font-bold text-accent no-underline transition-colors duration-300
              hover:border-[#888] hover:bg-field hover:text-[#f5f5f5]"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DocumentationPage;
