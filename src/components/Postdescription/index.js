import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import ReadMore from "@fawazahmed/react-native-read-more";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { Color } from "@common";

export default function Postdescription(props) {
  const renderText = (text) => {
    if (text.length > 200) {
      return (
        <ReadMore
          seeMoreStyle={{ color: Color.primary }}
          seeLessStyle={{ color: Color.primary }}
        >
          {text}
        </ReadMore>
      );
    } else {
      return <Text>{text}</Text>;
    }
  };

  return (
    <TouchableOpacity
      {...props}
      onPress={() =>
        typeof props.navigation !== "undefined"
          ? props.navigation.navigate("FeedDetail", { item: props.item })
          : null
      }
    >
      {!!props.item.post_text && (
        <LinkPreview
          renderText={renderText}
          text={props.item.post_text}
          textContainerStyle={styles.previewContainer}
        />
      )}
    </TouchableOpacity>
  );
}