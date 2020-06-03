import React from "react";
import SearchBox from "../searchBox/searchBox";
import ListBoxTour from "../listTour/listBoxTour";
class Home extends React.Component {
  render() {
    return (
      <div>
        <SearchBox {...this.props} />
        <ListBoxTour limit={3} titleName="Tour Hot" styleTour="hot" />
        <ListBoxTour limit={10} titleName="Giảm Giá" styleTour="discount" />
        <ListBoxTour limit={10} titleName="Nước Ngoài" styleTour="foreign" />
      </div>
    );
  }
}

export default Home;
