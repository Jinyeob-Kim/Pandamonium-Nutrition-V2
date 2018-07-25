import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductDetail } from "../../ducks/shopReducer";
import ShopItemMedia from "../ShopItemMedia/ShopItemMedia";
import ProductDetailTitle from "../ProductDetailTitle/ProductDetailTitle";
import ProductDetailButtons from "../ProductDetailButtons/ProductDetailButtons";
import { PlusIcon, DownIcon } from "../../assets/ChangeableSvg";
import "./ProductDetail.css";

class ProductDetail extends Component {
  componentDidMount() {
    this.props.getProductDetail(this.props.match.params.name);
  }
  render() {
    console.log(this.props.product);
    const { product, isLoading } = this.props;
    if (isLoading || !Object.keys(product).length) return <div>Loading...</div>;
    const {
      icons,
      images,
      description,
      header,
      name,
      price,
      variations,
      itemtype
    } = product;
    let formattedHeader = header
      .split(" ")
      .map(
        (word, i, arr) =>
          arr.indexOf(word) === 0 ? <span key={i}>{word} </span> : word
      )
      .reduce((prev, curr) => [prev, " ", curr]);
    return (
      <div id="detail-main">
        <ShopItemMedia img={images}>
          {({ displayImg, handleImg }) => (
            <div className="detail-img">
              {images.map((image, i) => (
                <img
                  key={i}
                  className={
                    displayImg === image ? "detail-img-on" : "detail-img-off"
                  }
                  src={image}
                  alt="Product"
                />
              ))}
              <div id="detail-images-dots">
                {images.map((dot, i) => (
                  <img
                    key={i}
                    className={
                      displayImg === dot ? "detail-dot-on" : "detail-dot-off"
                    }
                    onClick={() => handleImg(dot)}
                    src={dot}
                    alt="Product"
                  />
                ))}
              </div>
            </div>
          )}
        </ShopItemMedia>
        <ProductDetailTitle name={name} itemtype={itemtype} icons={icons} />
        <ProductDetailButtons
          id={"detail-cart-button"}
          cartCheck={true}
          title={"Add To Cart"}
          icon={PlusIcon}
        />
        <ProductDetailButtons
          id={"detail-description-tab"}
          cartCheck={false}
          title={"Product Description"}
          icon={DownIcon}
          header={formattedHeader}
          description={description}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.shopReducer });
export default connect(
  mapStateToProps,
  { getProductDetail }
)(ProductDetail);
