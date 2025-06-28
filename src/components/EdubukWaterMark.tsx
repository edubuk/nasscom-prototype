const EdubukWaterMark = () => {
  return (
    <div className="my-1 flex items-center justify-center gap-5 mb-2">
      <h1 className="text-xl md:text-xl font-semibold">Powered by</h1>
      <img
        src={"/MASTER LOGOS_WITH NAME_HORIZONTAL.png"}
        alt="Edubuk-logo"
        className="w-28 sm:w-32 lg:w-40 object-cover"
      />
    </div>
  );
};

export default EdubukWaterMark;
