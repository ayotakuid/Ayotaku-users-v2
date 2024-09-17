function ImageRenderComponent({ imageUrl, classTailwind, altText }) {
  return (
    <>
      <img src={imageUrl} className={classTailwind} alt={altText} referrerPolicy="no-referrer" />
    </>
  )
}

export default ImageRenderComponent;