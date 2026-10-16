interface Props {
  src?: string;
  alt?: string;
}

/** Espaço reservado para a imagem da camisa. Sem `src`, fica em branco. */
export default function ImgSlot({ src, alt = "" }: Props) {
  return src ? (
    <img className="slot slot--img" src={src} alt={alt} />
  ) : (
    <div className="slot" aria-hidden="true" />
  );
}
