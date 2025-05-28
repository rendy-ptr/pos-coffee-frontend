const ImageSection = () => {
  return (
    <div className="relative hidden lg:flex lg:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Perfect coffee cup with beautiful latte art on wooden table"
        width={1200}
        height={1600}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#6f4e37]/40 to-[#2c1810]/60"></div>
      <div className="absolute bottom-8 left-8 max-w-md text-white">
        <h2 className="mb-3 text-3xl font-bold">Bergabung dengan Kami</h2>
        <p className="text-lg leading-relaxed opacity-90">
          Nikmati keuntungan eksklusif sebagai member Aroma Kopi dan rasakan
          pengalaman kopi yang tak terlupakan
        </p>
      </div>
    </div>
  );
};

export default ImageSection;
