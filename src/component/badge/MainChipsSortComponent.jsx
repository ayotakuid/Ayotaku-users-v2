import ChipsFilterComponent from "../utils/ChipsFilterComponent";
import { checkingSortBy } from '../../utils/handler-tools';
import { memo } from "react";

function MainChipsSortComponent({ sort }) {
  if (!sort) return null;

  return (
    <ChipsFilterComponent text={checkingSortBy(sort)} />
  );
}

export default memo(MainChipsSortComponent);
