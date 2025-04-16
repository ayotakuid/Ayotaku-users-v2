import { memo } from "react";
import ChipsFilterComponent from "../utils/ChipsFilterComponent";

function MainChipsGenresComponent({ genres }) {
  
  return (
    <>
      {
        genres?.map((genre, index) => (
          <ChipsFilterComponent text={genre} key={index} />
        ))
      }
    </>
  )
}

export default memo(MainChipsGenresComponent);