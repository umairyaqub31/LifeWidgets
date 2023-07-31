import * as React from "react";
import colors from "../../config/color/color";
import { ProgressBar } from "react-native-paper";
import { connect } from "react-redux";


class PostProgressBar extends React.Component {

  render() {
    let progress = this.props.progress/100;
    let progressBar=null;
    if (this.props.progress) {
        progressBar = <ProgressBar progress={progress} color={colors.primary} />
    }
    return (
        progressBar
    );
  }
}

const mapStateToProps = ({Progress}) => {
  return {progress:Progress.progress};
};

export default connect(mapStateToProps, undefined, null)(PostProgressBar);
