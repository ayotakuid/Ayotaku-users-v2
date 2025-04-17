import { useParams } from "react-router-dom"

function DetailAnimeComponent() {

  const { slug } = useParams();

  return (
    <div>
      {slug}
    </div>
  )
}

export default DetailAnimeComponent;