import React from "react";
import SortableList from "./SortableList";
import { MARGIN } from "./Config";
import Tile from "./Tile";
import { View } from "react-native";

const tiles = [
  {
    id: "spent",
  },

  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
];

const Widget = () => {
  return (
    <View style={{ paddingHorizontal: MARGIN, marginBottom: 80 }}>
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default Widget;
