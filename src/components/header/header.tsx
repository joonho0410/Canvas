import Riborn from '../ribornTab/riborn';

const Header = () => {
  return (
    <header className="relative z-[120] flex w-full flex-col gap-y-2 px-6 pt-4">
      <div className="relative flex w-full items-center justify-start gap-x-3 py-0.5">
        <div className="left-0 flex items-center justify-start gap-x-3">
          <div className="flex size-7 items-center justify-center rounded-md bg-neutral-700 text-base font-bold italic text-neutral-50 transition-all duration-100 ease-out hover:bg-neutral-800 active:scale-90 active:bg-neutral-800 cursor-pointer select-none">
            D
          </div>
          <h1 className="duration-50 min-w-8 rounded bg-transparent px-2 py-0.5 text-base font-medium text-neutral-500 outline-nonering -transparent transition-colors delay-0 selection:bg-neutral-700 select-none">
            Duyo Test
          </h1>
        </div>
      </div>
      <Riborn />
    </header>
  );
};

export default Header;
