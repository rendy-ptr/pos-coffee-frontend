type ImageProps = {
  image_url: string;
  alt_text: string;
  width: number;
  height: number;
  class_name: string;
};

const Image = ({
  image_url,
  alt_text,
  width,
  height,
  class_name,
}: ImageProps) => {
  return (
    <img
      src={image_url}
      alt={alt_text}
      width={width}
      height={height}
      className={class_name}
    />
  );
};

export default Image;
