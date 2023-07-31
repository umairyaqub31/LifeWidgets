import React, { Component } from "react";
import { Text } from "react-native";
import moment from "moment";

class TimeAgo extends React.Component {
  constructor(props) {
    super(props);
    moment.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s",
        s: function (number, withoutSuffix) {
          return withoutSuffix ? "now" : "a few seconds";
        },
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1mth",
        MM: "%dmth",
        y: "1y",
        yy: "%dy",
      },
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render = () => {
    return <Text {...this.props}>{moment.utc(this.props.created_at).local().fromNow()}</Text>;
  };
}
export default TimeAgo;