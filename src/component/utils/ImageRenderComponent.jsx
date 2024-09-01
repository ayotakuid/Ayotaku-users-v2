function ImageRenderComponent({ imageUrl, classTailwind, altText }) {
  return (
    <>
      <img src={imageUrl} className={classTailwind} alt={altText} />
    </>
  )
}

export default ImageRenderComponent;