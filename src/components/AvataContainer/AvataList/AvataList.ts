import AvataItem from "./AvataItem/AvataItem";

const avataListData = {
  몸통: ["body1", "body2", "body3", "body4"],
  표정: [],
  소품: [],
  특수효과: [],
  배경: [],
};

type Tkey = "몸통" | "표정" | "소품" | "특수효과" | "배경";

function AvataList({ key }: { key: Tkey }) {
  return avataListData[key].map((svgName) => AvataItem(svgName));
}

export default AvataList;
