import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { wrapperZoomImages, ImageInWraper } from 'react-native-zoom-lightbox';
import PropTypes from 'prop-types';

class FlirtDetailGallery extends React.Component {
  static propTypes = {
    getOpacity: PropTypes.func,
    captureCarouselItem: PropTypes.func,
    indexState: PropTypes.number,
    open: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      arrayImages: [
        {
          url: 'https://images.all-free-download.com/images/graphicthumb/dark_flowers_608925.jpg',
        },
        {
          url: 'https://images.all-free-download.com/images/graphicthumb/background_wood_planks_kunterbunt_608383.jpg',
        },
        { 
          url: 'https://images.all-free-download.com/images/graphicthumb/rose_floribunda_blossom_bloom_608358.jpg',
        },
        { 
          url: 'https://images.all-free-download.com/images/graphicthumb/dog_animal_pet_walk_schfer_dog_608323.jpg',
        },
        { 
          url: 'https://images.all-free-download.com/images/graphicthumb/waterfall_lower_falls_mist_river_608316.jpg',
        }
      ],
    };
  }
  
  render(){
    const { getOpacity, captureCarouselItem, indexState, open } = this.props;
    const { arrayImages } = this.state;
    return (
      <View style={styles.ImagesGrid}>
      {
        arrayImages.map((item, index) =>
        <View style={styles.arrayImagesGrid}>
          <ImageInWraper
            key={index}
            open={open}
            indexState={indexState}
            getOpacity={getOpacity}
            captureCarouselItem={captureCarouselItem}
            index={index}
            url={item.url}
            style={styles.ImagesGridphoto}
          />
        </View>
        )
      }
    </View>
      );
  }
  }

 

export default wrapperZoomImages(FlirtDetailGallery);