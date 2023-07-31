import * as React from 'react';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import colors from "../../config/color/color";

export default class FeedSkeleton extends React.Component{
    constructor(props) {
        super(props);
    }
  render(){
    return (
        <ContentLoader 
            speed={1}
            height={100}
            backgroundColor={colors.lightGray}
            foregroundColor={colors.gray}
            {...this.props}
        >
            <Rect x="48" y="8" rx="3" ry="3" width="88" height="9" /> 
            <Rect x="48" y="26" rx="3" ry="3" width="52" height="9" /> 
            <Rect x="0" y="56" rx="3" ry="3" width="410" height="9" /> 
            <Rect x="0" y="72" rx="3" ry="3" width="380" height="9" /> 
            <Rect x="0" y="88" rx="3" ry="3" width="178" height="9" /> 
            <Circle cx="20" cy="20" r="20" />
        </ContentLoader>
      );
  }
  
}

