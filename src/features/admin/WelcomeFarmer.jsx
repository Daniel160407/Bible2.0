const WelcomeFarmer = ({ onDismiss }) => (
  <div
    onClick={onDismiss}
    className="fixed left-1/2 top-[40%] z-[1000] h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center"
  >
    <div
      className="absolute -top-10 left-1/2 w-[200px] -translate-x-1/2 rounded-[50px] bg-white p-5
        shadow-[0_4px_6px_rgba(0,0,0,0.1)]
        after:absolute after:-bottom-[15px] after:left-1/2 after:-translate-x-1/2 after:border-[10px]
        after:border-solid after:border-white after:border-b-transparent after:border-l-transparent after:border-r-transparent
        after:content-['']"
    >
      <p className="font-['Comic_Sans_MS',cursive] text-sm text-[#333]">
        Welcome to the Bible app! Please read a{' '}
        <a onClick={onDismiss} href="/documentation" target="_blank" className="underline">
          documentation
        </a>
        , or scroll down in documentation to watch a video instruction.
      </p>
    </div>

    <div className="relative mt-[90px]">
      <div className="absolute top-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-t-[100%] bg-[#8b4513]" />
      <div className="absolute top-5 left-1/2 h-[100px] w-[60px] -translate-x-1/2 rounded-b-[10px] bg-[#006400]" />
      <div className="absolute top-[120px] left-1/2 h-[60px] w-2.5 -translate-x-1/2 bg-[#8b4513]" />
      <div className="absolute top-10 left-1/2 h-[70px] w-5 -translate-x-1/2 rounded-[10px] bg-[#8b4513]" />
      <div className="absolute top-5 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-[#ffdbac]">
        <div className="absolute top-2.5 left-2.5 h-2.5 w-5 rounded-full bg-black" />
        <div className="absolute top-[25px] left-3 h-[5px] w-4 rounded-full bg-[#ff6347]" />
      </div>
    </div>
  </div>
);

export default WelcomeFarmer;
